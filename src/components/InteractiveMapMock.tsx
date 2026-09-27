import { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Loader2, Lock, Unlock, Search, Target, Scissors, AlertTriangle, Layers, Info, CheckCircle2, Home } from 'lucide-react';
import L from 'leaflet';
import { EncroachmentStructure } from '../types';

interface InteractiveMapMockProps {
  locationPreset?: 'hyderabad' | 'singapore' | 'greenplot';
  latitude: number;
  longitude: number;
  onCoordinatesChange?: (lat: number, lng: number) => void;
  showBoundaryOverlays?: boolean;
  defaultMapType?: 'satellite' | 'streets';
  encroachments?: EncroachmentStructure[];
  showAmenities?: boolean;
  amenitiesData?: { name: string; type: string; lat: number; lng: number }[];
  cleanBaseMap?: boolean;
  plotSizeSqYards?: number;
  isClippingActive?: boolean;
  onToggleClipping?: (active: boolean) => void;
  selectedLocationName?: string;
  onSelectPreset?: (presetName: string) => void;
  presetsList?: { name: string; latitude: number; longitude: number }[];
  surveyNumber?: string;
}

const POPULAR_LOCATIONS = [
  { name: 'Devi Nagar (Kobbarithota), Vijayawada - Sy No: 124/A (150 sq yd)', lat: 16.52819, lng: 80.6497 },
  { name: 'Devi Nagar, Vijayawada (NTR District)', lat: 16.5334, lng: 80.6451 },
  { name: 'Madhura Nagar, Vijayawada (NTR District)', lat: 16.5271, lng: 80.6504 },
  { name: 'Mutyalampadu, Vijayawada North (MeeBhoomi ROR-1B Khata 5012)', lat: 16.5242, lng: 80.6385 },
  { name: 'Moghalrajpuram / Siddhartha Nagar (Vijayawada)', lat: 16.5062, lng: 80.6480 },
  { name: 'Gachibowli Financial District (Hyderabad)', lat: 17.4435, lng: 78.3772 },
  { name: 'Beach Road Sector 4 (Visakhapatnam)', lat: 17.7126, lng: 83.3157 },
  { name: 'Amaravati Capital Region (Thullur)', lat: 16.5131, lng: 80.5165 },
  { name: 'Whitefield Tech Park (Bengaluru)', lat: 12.9698, lng: 77.7500 }
];

