import React, { useState } from 'react';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crosshair,
  Layers,
  AlertTriangle,
  Route,
  Navigation
} from 'lucide-react';
import { Place, IncidentRiskZone, ROAD_JUNCTIONS, ROAD_EDGES, JunctionNode } from '../data/cityData';

interface InteractiveMapProps {
  places: Place[];
  riskZones: IncidentRiskZone[];
  reports: Array<{
    id: string;
    coords: { x: number; y: number };
    category: string;
    matchesCount: number;
    hasPhoto: boolean;
  }>;
  selectedPlaceId: string | null;
  onSelectPlace: (id: string) => void;
  isPinDropMode: boolean;
  setIsPinDropMode: (val: boolean) => void;
  tempPin: { x: number; y: number } | null;
  onMapClick: (coords: { x: number; y: number }) => void;
  isNight: boolean;
  routeFrom?: string;
  routeTo?: string;
  fastestRoutePath?: string[];
  safestRoutePath?: string[];
  showRoutes?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  riskZones,
  reports,
  selectedPlaceId,
  onSelectPlace,
  isPinDropMode,
  setIsPinDropMode,
  tempPin,
  onMapClick,
  isNight,
  routeFrom,
  routeTo,
  fastestRoutePath = [],
  safestRoutePath = [],
  showRoutes = false
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [layers, setLayers] = useState({
    places: true,
    hazards: true,
    roads: true,
    reports: true
  });

