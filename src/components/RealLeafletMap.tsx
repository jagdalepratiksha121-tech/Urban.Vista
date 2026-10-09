import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Place, IncidentRiskZone, ROAD_JUNCTIONS, JunctionNode } from '../data/cityData';
import { ExternalLink, Layers, Navigation, MapPin } from 'lucide-react';

interface RealLeafletMapProps {
  places: Place[];
  riskZones?: IncidentRiskZone[];
  selectedPlaceId: string | null;
  onSelectPlace: (id: string) => void;
  onOpenDetailModal?: (place: Place) => void;
  userLocation?: { lat: number; lng: number } | null;
  fastestRoutePath?: string[];
  safestRoutePath?: string[];
  showRoutes?: boolean;
  routeFrom?: string;
  routeTo?: string;
  height?: string;
  centerCoords?: { lat: number; lng: number; zoom?: number } | null;
  onLocateMe?: () => void;
  isLocating?: boolean;
}

type MapProvider = 'osm' | 'carto' | 'satellite' | 'google';

export const RealLeafletMap: React.FC<RealLeafletMapProps> = ({
  places,
  riskZones = [],
  selectedPlaceId,
  onSelectPlace,
  onOpenDetailModal,
  userLocation,
  fastestRoutePath = [],
  safestRoutePath = [],
  showRoutes = false,
  height = '100%',
  centerCoords,
  onLocateMe,
  isLocating = false
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const riskZonesLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());

  const [activeProvider, setActiveProvider] = useState<MapProvider>('osm');
  const [googleSatelliteMode, setGoogleSatelliteMode] = useState<boolean>(false);

  // Identify currently focused place or default to central Pune
  const currentSelectedPlace = places.find(p => p.id === selectedPlaceId) || places[0];

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on central Pune (18.5204° N, 73.8567° E)
    const map = L.map(mapContainerRef.current, {
      center: [18.5204, 73.8567],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true
    });

    // Default tile layer: Standard OpenStreetMap
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Layer Groups
    riskZonesLayerRef.current = L.layerGroup().addTo(map);
    routesLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Change Tile Layer when provider changes (OSM / Carto / Satellite)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
      tileLayerRef.current = null;
    }

    if (activeProvider === 'carto') {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      ).addTo(map);
    } else if (activeProvider === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 18,
          attribution: 'Tiles &copy; Esri, USGS, NOAA'
        }
      ).addTo(map);
    } else if (activeProvider === 'osm') {
      tileLayerRef.current = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }

    // Refresh size when toggling back from Google embed
    setTimeout(() => {
      map.invalidateSize();
    }, 150);
  }, [activeProvider]);

  // 3. Center override (when locality or city selector changes)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !centerCoords || activeProvider === 'google') return;
    map.flyTo([centerCoords.lat, centerCoords.lng], centerCoords.zoom || 14, {
      duration: 1.2
    });
  }, [centerCoords, activeProvider]);

  // 4. User Geolocation Pin
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-loc-pin',
        html: `
          <div style="position: relative; width: 22px; height: 22px;">
            <div style="position: absolute; inset: 0; background-color: #3b82f6; border-radius: 9999px; opacity: 0.4; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 16px; height: 16px; margin: 3px; background-color: #2563eb; border: 2.5px solid white; border-radius: 9999px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .bindTooltip('<strong>Your Location</strong>', { direction: 'top' })
          .addTo(map);
      }
      map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1.2 });
    } else if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
  }, [userLocation]);

  // 5. Update Place Markers and Risk Zones
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const riskLayer = riskZonesLayerRef.current;
    if (!map || !markersLayer || !riskLayer) return;

    markersLayer.clearLayers();
    riskLayer.clearLayers();
    markersMapRef.current.clear();

    // A. Render Risk Zones (if any)
    riskZones.forEach(rz => {
      const circle = L.circle([rz.lat, rz.lng], {
        radius: rz.r * 110,
        color: rz.isCitizenGenerated ? '#f59e0b' : '#ef4444',
        fillColor: rz.isCitizenGenerated ? '#fef3c7' : '#fee2e2',
        fillOpacity: 0.35,
        weight: 1.5
      });

      circle.bindTooltip(`
        <div style="font-family: inherit; font-size: 11px;">
          <strong style="color: #b91c1c;">Caution:</strong> ${rz.name}<br/>
          <span style="color: #475569;">${rz.category} • Severity ${rz.severity}/10</span>
        </div>
      `, { direction: 'top' });

      circle.addTo(riskLayer);
    });

    // B. Render Place Markers
    places.forEach(place => {
      const isSelected = place.id === selectedPlaceId;
      const isFort = place.isFort || place.category === 'forts';

      // Distinguish Forts & Heritage with rich saffron / gold styling
      let badgeBg = '#2563eb'; // blue
      let badgeIcon = '📍';

      if (isFort) {
        badgeBg = '#d97706'; // Saffron/amber
        badgeIcon = '🏰';
      } else if (place.category === 'heritage') {
        badgeBg = '#b45309';
        badgeIcon = '🏛️';
      } else if (place.category === 'gem') {
        badgeBg = '#0d9488'; // teal
        badgeIcon = '✨';
      } else if (place.category === 'food' || place.category === 'cafe' || place.category === 'budget') {
        badgeBg = '#e11d48'; // rose
        badgeIcon = '🍽️';
      } else if (place.category === 'nature') {
        badgeBg = '#059669'; // emerald
        badgeIcon = '🌲';
      }

      const iconHtml = `
        <div style="
          background-color: ${isSelected ? '#0f172a' : badgeBg};
          color: white;
          padding: 3px 7px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          white-space: nowrap;
          border: 2px solid white;
          box-shadow: 0 3px 6px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          transform: ${isSelected ? 'scale(1.18)' : 'scale(1)'};
          transition: transform 0.2s ease, background-color 0.2s ease;
        ">
          <span style="font-size: 10px;">${badgeIcon}</span>
          <span>${place.cost === 0 ? 'Free' : `₹${place.cost}`}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-place-marker',
        html: iconHtml,
        iconSize: [60, 24],
        iconAnchor: [30, 12]
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });

      // Direct Google Maps links
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', ' + place.postalLocality)}`;
      const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

      // Interactive popup with real data and Google Maps buttons
      const popupContent = document.createElement('div');
      popupContent.style.width = '250px';
      popupContent.style.padding = '8px';
      popupContent.style.fontFamily = 'Inter, system-ui, sans-serif';
      popupContent.innerHTML = `
        <div style="margin-bottom: 6px; position: relative;">
          <img
            src="${place.imageUrl}"
            alt="${place.name}"
            style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px; background-color: #f1f5f9;"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80';"
          />
          ${isFort ? `
            <span style="
              position: absolute;
              top: 6px;
              left: 6px;
              background-color: #ff9933;
              color: #ffffff;
              font-size: 9px;
              font-weight: 700;
              padding: 2px 6px;
              border-radius: 4px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            ">
              🇮🇳 HISTORIC FORT
            </span>
          ` : ''}
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: ${badgeBg};">
            ${place.category}
          </span>
          <span style="font-size: 11px; font-weight: 700; color: #0f172a;">
            ${place.cost === 0 ? 'Free Entry' : `₹${place.cost}`}
          </span>
        </div>
        <strong style="font-size: 13px; color: #0f172a; display: block; line-height: 1.25; margin-bottom: 3px;">
          ${place.name}
        </strong>
        <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 6px;">
          📍 ${place.neighborhood}
        </span>
        <div style="font-size: 10px; color: #475569; margin-bottom: 8px; line-height: 1.3;">
          🕒 ${place.visitingHours}
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px; padding-top: 6px; border-top: 1px solid #e2e8f0;">
          <div style="display: flex; gap: 6px;">
            <button id="view-details-btn-${place.id}" style="
              flex: 1;
              padding: 5px 8px;
              background-color: #2563eb;
              color: white;
              border: none;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
            ">
              View Details
            </button>
            <a href="${googleDirectionsUrl}" target="_blank" rel="noopener noreferrer" style="
              padding: 5px 8px;
              background-color: #f1f5f9;
              color: #0f172a;
              border: 1px solid #cbd5e1;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 3px;
            ">
              Route ↗
            </a>
          </div>
          <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="
            text-align: center;
            font-size: 10px;
            color: #1d4ed8;
            font-weight: 600;
            text-decoration: underline;
            padding-top: 2px;
          ">
            Open in Google Maps ↗
          </a>
        </div>
      `;

      // Attach button listener on popup open
      marker.on('popupopen', () => {
        const btn = document.getElementById(`view-details-btn-${place.id}`);
        if (btn && onOpenDetailModal) {
          btn.onclick = () => onOpenDetailModal(place);
        }
      });

      marker.bindPopup(popupContent, { maxWidth: 270 });

      marker.on('click', () => {
        onSelectPlace(place.id);
      });

      marker.addTo(markersLayer);
      markersMapRef.current.set(place.id, marker);
    });

    // Auto fit bounds if places changed and no specific place selected
    if (places.length > 1 && !selectedPlaceId) {
      const bounds = L.latLngBounds(places.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [places, riskZones, onSelectPlace, onOpenDetailModal]);

  // 6. Handle selectedPlaceId centering & opening popup
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPlaceId || activeProvider === 'google') return;

    const selected = places.find(p => p.id === selectedPlaceId);
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 15, { duration: 1.0 });
      const marker = markersMapRef.current.get(selectedPlaceId);
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    }
  }, [selectedPlaceId, places, activeProvider]);

  // 7. Draw Route Polyline Visualizations
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routeLayer = routesLayerRef.current;
    if (!map || !routeLayer) return;

    routeLayer.clearLayers();
    if (!showRoutes) return;

    const nodeMap = new Map<string, JunctionNode>(ROAD_JUNCTIONS.map(j => [j.id, j]));

    // Fastest Route: Dashed Blue
    if (fastestRoutePath.length > 1) {
      const fastestCoords = fastestRoutePath
        .map(id => {
          const n = nodeMap.get(id);
          return n ? [n.lat, n.lng] as [number, number] : null;
        })
        .filter((c): c is [number, number] => Boolean(c));

      if (fastestCoords.length > 1) {
        L.polyline(fastestCoords, {
          color: '#2563eb',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.9
        }).addTo(routeLayer);
      }
    }

    // Safest Route: Solid Emerald
    if (safestRoutePath.length > 1) {
      const safestCoords = safestRoutePath
        .map(id => {
          const n = nodeMap.get(id);
          return n ? [n.lat, n.lng] as [number, number] : null;
        })
        .filter((c): c is [number, number] => Boolean(c));

      if (safestCoords.length > 1) {
        L.polyline(safestCoords, {
          color: '#059669',
          weight: 5,
          opacity: 0.95
        }).addTo(routeLayer);
      }
    }
  }, [showRoutes, fastestRoutePath, safestRoutePath]);

  // Target query for Google Maps Live View
  const googleMapTargetLat = currentSelectedPlace ? currentSelectedPlace.lat : 18.5204;
  const googleMapTargetLng = currentSelectedPlace ? currentSelectedPlace.lng : 73.8567;
  const googleMapQuery = currentSelectedPlace
    ? `${currentSelectedPlace.lat},${currentSelectedPlace.lng}`
    : 'Pune, Maharashtra, India';

  const googleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(googleMapQuery)}&t=${googleSatelliteMode ? 'k' : 'm'}&z=14&ie=UTF8&iwloc=&output=embed`;
  const googleDirectAppUrl = currentSelectedPlace
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSelectedPlace.name + ', ' + currentSelectedPlace.postalLocality)}`
    : 'https://www.google.com/maps/search/?api=1&query=Pune';

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100 flex flex-col" style={{ height }}>
      
      {/* Top Map Mode Switcher Bar */}
      <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2 z-10 shrink-0 select-none">
        {/* Layer / Provider Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveProvider('osm')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all border flex items-center gap-1 ${
              activeProvider === 'osm'
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🗺️ Streets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProvider('carto')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all border flex items-center gap-1 ${
              activeProvider === 'carto'
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🏙️ Clean Light</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProvider('satellite')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all border flex items-center gap-1 ${
              activeProvider === 'satellite'
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🛰️ Satellite</span>
          </button>

          {/* Real Google Map Mode Button */}
          <button
            type="button"
            onClick={() => setActiveProvider('google')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all border flex items-center gap-1 ${
              activeProvider === 'google'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>🌐 Real Google Map</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {activeProvider === 'google' ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setGoogleSatelliteMode(!googleSatelliteMode)}
                className="text-xs px-2 py-0.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium"
              >
                {googleSatelliteMode ? '🗺️ Road View' : '🛰️ Satellite'}
              </button>
              <a
                href={googleDirectAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 shadow-2xs"
              >
                <span>Google Maps App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ) : (
            <>
              {onLocateMe && (
                <button
                  type="button"
                  onClick={onLocateMe}
                  disabled={isLocating}
                  className={`px-2 py-1 rounded-md border text-xs font-semibold flex items-center gap-1 transition-colors ${
                    isLocating
                      ? 'bg-blue-50 text-blue-600 border-blue-200 animate-pulse'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                  title="Center map on your location"
                >
                  <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin text-blue-600' : 'text-blue-600'}`} />
                  <span>{isLocating ? 'Locating...' : 'My Location'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (mapInstanceRef.current && places.length > 0) {
                    const bounds = L.latLngBounds(places.map(p => [p.lat, p.lng]));
                    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
                  }
                }}
                className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-2 py-1 rounded-md border border-slate-200 text-xs flex items-center gap-1"
                title="Fit all places in view"
              >
                <span>Fit All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Map Body */}
      <div className="relative flex-1 w-full h-full min-h-[360px]">
        {/* Leaflet Live Map Canvas */}
        <div
          ref={mapContainerRef}
          className={`w-full h-full ${activeProvider === 'google' ? 'hidden' : 'block'}`}
        />

        {/* Real Google Map Embed View */}
        {activeProvider === 'google' && (
          <div className="w-full h-full relative flex flex-col bg-slate-100">
            {/* Context bar with currently focused place */}
            {currentSelectedPlace && (
              <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-bold truncate">{currentSelectedPlace.name}</span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline">
                    ({currentSelectedPlace.neighborhood})
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-300 font-mono">
                    {googleMapTargetLat.toFixed(4)}°, {googleMapTargetLng.toFixed(4)}°
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${googleMapTargetLat},${googleMapTargetLng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-300 hover:text-white underline font-semibold flex items-center gap-0.5"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Navigate</span>
                  </a>
                </div>
              </div>
            )}

            {/* Google Map iframe */}
            <iframe
              title={`Google Map - ${currentSelectedPlace?.name || 'City Explorer'}`}
              src={googleEmbedUrl}
              className="w-full flex-1 border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        )}

        {/* Floating status badge on Leaflet map */}
        {activeProvider !== 'google' && (
          <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-900">
              {activeProvider === 'osm' ? 'OpenStreetMap Live' : activeProvider === 'carto' ? 'CartoDB Live' : 'ESRI Satellite'}
            </span>
            <span className="text-slate-400">•</span>
            <span>{places.length} verified places</span>
          </div>
        )}
      </div>
    </div>
  );
};
