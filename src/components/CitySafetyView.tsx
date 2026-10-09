import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Route,
  Phone,
  Info,
  CheckCircle2,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { IncidentRiskZone, ROAD_JUNCTIONS, Place } from '../data/cityData';
import { RealLeafletMap } from './RealLeafletMap';

interface CitySafetyViewProps {
  places: Place[];
  riskZones: IncidentRiskZone[];
  routeFrom: string;
  setRouteFrom: (id: string) => void;
  routeTo: string;
  setRouteTo: (id: string) => void;
  fastestRoute: {
    path: string[];
    distanceKm: number;
    timeMins: number;
    riskExposurePercent: number;
  };
  safestRoute: {
    path: string[];
    distanceKm: number;
    timeMins: number;
    riskExposurePercent: number;
  };
}

export const CitySafetyView: React.FC<CitySafetyViewProps> = ({
  places,
  riskZones,
  routeFrom,
  setRouteFrom,
  routeTo,
  setRouteTo,
  fastestRoute,
  safestRoute
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const emergencyContacts = [
    { title: 'National Emergency SOS', number: '112', desc: 'Police, Fire, Medical dispatch' },
    { title: "Pune Women's Helpline", number: '1091', desc: 'Pune Police safety response' },
    { title: 'Pune Traffic Police Helpline', number: '1073', desc: 'Road incidents and towing' },
    { title: 'Disaster Management Cell', number: '020-25501269', desc: 'Waterlogging & tree falls' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Safety Information</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            City Safety & Navigation Advisories
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Verified public safety records, lighting advisories, documented incident hotspots, and safer routing recommendations in Pune.
          </p>
        </div>

        {/* Responsible Safety Policy Notice (Critical Requirement) */}
        <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Data Policy & Limitations:</strong> We do not label neighborhoods dangerous based on rumors or demographic characteristics. Documented hotspots reflect official traffic incident records or municipal lighting audits. We never promise that any route or location is completely safe. Always remain alert to your physical surroundings.
          </div>
        </div>
      </div>

      {/* Interactive Map & Safe Route Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Real Leaflet Map */}
        <div className="lg:col-span-7 h-[480px]">
          <RealLeafletMap
            places={places}
            riskZones={riskZones}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={id => setSelectedPlaceId(id)}
            fastestRoutePath={fastestRoute.path}
            safestRoutePath={safestRoute.path}
            showRoutes={true}
            routeFrom={routeFrom}
            routeTo={routeTo}
            height="480px"
          />
        </div>

        {/* Safe Route Planning Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Route className="w-3.5 h-3.5" />
              <span>Safer Route Suggestions</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Dual-Path Dijkstra Router
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare fastest travel distance against routes that bypass documented risk zones.
            </p>
          </div>

          {/* Start and Destination Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Start Location
              </label>
              <select
                value={routeFrom}
                onChange={e => setRouteFrom(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 outline-none"
              >
                {ROAD_JUNCTIONS.map(j => (
                  <option key={`from-${j.id}`} value={j.id}>
                    {j.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Destination
              </label>
              <select
                value={routeTo}
                onChange={e => setRouteTo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 outline-none"
              >
                {ROAD_JUNCTIONS.map(j => (
                  <option key={`to-${j.id}`} value={j.id}>
                    {j.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Fastest Route */}
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs">
              <span className="font-semibold text-slate-600 block">Fastest Route</span>
              <span className="text-lg font-bold text-blue-600 font-mono mt-0.5 block">
                {fastestRoute.timeMins} mins
              </span>
              <span className="text-[11px] text-slate-500 block">
                {fastestRoute.distanceKm} km
              </span>
              <div className="mt-2 text-[11px] text-amber-700">
                Exposure: {fastestRoute.riskExposurePercent}%
              </div>
            </div>

            {/* Safest Route */}
            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 text-xs">
              <span className="font-semibold text-emerald-800 block">Safest Route</span>
              <span className="text-lg font-bold text-emerald-600 font-mono mt-0.5 block">
                {safestRoute.timeMins} mins
              </span>
              <span className="text-[11px] text-slate-500 block">
                {safestRoute.distanceKm} km
              </span>
              <div className="mt-2 text-[11px] text-emerald-700 font-medium">
                Low Exposure: {safestRoute.riskExposurePercent}%
              </div>
            </div>
          </div>

          {/* Route Tradeoff Explanation */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800 block mb-0.5">Route Tradeoff:</span>
            {safestRoute.timeMins > fastestRoute.timeMins ? (
              <span>
                The safer route adds <strong>+{safestRoute.timeMins - fastestRoute.timeMins} mins</strong> to avoid unlit underpasses and heavy freight merge points, reducing risk exposure by{' '}
                <strong>{Math.max(0, fastestRoute.riskExposurePercent - safestRoute.riskExposurePercent)}%</strong>.
              </span>
            ) : (
              <span>The standard arterial route is well-lit and currently free from documented high-risk bottlenecks.</span>
            )}
          </div>
        </div>
      </div>

      {/* Sourced Incident Risk Zones & Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Risk Zones List */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            Documented Risk Zones ({riskZones.length})
          </h2>
          <div className="space-y-2.5">
            {riskZones.map(rz => (
              <div
                key={rz.id}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{rz.name}</span>
                  <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    {rz.category}
                  </span>
                </div>
                <p className="text-slate-600">{rz.description}</p>
                <div className="text-[10px] text-slate-400 font-mono pt-1">
                  Source: {rz.officialSource}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Emergency Contacts</span>
          </h2>
          <div className="space-y-2">
            {emergencyContacts.map(c => (
              <div
                key={c.number}
                className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-800 block">{c.title}</span>
                  <span className="text-[11px] text-slate-500">{c.desc}</span>
                </div>
                <a
                  href={`tel:${c.number.replace(/[^0-9]/g, '')}`}
                  className="font-bold text-sm text-blue-600 hover:underline font-mono"
                >
                  {c.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