export default function InteractiveMapMock({
  latitude,
  longitude,
  onCoordinatesChange,
  showBoundaryOverlays = false,
  defaultMapType = 'satellite',
  encroachments = [],
  showAmenities = false,
  amenitiesData = [],
  cleanBaseMap = false,
  plotSizeSqYards = 400,
  isClippingActive: externalClippingActive,
  onToggleClipping,
  selectedLocationName,
  onSelectPreset,
  presetsList,
  surveyNumber
}: InteractiveMapMockProps) {
  const [zoom, setZoom] = useState(18.5);
  const [isScanning, setIsScanning] = useState(false);
  const [isPinLocked, setIsPinLocked] = useState(false);
  const [showLockedToast, setShowLockedToast] = useState(false);
  const [isInternalClippingActive, setIsInternalClippingActive] = useState(false);
  const isPlotClippingActive = externalClippingActive !== undefined ? externalClippingActive : isInternalClippingActive;
  
  const toggleClipping = () => {
    const nextVal = !isPlotClippingActive;
    if (onToggleClipping) onToggleClipping(nextVal);
    else setIsInternalClippingActive(nextVal);
  };
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'school' | 'hospital' | 'bus' | 'hotel' | 'shop'>('all');
  const [plotRotation, setPlotRotation] = useState<number>(0);
  const [plotAspectRatio, setPlotAspectRatio] = useState<'1:1' | '1:2' | '2:1'>('1:1');
  const [showNeighborGrid, setShowNeighborGrid] = useState<boolean>(false);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const polygonRef = useRef<L.Polygon | null>(null);
  const neighborPolygonsRef = useRef<L.Polygon[]>([]);
  const encroachmentsRef = useRef<L.Polygon[]>([]);
  const cornerMarkersRef = useRef<L.Marker[]>([]);
  const amenitiesRef = useRef<L.Marker[]>([]);
  const layersRef = useRef<{ satellite: L.TileLayer; streets: L.TileLayer } | null>(null);
  const onCoordinatesChangeRef = useRef(onCoordinatesChange);
  const isPinLockedRef = useRef(isPinLocked);
  const lastAutoFitCoordsRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    onCoordinatesChangeRef.current = onCoordinatesChange;
  }, [onCoordinatesChange]);

  useEffect(() => {
    isPinLockedRef.current = isPinLocked;
  }, [isPinLocked]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    let satelliteLayerUrl = 'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'; // Default: Satellite with labels
    
    if (cleanBaseMap) {
      satelliteLayerUrl = 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'; // Clean Satellite (no labels)
    }

    const satelliteLayer = L.tileLayer(satelliteLayerUrl, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Map &copy; Google Maps'
    });

    layersRef.current = {
      satellite: satelliteLayer
    } as any;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      layers: [satelliteLayer]
    }).setView([latitude, longitude], zoom);

    mapInstanceRef.current = map;

    map.on('zoomend', () => {
      setZoom(map.getZoom());
    });

    // Click anywhere on map to point directly to house / location
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (isPinLockedRef.current) {
        setShowLockedToast(true);
        setTimeout(() => setShowLockedToast(false), 2200);
        return;
      }

      const newLat = parseFloat(e.latlng.lat.toFixed(5));
      const newLng = parseFloat(e.latlng.lng.toFixed(5));

      if (markerRef.current) {
        markerRef.current.setLatLng([newLat, newLng]);
      }

      if (onCoordinatesChangeRef.current) {
        setIsScanning(true);
        onCoordinatesChangeRef.current(newLat, newLng);
        setTimeout(() => setIsScanning(false), 500);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        neighborPolygonsRef.current.forEach(poly => poly.remove());
        neighborPolygonsRef.current = [];
        encroachmentsRef.current.forEach(poly => poly.remove());
        encroachmentsRef.current = [];
        cornerMarkersRef.current.forEach(m => m.remove());
        cornerMarkersRef.current = [];
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
        polygonRef.current = null;
      }
    };
  }, []);

  // Sync zoom level
  useEffect(() => {
    if (mapInstanceRef.current && mapInstanceRef.current.getZoom() !== zoom) {
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [zoom]);

  // Sync coordinates, marker, and boundary overlays
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const currentCenter = map.getCenter();
    const tolerance = 0.0001;
    const distance = Math.hypot(currentCenter.lat - latitude, currentCenter.lng - longitude);
    if (distance > tolerance) {
      if (distance > 0.03) {
        // Far or medium jump (e.g. cross city or different district)
        map.flyTo([latitude, longitude], map.getZoom(), { duration: 1.2 });
      } else {
        // Local movement
        map.panTo([latitude, longitude], { animate: true, duration: 0.8 });
      }
    }

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    // Clear previous encroachment overlays and corner markers
    encroachmentsRef.current.forEach(poly => poly.remove());
    encroachmentsRef.current = [];

    cornerMarkersRef.current.forEach(m => m.remove());
    cornerMarkersRef.current = [];

    // Calculate GPS offsets derived directly from plotSizeSqYards (1 sq yd = 0.836127 sq meters)
    const targetSqYds = plotSizeSqYards && plotSizeSqYards > 0 ? plotSizeSqYards : 400;
    const plotSqMeters = targetSqYds * 0.836127;
    
    let widthMeters = Math.sqrt(plotSqMeters);
    let heightMeters = Math.sqrt(plotSqMeters);

    if (plotAspectRatio === '1:2') {
      widthMeters = Math.sqrt(plotSqMeters / 2);
      heightMeters = widthMeters * 2;
    } else if (plotAspectRatio === '2:1') {
      heightMeters = Math.sqrt(plotSqMeters / 2);
      widthMeters = heightMeters * 2;
    }

    const halfW = widthMeters / 2;
    const halfH = heightMeters / 2;

    // Rotation matrix math
    const rad = (plotRotation * Math.PI) / 180;
    const cosR = Math.cos(rad);
    const sinR = Math.sin(rad);

    const rawCorners = [
      { x: -halfW, y: halfH },   // Top-Left
      { x: halfW, y: halfH },    // Top-Right
      { x: halfW, y: -halfH },   // Bottom-Right
      { x: -halfW, y: -halfH }   // Bottom-Left
    ];

    const metersToLat = 1 / 111320;
    const metersToLng = 1 / (111320 * Math.cos((latitude * Math.PI) / 180));

    const polyCoords: [number, number][] = rawCorners.map(pt => {
      const rotX = pt.x * cosR - pt.y * sinR;
      const rotY = pt.x * sinR + pt.y * cosR;
      return [
        latitude + rotY * metersToLat,
        longitude + rotX * metersToLng
      ];
    });

    if (showBoundaryOverlays) {
      if (polygonRef.current) {
        polygonRef.current.setLatLngs(polyCoords);
      } else {
        const poly = L.polygon(polyCoords, {
          color: '#059669',       // Clean Emerald Green Border
          fillColor: '#10b981',   // Green Fill
          fillOpacity: isPlotClippingActive ? 0.15 : 0.35,
          weight: 4,
          dashArray: '6, 4'
        }).addTo(map);

        poly.on('click', (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          const target = e.originalEvent?.target as HTMLElement | SVGElement | undefined;
          if (target && typeof target.blur === 'function') {
            target.blur();
          }
          if (isPinLockedRef.current) {
            setShowLockedToast(true);
            setTimeout(() => setShowLockedToast(false), 2200);
            return;
          }
          const newLat = parseFloat(e.latlng.lat.toFixed(5));
          const newLng = parseFloat(e.latlng.lng.toFixed(5));
          if (onCoordinatesChangeRef.current) {
            setIsScanning(true);
            onCoordinatesChangeRef.current(newLat, newLng);
            setTimeout(() => setIsScanning(false), 500);
          }
        });

        polygonRef.current = poly;
      }

      if (polygonRef.current) {
        polygonRef.current.unbindTooltip();
        polygonRef.current.bindTooltip(`
          <div style="font-family: Inter, sans-serif; padding: 4px 6px;">
            <div style="font-weight: 800; color: #065f46; font-size: 12px;">📍 Selected Plot Sy No: ${surveyNumber || '124/A'}</div>
            <div style="color: #047857; font-size: 11px; font-weight: 600;">Active Boundary (${plotSizeSqYards || 450} sq yd)</div>
          </div>
        `, { direction: 'top', sticky: true, opacity: 0.96 });
      }

      // ── Render Neighboring Cadastral Plots (Only when explicitly enabled) ──
      neighborPolygonsRef.current.forEach(p => p.remove());
      neighborPolygonsRef.current = [];

      if (!isPlotClippingActive && showNeighborGrid) {
        const neighborOffsets = [
          { dx: 1, dy: 0, sub: 'B' },
          { dx: -1, dy: 0, sub: 'C' },
          { dx: 0, dy: 1, sub: '1' },
          { dx: 0, dy: -1, sub: '2' },
          { dx: 1, dy: 1, sub: 'D' },
          { dx: -1, dy: -1, sub: 'A/2' }
        ];

        const baseRoot = (surveyNumber || '124/A').split('/')[0];
        const gapMeters = 3.5;

        neighborOffsets.forEach(nbr => {
          const shiftEastMeters = nbr.dx * (widthMeters + gapMeters);
          const shiftNorthMeters = nbr.dy * (heightMeters + gapMeters);
          
          const nbrCenterLat = latitude + shiftNorthMeters * metersToLat;
          const nbrCenterLng = longitude + shiftEastMeters * metersToLng;

          const nbrCoords: [number, number][] = rawCorners.map(pt => {
            const rotX = pt.x * cosR - pt.y * sinR;
            const rotY = pt.x * sinR + pt.y * cosR;
            return [
              nbrCenterLat + rotY * metersToLat,
              nbrCenterLng + rotX * metersToLng
            ];
          });

          const nbrSyNo = `${baseRoot}/${nbr.sub}`;
          const nbrPoly = L.polygon(nbrCoords, {
            color: '#475569',
            fillColor: '#94a3b8',
            fillOpacity: 0.12,
            weight: 2,
            dashArray: '5, 5'
          }).addTo(map);

          nbrPoly.bindTooltip(`
            <div style="font-family: Inter, sans-serif; padding: 4px 6px;">
              <div style="font-weight: 700; color: #1e293b; font-size: 11px;">Plot Sy No: ${nbrSyNo}</div>
              <div style="color: #2563eb; font-size: 10px; font-weight: 600;">Click to select this plot</div>
            </div>
          `, { direction: 'top', sticky: true, opacity: 0.95 });

          nbrPoly.on('mouseover', () => {
            nbrPoly.setStyle({ color: '#2563eb', weight: 3, fillOpacity: 0.25 });
          });
          nbrPoly.on('mouseout', () => {
            nbrPoly.setStyle({ color: '#475569', weight: 2, fillOpacity: 0.12 });
          });

          nbrPoly.on('click', (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e);
            if (isPinLockedRef.current) return;
            const clickedLat = parseFloat(nbrCenterLat.toFixed(5));
            const clickedLng = parseFloat(nbrCenterLng.toFixed(5));
            if (onCoordinatesChangeRef.current) {
              setIsScanning(true);
              onCoordinatesChangeRef.current(clickedLat, clickedLng);
              setTimeout(() => setIsScanning(false), 500);
            }
          });

          neighborPolygonsRef.current.push(nbrPoly);
        });
      }

      // ── Spatial Mask Clipping Layer ──
      if (isPlotClippingActive) {
        const worldBounds: [number, number][] = [
          [85, -180],
          [85, 180],
          [-85, 180],
          [-85, -180]
        ];
        const spatialMask = L.polygon([worldBounds, polyCoords], {
          color: '#059669',
          fillColor: '#030712',
          fillOpacity: 0.78,
          stroke: true,
          weight: 2,
          dashArray: '4, 4',
          interactive: false
        }).addTo(map);

        encroachmentsRef.current.push(spatialMask);
      }
    } else {
      neighborPolygonsRef.current.forEach(p => p.remove());
      neighborPolygonsRef.current = [];
      if (polygonRef.current) {
        polygonRef.current.remove();
        polygonRef.current = null;
      }
    }

    // Classic Red Location Pin (only shown when showAmenities is true in Proximity view)
    if (showAmenities) {
      const redPinSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="46" viewBox="0 0 384 512" fill="#ea4335" style="filter: drop-shadow(0px 3px 6px rgba(0,0,0,0.5));">
          <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          <circle cx="192" cy="192" r="50" fill="#b31412" />
        </svg>
      `;

      const redPinIcon = L.divIcon({
        html: redPinSvg,
        className: 'classic-red-google-pin',
        iconSize: [34, 46],
        iconAnchor: [17, 46]
      });

      const centerMarker = L.marker([latitude, longitude], { icon: redPinIcon, zIndexOffset: 1000 }).addTo(map);
      markerRef.current = centerMarker;
    }

    // Smart Bounds & Positioning:
    // When coordinates change (from presets, search, or click), smoothly reposition satellite view
    const prevCenter = lastAutoFitCoordsRef.current;
    const distMoved = prevCenter 
      ? Math.hypot(latitude - prevCenter.lat, longitude - prevCenter.lng) 
      : 999;

    const polyBounds = L.latLngBounds(polyCoords);

    if (!showAmenities) {
      if (!prevCenter || distMoved > 0.0008) {
        // Jumping to a location preset or search result: Fly smoothly to bounds
        map.flyToBounds(polyBounds, { padding: [50, 50], maxZoom: 19, duration: 1.0 });
        lastAutoFitCoordsRef.current = { lat: latitude, lng: longitude };
      } else if (distMoved > 0.00003) {
        // Small nudge within plot
        map.panTo([latitude, longitude], { animate: true, duration: 0.4 });
        lastAutoFitCoordsRef.current = { lat: latitude, lng: longitude };
      }
    } else {
      map.panTo([latitude, longitude]);
    }

    // Force Leaflet map layout calculation and tile fetch
    setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 150);

    // Render Encroachment Polygons & Warnings on Leaflet Map
    if (encroachments && encroachments.length > 0) {
      encroachments.forEach((enc: any) => {
        let encCoords: [number, number][] = [];
        if (Array.isArray(enc.coords)) {
          encCoords = enc.coords.map((c: any) => Array.isArray(c) ? [c[0], c[1]] : [c.lat, c.lng]);
        } else if (Array.isArray(enc.coordinates) && enc.coordinates.length >= 2) {
          const [[tlLat, tlLng], [brLat, brLng]] = enc.coordinates;
          encCoords = [[tlLat, tlLng], [tlLat, brLng], [brLat, brLng], [brLat, tlLng]];
        }
        if (encCoords.length < 3) return;
        
        const severityColor = enc.severity === 'HIGH' ? '#dc2626' : enc.severity === 'MEDIUM' ? '#f59e0b' : '#3b82f6';
        
        const encPoly = L.polygon(encCoords, {
          color: severityColor,
          fillColor: severityColor,
          fillOpacity: isPlotClippingActive ? 0.7 : 0.45,
          weight: 3,
          dashArray: '3, 3'
        }).addTo(map);

        encPoly.bindTooltip(`
          <div style="font-family: Inter, sans-serif; padding: 6px; max-width: 250px;">
            <div style="color: ${enc.severity === 'HIGH' ? '#dc2626' : '#d97706'}; font-weight: 900; text-transform: uppercase; font-size: 11px; display: flex; align-items: center; gap: 4px;">
              ⚠️ ${enc.type} (${enc.severity} RISK)
            </div>
            <div style="font-size: 11px; color: #111827; margin-top: 4px; line-height: 1.35; font-weight: 500;">
              ${enc.description}
            </div>
            <div style="margin-top: 6px; padding: 4px 8px; background: #fef2f2; border: 1px solid #fca5a5; border-radius: 4px; font-size: 10.5px; font-weight: 800; color: #991b1b; display: flex; justify-between; items-center;">
              <span>Clipped Encroached Area:</span>
              <span>${enc.areaSqYards} sq yds (${(enc.areaSqYards * 9).toFixed(0)} sq ft)</span>
            </div>
          </div>
        `, { direction: 'top', opacity: 0.98 });

        encroachmentsRef.current.push(encPoly);
      });
    }

    // Clear previous amenities
    amenitiesRef.current.forEach(m => m.remove());
    amenitiesRef.current = [];

    if (showAmenities) {
      // Add 1KM Red Search Zone Circle
      const searchRadius = L.circle([latitude, longitude], {
        radius: 1000,
        color: '#ea4335',
        fillColor: '#ea4335',
        fillOpacity: 0.06,
        weight: 2.5,
        dashArray: '6, 6'
      }).addTo(map);
      amenitiesRef.current.push(searchRadius);

      map.fitBounds(searchRadius.getBounds(), { padding: [-35, -35] });

      const plotCenter = L.latLng(latitude, longitude);
      const baseAmenities = (amenitiesData || []).filter(am => {
        const distMeters = plotCenter.distanceTo(L.latLng(am.lat, am.lng));
        return distMeters <= 980;
      });

      const amenities = baseAmenities.slice(0, 5);

      amenities.forEach(am => {
        let color = '#10b981';
        let typeLabel = 'Landmark';
        let svgIcon = '<span class="text-[12px] font-extrabold leading-none">📍</span>';
        
        if (am.type === 'hospital') { 
          color = '#ef4444';
          typeLabel = 'Hospital / Healthcare';
          svgIcon = '<span class="text-[13px] font-black leading-none">H</span>';
        } else if (am.type === 'school') { 
          color = '#8b5cf6';
          typeLabel = 'School / College';
          svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>';
        } else if (am.type === 'bus') { 
          color = '#3b82f6';
          typeLabel = 'Bus Stand';
          svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>';
        } else if (am.type === 'train') { 
          color = '#4f46e5';
          typeLabel = 'Railway Station';
          svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c-4.42 0-8 .5-8 4v10c0 2.15 1.42 3.96 3.36 4.57L5.41 22.5 7.5 23l1.83-2.5h5.34l1.83 2.5 2.09-.5-1.95-1.93C18.58 19.96 20 18.15 20 16V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>';
        } else if (am.type === 'bank') {
          color = '#10b981';
          typeLabel = 'Bank / ATM';
          svgIcon = '<span class="text-[13px] font-black leading-none">₹</span>';
        } else if (am.type === 'shop') { 
          color = '#06b6d4';
          typeLabel = 'Shopping Hub';
          svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/></svg>';
        }

        const distMeters = plotCenter.distanceTo(L.latLng(am.lat, am.lng));
        const distStr = distMeters < 1000 ? `${Math.round(distMeters)} m` : `${(distMeters / 1000).toFixed(2)} km`;

        const iconHtml = `<div class="group flex flex-col items-center pointer-events-auto cursor-pointer">
          <div class="relative flex items-center justify-center w-[28px] h-[28px] rounded-full shadow-md z-20 transition-transform group-hover:scale-125" style="background-color: ${color}; border: 2px solid white;">
            <div class="relative z-10 text-white flex items-center justify-center font-bold">
              ${svgIcon}
            </div>
            <div class="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r-[2px] border-b-[2px] border-white" style="background-color: ${color};"></div>
          </div>
          <div class="mt-0.5 bg-white/95 backdrop-blur-sm text-[10.5px] font-bold text-gray-900 px-2 py-0.5 rounded-md shadow border border-gray-200/90 whitespace-nowrap max-w-[150px] truncate z-10 group-hover:scale-110 transition-all">
            ${am.name}
          </div>
        </div>`;

        const icon = L.divIcon({
          className: 'custom-amenity-marker-active',
          html: iconHtml,
          iconSize: [150, 48],
          iconAnchor: [75, 48]
        });

        const marker = L.marker([am.lat, am.lng], { icon, zIndexOffset: 300 }).addTo(map);
        marker.bindTooltip(`<div style="font-family: Inter, sans-serif; padding: 2px;"><b>${am.name}</b><br/><span style="color: #059669; font-weight: 700;">${typeLabel} (${distStr} away)</span></div>`, { 
          direction: 'top', 
          offset: [0, -25], 
          opacity: 0.98 
        });
        amenitiesRef.current.push(marker);
      });
    }

  }, [latitude, longitude, showBoundaryOverlays, encroachments, showAmenities, amenitiesData, amenitiesData?.length, cleanBaseMap, plotSizeSqYards, activeCategoryFilter, isPlotClippingActive, surveyNumber, showNeighborGrid]);

  const handleSelectPresetLocation = (loc: typeof POPULAR_LOCATIONS[0]) => {
    if (onCoordinatesChange) {
      setIsScanning(true);
      onCoordinatesChange(loc.lat, loc.lng);
      setTimeout(() => setIsScanning(false), 500);
    }
  };

  const currentList = presetsList ? presetsList.map(p => ({ name: p.name, lat: p.latitude, lng: p.longitude })) : POPULAR_LOCATIONS;
  const activePresetItem = currentList.find(p => 
    p.name === selectedLocationName ||
    (selectedLocationName && (p.name.includes(selectedLocationName) || selectedLocationName.includes(p.name))) ||
    Math.hypot(p.lat - latitude, p.lng - longitude) < 0.003
  );
  const activePresetVal = activePresetItem ? activePresetItem.name : '';

  return (
    <div className="relative w-full h-full select-none">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Location Preset Selector */}
      <div className="absolute top-4 left-4 z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-sm">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg shadow-md px-3 py-1.5 flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-600 shrink-0" />
          <select 
            value={activePresetVal}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) return;
              if (onSelectPreset) {
                onSelectPreset(val);
              } else {
                const selected = currentList.find(p => p.name === val);
                if (selected) handleSelectPresetLocation(selected);
              }
            }}
            className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer max-w-[210px] truncate"
          >
            <option value="">Jump to location preset...</option>
            {currentList.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Zoom & Center Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (mapInstanceRef.current) {
              if (polygonRef.current) {
                mapInstanceRef.current.flyToBounds(polygonRef.current.getBounds(), { padding: [50, 50], maxZoom: 19, duration: 0.8 });
              } else {
                mapInstanceRef.current.setView([latitude, longitude], 19, { animate: true });
              }
            }
          }}
          className="w-10 h-10 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-md border border-emerald-600 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          title="Center Plot Location in Satellite View"
        >
          <Target className="w-5 h-5 text-emerald-200 animate-pulse" />
        </button>

        <button 
          type="button"
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.min(prev + 1, 20)); }}
          className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button 
          type="button"
          onClick={(e) => { e.stopPropagation(); setZoom(prev => Math.max(prev - 1, 10)); }}
          className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 rounded-lg shadow-md border border-gray-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>

      {/* Top Right Controls: Pin Lock & Plot Clipping */}
      <div className="absolute top-3 right-3 z-20 flex flex-wrap items-center justify-end gap-1.5 max-w-[340px]">

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleClipping();
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[9px] font-extrabold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer ${
            isPlotClippingActive
              ? 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700 ring-1 ring-emerald-300'
              : 'bg-white/95 backdrop-blur-md border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
          title={isPlotClippingActive ? "Disable Plot Area Clipping" : "Clip map view strictly to the plot area boundary"}
        >
          <Scissors className={`w-3 h-3 ${isPlotClippingActive ? 'text-white' : 'text-emerald-600'}`} />
          <span>{isPlotClippingActive ? 'Clipping ON' : 'Clip Plot'}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsPinLocked(prev => !prev);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[9px] font-extrabold uppercase tracking-wider shadow-md transition-all active:scale-95 cursor-pointer ${
            isPinLocked 
              ? 'bg-amber-500 border-amber-600 text-white hover:bg-amber-600' 
              : 'bg-emerald-50/95 backdrop-blur-md border-emerald-200 text-emerald-700 hover:bg-emerald-100'
          }`}
          title={isPinLocked ? "Unlock Pin (Allows clicking map to reposition pin)" : "Lock Pin (Prevents accidental map clicks)"}
        >
          {isPinLocked ? (
            <>
              <Lock className="w-3 h-3" />
              <span>Pin Locked</span>
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3 animate-pulse" />
              <span>Map Clickable</span>
            </>
          )}
        </button>
      </div>

      {/* Toast Alert */}
      {showLockedToast && (
        <div className="absolute top-16 right-4 z-[400] bg-amber-500 text-white px-3 py-1.5 rounded-lg shadow-lg text-[10px] font-bold uppercase tracking-wider animate-bounce">
          ⚠️ Pin Locked. Toggle "Pin Locked" at the top-right to edit.
        </div>
      )}
    </div>
  );
}
