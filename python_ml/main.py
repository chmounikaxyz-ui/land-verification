import os
import math
import requests
import numpy as np
import cv2
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from ultralytics import YOLO

app = FastAPI()

# Load YOLOv8 generic model (it will auto-download yolov8n.pt on first run)
print("Loading YOLOv8 Model...")
model = YOLO('yolov8n.pt')
print("Model loaded successfully.")

class PlotRequest(BaseModel):
    latitude: float
    longitude: float
    plotSize: int

from dotenv import load_dotenv
load_dotenv('../.env')

def get_satellite_image(lat, lon, zoom=18):
    """
    Downloads high-resolution satellite tile, trying Google Static Maps first,
    and seamlessly falling back to Esri World Imagery / OSM if key is missing or API is disabled.
    """
    api_key = os.environ.get("GOOGLE_PLACES_API_KEY") or os.environ.get("GOOGLE_MAPS_API_KEY")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) LandVerificationML/1.0"}
    
    if api_key:
        try:
            url = f"https://maps.googleapis.com/maps/api/staticmap?center={lat},{lon}&zoom={zoom}&size=640x640&maptype=satellite&key={api_key}"
            response = requests.get(url, headers=headers, timeout=8)
            if response.status_code == 200 and len(response.content) > 1000:
                nparr = np.frombuffer(response.content, np.uint8)
                img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                if img is not None:
                    return img
            print(f"[PythonML] WARNING: Google Maps Static API returned {response.status_code}. Falling back to Esri World Imagery.")
        except Exception as e:
            print(f"[PythonML] WARNING: Google Maps Static API error: {e}. Falling back to Esri World Imagery.")
    
    # ── Fallback 1: Esri World Imagery (High-Resolution Satellite) ──────────────
    try:
        n = 1 << zoom
        x_tile = int((lon + 180.0) / 360.0 * n)
        lat_rad = math.radians(lat)
        y_tile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
        
        esri_url = f"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{zoom}/{y_tile}/{x_tile}"
        res = requests.get(esri_url, headers=headers, timeout=8)
        if res.status_code == 200:
            nparr = np.frombuffer(res.content, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if img is not None:
                return img
    except Exception as e:
        print(f"[PythonML] WARNING: Esri tile fetch failed: {e}")

    # ── Fallback 2: OpenStreetMap Tile ─────────────────────────────────────────
    try:
        n = 1 << min(zoom, 18)
        x_tile = int((lon + 180.0) / 360.0 * n)
        lat_rad = math.radians(lat)
        y_tile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
        osm_url = f"https://tile.openstreetmap.org/{min(zoom, 18)}/{x_tile}/{y_tile}.png"
        res = requests.get(osm_url, headers=headers, timeout=8)
        if res.status_code == 200:
            nparr = np.frombuffer(res.content, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            if img is not None:
                return img
    except Exception as e:
        print(f"[PythonML] WARNING: OSM tile fetch failed: {e}")

    print("[PythonML] WARNING: All tile sources failed. Returning blank tile array.")
    return np.zeros((640, 640, 3), dtype=np.uint8)

@app.post("/api/ml/analyze-plot")
async def analyze_plot(req: PlotRequest):
    try:
        print(f"Received verification request for Lat: {req.latitude}, Lng: {req.longitude}")
        
        # 1. Fetch the image tile (Now using Google Maps Satellite via get_satellite_image)
        img = get_satellite_image(req.latitude, req.longitude)
        
        # 2. Run Inference with YOLOv8
        # We set conf=0.1 to force it to detect objects on the map (cars, buildings, etc)
        results = model.predict(source=img, conf=0.15)
        
        encroachments = []
        bounding_boxes = []
        
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # box.xyxy is [xmin, ymin, xmax, ymax]
                b = box.xyxy[0].cpu().numpy().tolist()
                class_id = int(box.cls[0].item())
                class_name = model.names[class_id]
                
                if class_name in ['car', 'truck', 'stop sign', 'bench']:
                    type_str = "Temporary Structure"
                else:
                    type_str = "Permanent Structure"
                    
                deg_per_px_lat = 0.00054 / 640.0
                deg_per_px_lon = (0.00054 / max(0.1, math.cos(math.radians(req.latitude)))) / 640.0
                
                center_x = (b[0] + b[2]) / 2.0
                center_y = (b[1] + b[3]) / 2.0
                
                det_lat = req.latitude + (320.0 - center_y) * deg_per_px_lat
                det_lng = req.longitude + (center_x - 320.0) * deg_per_px_lon

                bounding_boxes.append({
                    "type": type_str,
                    "class": class_name,
                    "confidence": round(float(box.conf[0].item()), 2),
                    "lat": round(det_lat, 6), 
                    "lng": round(det_lng, 6),
                    "bbox_pixels": b
                })
        
        # Determine risk based on number of detected objects
        risk_score = min(len(bounding_boxes) * 15, 100)
        status = "High Risk" if risk_score > 60 else "Moderate Risk" if risk_score > 30 else "Verified"
        
        if len(bounding_boxes) > 0:
            deg_per_px_lat = 0.00054 / 640.0
            deg_per_px_lon = (0.00054 / max(0.1, math.cos(math.radians(req.latitude)))) / 640.0
            for i, box_item in enumerate(bounding_boxes[:3]):
                b_px = box_item["bbox_pixels"]
                top_left_lat = req.latitude + (320.0 - b_px[1]) * deg_per_px_lat
                top_left_lng = req.longitude + (b_px[0] - 320.0) * deg_per_px_lon
                bot_right_lat = req.latitude + (320.0 - b_px[3]) * deg_per_px_lat
                bot_right_lng = req.longitude + (b_px[2] - 320.0) * deg_per_px_lon

                # Estimate bounding box size in sq yards
                width_m = abs(bot_right_lng - top_left_lng) * 111320 * math.cos(math.radians(req.latitude))
                height_m = abs(top_left_lat - bot_right_lat) * 111320
                area_sq_yards = max(10, round((width_m * height_m) / 0.8361))

                encroachments.append({
                    "id": f"YOLO-{i+1}",
                    "type": box_item["type"],
                    "severity": "HIGH" if risk_score > 60 else "MEDIUM",
                    "areaSqYards": area_sq_yards,
                    "description": f"YOLOv8 detected {box_item['class']} ({box_item['type']}) near plot perimeter.",
                    "coords": [
                        {"lat": top_left_lat, "lng": top_left_lng},
                        {"lat": top_left_lat, "lng": bot_right_lng},
                        {"lat": bot_right_lat, "lng": bot_right_lng},
                        {"lat": bot_right_lat, "lng": top_left_lng}
                    ],
                    "coordinates": [
                        [top_left_lat, top_left_lng],
                        [bot_right_lat, bot_right_lng]
                    ]
                })

        return {
            "status": status,
            "riskScore": risk_score,
            "encroachments": encroachments,
            "yoloDetections": bounding_boxes,
            "message": "Computer vision analysis complete"
        }
        
    except Exception as e:
        print("ML Analysis Error:", e)
        raise HTTPException(status_code=500, detail=str(e))

class ScrapeRequest(BaseModel):
    survey_number: str
    district: str = ""
    mandal: str = ""
    village: str = ""

@app.get("/health")
async def health():
    return {"status": "ok", "service": "Land Verification ML Microservice (AP)", "portal": "Meebhoomi AP"}

@app.post("/api/ml/scrape-owner")
async def scrape_owner(req: ScrapeRequest):
    """
    Attempts to look up the registered pattadar (owner) from the Andhra Pradesh
    Meebhoomi portal (meebhoomi.ap.gov.in/Adangal).

    The Meebhoomi portal enforces image CAPTCHA on every request.
    To enable live lookups:
      1. Get a 2Captcha API key at https://2captcha.com (~$3/1000 solves)
      2. Set CAPTCHA_API_KEY=<your-key> in your .env file
      3. The Playwright block below will handle CAPTCHA solving automatically.

    Without CAPTCHA_API_KEY the endpoint returns an honest pending status —
    it does NOT fabricate owner names.
    """
    import os, time, requests as req_lib

    captcha_key = os.environ.get("CAPTCHA_API_KEY")
    survey = req.survey_number.strip()
    district = req.district.strip()
    mandal = req.mandal.strip()
    village = req.village.strip()

    print(f"[Meebhoomi] Lookup: Survey={survey}, District={district}, Mandal={mandal}, Village={village}")

    # ── Production path — only runs when CAPTCHA key is configured ──────────
    if captcha_key:
        try:
            from playwright.sync_api import sync_playwright

            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
                context = browser.new_context(
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
                )
                page = context.new_page()

                # ── 1. Open Meebhoomi Adangal page ──────────────────────────
                page.goto("https://meebhoomi.ap.gov.in/Adangal/adangalhome.aspx", timeout=30000)
                page.wait_for_load_state("networkidle", timeout=20000)

                # ── 2. Select District ───────────────────────────────────────
                # Meebhoomi uses <select id="ddlDist"> for district dropdown
                if district:
                    try:
                        page.select_option("#ddlDist", label=district, timeout=5000)
                        page.wait_for_load_state("networkidle", timeout=8000)
                    except Exception as e:
                        print(f"[Meebhoomi] District select failed: {e}")

                # ── 3. Select Mandal ─────────────────────────────────────────
                if mandal:
                    try:
                        page.wait_for_selector("#ddlMandal option:nth-child(2)", timeout=6000)
                        page.select_option("#ddlMandal", label=mandal, timeout=5000)
                        page.wait_for_load_state("networkidle", timeout=8000)
                    except Exception as e:
                        print(f"[Meebhoomi] Mandal select failed: {e}")

                # ── 4. Select Village ────────────────────────────────────────
                if village:
                    try:
                        page.wait_for_selector("#ddlVillage option:nth-child(2)", timeout=6000)
                        page.select_option("#ddlVillage", label=village, timeout=5000)
                    except Exception as e:
                        print(f"[Meebhoomi] Village select failed: {e}")

                # ── 5. Select search by Survey Number ────────────────────────
                try:
                    page.click("#rdbSurveyNo", timeout=3000)  # Survey No radio button
                except Exception:
                    pass

                # ── 6. Fill Survey Number ────────────────────────────────────
                try:
                    page.fill("#txtSurveyNo", survey, timeout=3000)
                except Exception as e:
                    print(f"[Meebhoomi] Survey number fill failed: {e}")

                # ── 7. Solve CAPTCHA via 2Captcha ────────────────────────────
                try:
                    captcha_img = page.locator("img[id*='captcha'], img[src*='captcha'], #imgCaptcha").first
                    captcha_src = captcha_img.get_attribute("src", timeout=3000)

                    # Get captcha image bytes
                    if captcha_src and captcha_src.startswith("data:image"):
                        import base64
                        img_b64 = captcha_src.split(",")[1]
                    else:
                        # Download captcha image from URL
                        if captcha_src and not captcha_src.startswith("http"):
                            captcha_src = "https://meebhoomi.ap.gov.in" + captcha_src
                        img_resp = req_lib.get(captcha_src, timeout=10)
                        img_b64 = base64.b64encode(img_resp.content).decode()

                    # Submit to 2Captcha
                    submit = req_lib.post("http://2captcha.com/in.php", data={
                        "key": captcha_key,
                        "method": "base64",
                        "body": img_b64,
                        "json": 1
                    }, timeout=15).json()

                    captcha_id = submit.get("request")
                    captcha_text = None

                    # Poll for result (up to 30s)
                    for _ in range(10):
                        time.sleep(3)
                        result = req_lib.get(
                            f"http://2captcha.com/res.php?key={captcha_key}&action=get&id={captcha_id}&json=1",
                            timeout=10
                        ).json()
                        if result.get("status") == 1:
                            captcha_text = result.get("request")
                            break

                    if captcha_text:
                        page.fill("#txtCaptcha, input[id*='captcha']", captcha_text, timeout=3000)
                        print(f"[Meebhoomi] CAPTCHA solved: {captcha_text[:6]}...")

                except Exception as e:
                    print(f"[Meebhoomi] CAPTCHA solve failed: {e}")

                # ── 8. Submit form ────────────────────────────────────────────
                try:
                    page.click("#btnSearch, input[type='submit'][value*='Search'], button[id*='Search']", timeout=4000)
                    page.wait_for_load_state("networkidle", timeout=15000)
                except Exception as e:
                    print(f"[Meebhoomi] Form submit failed: {e}")

                # ── 9. Extract pattadar name from results ─────────────────────
                owner_name = None
                try:
                    # Meebhoomi results table shows pattadar in column with header "పట్టాదారు పేరు" or "Pattadar Name"
                    page.wait_for_selector("table.GridViewStyle, #GridView1, .datatable", timeout=8000)
                    rows = page.locator("table tr").all()
                    for row in rows[1:]:  # skip header
                        cells = row.locator("td").all()
                        if len(cells) >= 3:
                            owner_name = cells[2].inner_text(timeout=2000).strip()
                            if owner_name and owner_name not in ("", "-", "N/A"):
                                break
                except Exception as e:
                    print(f"[Meebhoomi] Results parse failed: {e}")

                browser.close()

                if owner_name:
                    print(f"[Meebhoomi] ✅ Found pattadar: {owner_name}")
                    return {
                        "owner_name": owner_name,
                        "status": "SUCCESS",
                        "source": "Meebhoomi AP Portal (meebhoomi.ap.gov.in)",
                        "message": f"Pattadar name successfully retrieved from Meebhoomi for Survey {survey}"
                    }
                else:
                    return {
                        "owner_name": "Not Found in Meebhoomi",
                        "status": "NOT_FOUND",
                        "source": "Meebhoomi AP Portal",
                        "message": f"Survey {survey} in {village}, {mandal} not found or results empty."
                    }

        except Exception as e:
            print(f"[Meebhoomi] Scraping error: {e}")
            return {
                "owner_name": "Pending Meebhoomi Verification",
                "status": "SCRAPE_FAILED",
                "message": f"Meebhoomi portal lookup failed: {str(e)}"
            }

    # ── No CAPTCHA key — return honest 'not configured' response ────────────
    print(f"[Meebhoomi] CAPTCHA_API_KEY not set. Cannot scrape Meebhoomi for survey: {survey}")
    return {
        "owner_name": "Pending Meebhoomi Verification",
        "status": "NOT_CONFIGURED",
        "source": "Meebhoomi AP Portal (meebhoomi.ap.gov.in)",
        "message": (
            f"Live Meebhoomi AP lookup for Survey {survey or 'N/A'} in {village or 'N/A'}, {mandal or 'N/A'}, {district or 'N/A'} "
            "requires CAPTCHA_API_KEY in your .env file. "
            "Get a 2Captcha key at https://2captcha.com and set CAPTCHA_API_KEY=<key> to enable real owner verification."
        )
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