  const nodeMap = new Map<string, JunctionNode>(ROAD_JUNCTIONS.map(j => [j.id, j]));

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPinDropMode) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 70;

    const clampedX = Math.max(5, Math.min(95, Math.round(clickX * 10) / 10));
    const clampedY = Math.max(5, Math.min(65, Math.round(clickY * 10) / 10));

    onMapClick({ x: clampedX, y: clampedY });
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'heritage':
        return '#f59e0b';
      case 'gem':
        return '#06b6d4';
      case 'food':
        return '#f43f5e';
      case 'cafe':
        return '#ec4899';
      case 'nature':
        return '#10b981';
      case 'hotel':
        return '#8b5cf6';
      case 'shopping':
        return '#eab308';
      case 'budget':
        return '#14b8a6';
      default:
        return '#f97316';
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Map Control Toolbar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-500" />
            Schematic Urban Grid
          </span>
          <span className="text-[11px] text-[var(--text-muted)] font-mono">
            Pune Metro (0–100 × 0–70)
          </span>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Pin Drop Button */}
          <button
            onClick={() => setIsPinDropMode(!isPinDropMode)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all ${
              isPinDropMode
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-rose-500'
            }`}
            title="Drop marker for citizen report"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>{isPinDropMode ? 'Tap Map to Pin' : 'Drop Pin'}</span>
          </button>

          {/* Zoom In/Out */}
          <button
            onClick={() => setZoomLevel(prev => (prev === 1 ? 1.3 : prev === 1.3 ? 1.6 : 1))}
            className="p-1.5 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]"
            title="Toggle Zoom"
          >
            {zoomLevel === 1 ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Zoom */}
          {zoomLevel !== 1 && (
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Layer toggles */}
          <button
            onClick={() => setLayers(prev => ({ ...prev, hazards: !prev.hazards }))}
            className={`px-2 py-1 rounded-lg text-[11px] font-semibold border ${
              layers.hazards
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                : 'opacity-50 border-[var(--border-subtle)]'
            }`}
          >
            Hazards {layers.hazards ? '✓' : ''}
          </button>
        </div>
      </div>

      {/* Map Display Viewport */}
      <div className="relative w-full aspect-[100/70] bg-[var(--map-bg)] border border-[var(--border-strong)] rounded-2xl overflow-hidden shadow-inner select-none transition-colors">
        <svg
          viewBox="0 0 100 70"
          className={`w-full h-full transition-transform duration-300 ${
            isPinDropMode ? 'cursor-crosshair' : 'cursor-default'
          }`}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: '50% 50%'
          }}
          onClick={handleSvgClick}
        >
          <defs>
            <linearGradient id="puneRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--map-river)" />
              <stop offset="100%" stopColor="var(--map-river-deep)" />
            </linearGradient>

            <radialGradient id="hazardGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#f97316" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>

            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Topography: Sinhagad Ridges & Vetal Tekdi */}
          <g className="hills opacity-60">
            <path
              d="M 5 70 Q 15 58 28 65 Q 38 68 45 70 Z"
              fill="var(--map-hill-fill)"
              stroke="var(--map-hill-stroke)"
              strokeWidth="0.4"
            />
            <text x="12" y="67" fontSize="2" fill="var(--text-subtle)" fontStyle="italic">
              Sinhagad Ridge
            </text>

            <ellipse
              cx="23"
              cy="32"
              rx="7"
              ry="4.5"
              fill="var(--map-hill-fill)"
              stroke="var(--map-hill-stroke)"
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
            <text x="19" y="32.5" fontSize="1.8" fill="var(--text-subtle)" fontStyle="italic">
              Vetal Tekdi (2600ft)
            </text>
          </g>

          {/* Natural River Convergence (Mula, Mutha, Mula-Mutha) */}
          <g className="rivers">
            <path
              d="M 10 10 Q 30 18 49 27"
              fill="none"
              stroke="url(#puneRiverGrad)"
              strokeWidth="2.0"
              strokeLinecap="round"
            />
            <path
              d="M 20 54 Q 35 44 49 27"
              fill="none"
              stroke="url(#puneRiverGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M 49 27 Q 66 24 95 28"
              fill="none"
              stroke="url(#puneRiverGrad)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <text x="73" y="26.5" fontSize="1.8" fill="#0284c7" fontWeight="bold" opacity="0.85">
              Mula-Mutha River
            </text>
          </g>

          {/* Road Network Grid */}
          {layers.roads && (
            <g className="road-network">
              {ROAD_EDGES.map((edge, idx) => {
                const u = nodeMap.get(edge.u);
                const v = nodeMap.get(edge.v);
                if (!u || !v) return null;

                return (
                  <line
                    key={`edge-${edge.u}-${edge.v}-${idx}`}
                    x1={u.x}
                    y1={u.y}
                    x2={v.x}
                    y2={v.y}
                    stroke={edge.isShortcut ? 'var(--map-shortcut)' : 'var(--map-road-minor)'}
                    strokeWidth={edge.isShortcut ? 0.9 : 0.7}
                    strokeDasharray={edge.isShortcut ? '1.5 1' : undefined}
                    opacity={edge.isShortcut ? 0.8 : 0.55}
                  />
                );
              })}
            </g>
          )}

          {/* Active Dual-Path Routes Visualization */}
          {showRoutes && (
            <g className="active-routes">
              {/* Fastest Route: Dashed Blue */}
              {fastestRoutePath.length > 1 && (
                <polyline
                  points={fastestRoutePath
                    .map(id => {
                      const n = nodeMap.get(id);
                      return n ? `${n.x},${n.y}` : '';
                    })
                    .filter(Boolean)
                    .join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  strokeDasharray="2 1.5"
                  strokeLinecap="round"
                  className="animate-dash"
                  opacity="0.9"
                />
              )}

              {/* Safest Route: Solid Glowing Emerald */}
              {safestRoutePath.length > 1 && (
                <polyline
                  points={safestRoutePath
                    .map(id => {
                      const n = nodeMap.get(id);
                      return n ? `${n.x},${n.y}` : '';
                    })
                    .filter(Boolean)
                    .join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  filter="url(#glowGreen)"
                  opacity="0.95"
                />
              )}
            </g>
          )}

          {/* Road Junction Nodes */}
          {layers.roads &&
            ROAD_JUNCTIONS.map(junction => {
              const isStart = routeFrom === junction.id;
              const isDest = routeTo === junction.id;

              return (
                <g key={junction.id}>
                  <circle
                    cx={junction.x}
                    cy={junction.y}
                    r={isStart || isDest ? 2.2 : 0.9}
                    fill={isStart ? '#3b82f6' : isDest ? '#10b981' : 'var(--map-road-major)'}
                    stroke="#ffffff"
                    strokeWidth={isStart || isDest ? 0.6 : 0.2}
                  />
                  {(isStart || isDest) && (
                    <text
                      x={junction.x}
                      y={junction.y - 3}
                      fontSize="2"
                      fill="var(--text-main)"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {isStart ? 'START' : 'DEST'}
                    </text>
                  )}
                </g>
              );
            })}

          {/* Incident Risk Zones */}
          {layers.hazards &&
            riskZones.map(rz => (
              <g
                key={rz.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredEntity(`Hazard: ${rz.name}`)}
                onMouseLeave={() => setHoveredEntity(null)}
              >
                <circle
                  cx={rz.x}
                  cy={rz.y}
                  r={rz.r}
                  fill="url(#hazardGlow)"
                  stroke={rz.isCitizenGenerated ? '#f59e0b' : '#ef4444'}
                  strokeWidth={isNight ? 0.6 : 0.4}
                  strokeDasharray={isNight ? '1.5 1' : undefined}
                  className="animate-pulse-glow"
                />
                <circle
                  cx={rz.x}
                  cy={rz.y}
                  r={1.3}
                  fill={rz.isCitizenGenerated ? '#d97706' : '#dc2626'}
                />
                <text
                  x={rz.x}
                  y={rz.y + 0.6}
                  fontSize="1.6"
                  fontWeight="black"
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  !
                </text>
              </g>
            ))}

          {/* Citizen Report Pins */}
          {layers.reports &&
            reports.map(rep => (
              <g
                key={rep.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredEntity(`Report: ${rep.category} (${rep.matchesCount} confirms)`)}
                onMouseLeave={() => setHoveredEntity(null)}
              >
                <circle
                  cx={rep.coords.x}
                  cy={rep.coords.y}
                  r={1.8}
                  fill={rep.matchesCount >= 3 ? '#10b981' : '#f59e0b'}
                  stroke="#ffffff"
                  strokeWidth="0.4"
                />
                <text
                  x={rep.coords.x}
                  y={rep.coords.y + 0.5}
                  fontSize="1.3"
                  fill="#ffffff"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {rep.matchesCount}
                </text>
              </g>
            ))}

          {/* Temporary Dropped Pin */}
          {tempPin && (
            <g className="temp-pin">
              <circle
                cx={tempPin.x}
                cy={tempPin.y}
                r={2.5}
                fill="#ec4899"
                fillOpacity="0.4"
                stroke="#db2777"
                strokeWidth="0.6"
                className="animate-ping"
              />
              <circle cx={tempPin.x} cy={tempPin.y} r={1.6} fill="#db2777" stroke="#ffffff" strokeWidth="0.4" />
            </g>
          )}

          {/* Places of Interest Markers */}
          {layers.places &&
            places.map(place => {
              const isSelected = selectedPlaceId === place.id;
              const col = getCategoryColor(place.category);

              return (
                <g
                  key={place.id}
                  className="cursor-pointer group"
                  onClick={e => {
                    e.stopPropagation();
                    onSelectPlace(place.id);
                  }}
                  onMouseEnter={() => setHoveredEntity(`${place.name} • ₹${place.cost}`)}
                  onMouseLeave={() => setHoveredEntity(null)}
                >
                  {isSelected && (
                    <circle
                      cx={place.coords.x}
                      cy={place.coords.y}
                      r={3.4}
                      fill="none"
                      stroke={col}
                      strokeWidth="0.6"
                      strokeDasharray="1.5 1"
                      className="animate-dash"
                    />
                  )}

                  <circle
                    cx={place.coords.x}
                    cy={place.coords.y}
                    r={isSelected ? 2.4 : 1.7}
                    fill={col}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                  />

                  <text
                    x={place.coords.x}
                    y={place.coords.y + (isSelected ? 4.2 : 3.6)}
                    fontSize="1.9"
                    fill="var(--text-main)"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >
                    {place.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredEntity && (
          <div className="absolute bottom-2 left-2 pointer-events-none bg-[var(--bg-card)]/95 border border-[var(--border-strong)] px-2.5 py-1 rounded-md text-[11px] font-semibold shadow-md text-[var(--text-main)] animate-fade-in">
            {hoveredEntity}
          </div>
        )}

        {/* Pin Drop Mode Banner */}
        {isPinDropMode && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg flex items-center gap-1.5 animate-pulse">
            <Crosshair className="w-3.5 h-3.5" />
            <span>Click anywhere to place civic hazard marker</span>
          </div>
        )}
      </div>

      {/* Map Category Legend */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Heritage
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Hidden Gems
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Food & Dining
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Nature
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Hotel
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Hazard Zone
          </span>
        </div>

        {showRoutes && (
          <div className="flex items-center gap-3 font-medium text-[11px]">
            <span className="flex items-center gap-1 text-sky-400">
              <span className="w-3.5 h-0.5 bg-sky-400 border-dashed" /> Fastest (Shortcuts)
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-3.5 h-0.5 bg-emerald-500" /> Safest (Avoids Danger)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
