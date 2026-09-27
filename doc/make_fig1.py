import os
from PIL import Image, ImageDraw, ImageFont

def make_fig1():
    img = Image.new('RGB', (1000, 1100), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)

    boxes = [
        'INPUT DEED & GEOLOCATION',
        'DATA PREPROCESSING MODULE',
        'DEED OCR & SATELLITE GIS EXTRACTION MODULE',
        'YOLOV8 COMPUTER VISION & SOIL MAPPING MODULE',
        'HIGHWAY INFRASTRUCTURE & FLOOD RISK MODULE',
        'MULTIMODAL REASONING & COMPOSITE VALUATION (MLLM)',
        'FINAL OUTPUT\n(VERIFIED / FLOOD RISK / VALUATION REPORT)'
    ]

    try:
        font_bold = ImageFont.truetype('arialbd.ttf', 24)
    except:
        font_bold = ImageFont.load_default()

    y_start = 40
    box_height = 85
    gap = 55
    width = 860
    x_start = 70

    for i, text in enumerate(boxes):
        y = y_start + i * (box_height + gap)
        draw.rectangle([x_start, y, x_start + width, y + box_height], outline=(30, 41, 59), width=3, fill=(248, 250, 252))
        
        lines = text.split('\n')
        total_text_h = len(lines) * 28
        for j, line in enumerate(lines):
            try:
                bbox = font_bold.getbbox(line)
                text_w = bbox[2] - bbox[0]
            except:
                text_w = len(line) * 12
            text_x = x_start + (width - text_w) / 2
            text_y = y + (box_height - total_text_h) / 2 + j * 28
            draw.text((text_x, text_y), line, fill=(15, 23, 42), font=font_bold)
            
        if i < len(boxes) - 1:
            arrow_y1 = y + box_height
            arrow_y2 = arrow_y1 + gap
            arrow_x = x_start + width / 2
            draw.line([(arrow_x, arrow_y1), (arrow_x, arrow_y2)], fill=(30, 41, 59), width=3)
            draw.polygon([(arrow_x - 10, arrow_y2 - 14), (arrow_x + 10, arrow_y2 - 14), (arrow_x, arrow_y2)], fill=(30, 41, 59))

    os.makedirs(r'c:\Users\HP\Desktop\mypro\land verification\doc\images', exist_ok=True)
    img_path = r'c:\Users\HP\Desktop\mypro\land verification\doc\images\fig1_system_architecture.jpg'
    img.save(img_path, 'JPEG', quality=95)
    print(f'Fig 1 saved to {img_path}')

if __name__ == '__main__':
    make_fig1()
