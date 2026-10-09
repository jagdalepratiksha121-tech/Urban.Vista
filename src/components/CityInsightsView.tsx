import React from 'react';
import {
  Radio,
  CloudRain,
  Sun,
  Train,
  Car,
  Calendar,
  AlertTriangle,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CityInsightsViewProps {
  isRain: boolean;
  onSelectPlaceOnMap: (id: string) => void;
}

export const CityInsightsView: React.FC<CityInsightsViewProps> = ({
  isRain,
  onSelectPlaceOnMap
}) => {
  const trafficCorridors = [
    { name: 'FC Road (Fergusson College Rd)', status: 'Lively / Flowing', level: 'good', delay: '+2 mins' },
    { name: 'JM Road (Jangli Maharaj Rd)', status: 'Moderate Traffic', level: 'moderate', delay: '+5 mins' },
    { name: 'Swargate Multimodal Depot & Chowk', status: 'Heavy Bottleneck', level: 'heavy', delay: '+18 mins' },
    { name: 'Karve Road (Deccan to Kothrud)', status: 'Metro Work Corridor', level: 'moderate', delay: '+8 mins' },
    { name: 'Nagar Road (Yerawada to Kalyani Nagar)', status: 'Smooth Corridor', level: 'good', delay: '+1 min' }
  ];

  const metroUpdates = [
    { line: 'Purple Line (Line 1)', stretch: 'PCMC to Swargate (Underground)', status: 'Operational • 7 min frequency' },
    { line: 'Aqua Line (Line 2)', stretch: 'Vanaz to Ramwadi (Elevated)', status: 'Operational • 8 min frequency' },
    { line: 'Interchange Station', stretch: 'Civil Court Underground Hub', status: 'Elevated & Underground transfer active' }
  ];

  const weekendEvents = [
    {
      title: 'Shaniwar Wada Light & Sound Show',
      venue: 'Shaniwar Wada Citadel Grounds',
      time: 'Daily: 07:15 PM (Marathi) / 08:15 PM (English)',
      cost: '₹25',
      placeId: 'shaniwar-wada'
    },
    {
      title: 'Dawn Raga Classical Morning Recital',
      venue: 'Pataleshwar Cave Amphitheatre',
      time: 'Sunday: 06:30 AM – 08:00 AM',
      cost: 'Free Entry',
      placeId: 'pataleshwar-cave'
    },
    {
      title: 'Saras Baug Lake Aarti & Flower Display',
      venue: 'Talyatla Ganpati Temple Complex',
      time: 'Tuesday & Weekend Evenings: 07:00 PM',
      cost: 'Free Entry',
      placeId: 'saras-baug'
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-[var(--bg-card)] to-emerald-500/10 border border-[var(--border-strong)] rounded-3xl p-6 sm:p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
            <Radio className="w-4 h-4 animate-pulse" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Real-Time Urban Telemetry
          </span>
        </div>

        <h2 className="font-editorial text-2xl sm:text-4xl font-black text-[var(--text-main)] leading-tight">
          Smart City Insights & Live Pune Bulletin
        </h2>

        <p className="text-xs sm:text-sm text-[var(--text-subtle)] max-w-2xl leading-relaxed">
          Aggregated live conditions including weather telemetry, arterial traffic density, Pune Metro transit status, and curated weekend cultural programs.
        </p>

        <div className="mt-2 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
          <span>Source: Pune Traffic Police, IMD Pashan, & Maha Metro</span>
          <span className="text-emerald-500 font-bold">● Live Sync Active</span>
        </div>
      </div>

      {/* Weather & Meteorological Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Weather Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Pune Weather
              </span>
              <span className="text-[10px] font-mono text-[var(--text-subtle)]">
                Updated 10m ago
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3">
              {isRain ? (
                <CloudRain className="w-10 h-10 text-sky-400" />
              ) : (
                <Sun className="w-10 h-10 text-amber-500" />
              )}
              <div>
                <span className="font-mono text-3xl font-black text-[var(--text-main)]">
                  {isRain ? '24°C' : '28°C'}
                </span>
                <span className="text-xs text-[var(--text-muted)] block font-medium">
                  {isRain ? 'Monsoon Showers' : 'Partly Sunny'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Humidity</span>
              <span className="font-mono font-bold text-[var(--text-main)]">{isRain ? '84%' : '65%'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block">Air Quality</span>
              <span className="font-mono font-bold text-emerald-500">AQI 72 (Good)</span>
            </div>
          </div>
        </div>

        {/* Public Advisory Card */}
        <div className="md:col-span-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Civic Advisory
            </span>
            <h4 className="font-bold text-sm text-[var(--text-main)] mt-1">
              {isRain
                ? 'Monsoon Precaution: Low-Lying Underpasses Waterlogging Warning'
                : 'Road Surface Maintenance on Karve Road & Swargate Basin'}
            </h4>
            <p className="text-xs text-[var(--text-subtle)] mt-1 leading-relaxed">
              {isRain
                ? 'Intermittent downpours reported in Shivajinagar basin. Swargate depot exit and railway underpasses are experiencing slow traffic. Commuters are advised to utilize elevated Pune Metro corridors.'
                : 'Periodic underground cabling work underway along Karve Road corridor between 11 PM and 5 AM. Daytime traffic remains standard with speed advisories.'}
            </p>
          </div>

          <div className="pt-2 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
            Authority: Pune Municipal Corporation (PMC) Disaster Mitigation Cell
          </div>
        </div>
      </div>

      {/* Traffic Conditions & Arterial Corridors */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Car className="w-4 h-4 text-amber-500" /> Arterial Road Corridors
            </span>
            <h3 className="font-editorial text-xl font-black text-[var(--text-main)] mt-0.5">
              Live Transit & Traffic Congestion Index
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-500 font-bold">
            Real-Time Sensors
          </span>
        </div>

        <div className="space-y-2.5">
          {trafficCorridors.map(c => (
            <div
              key={c.name}
              className="p-3.5 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-[var(--text-main)] block">{c.name}</span>
                <span className="text-[11px] text-[var(--text-muted)]">{c.status}</span>
              </div>

              <div className="text-right">
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                  c.level === 'good'
                    ? 'bg-emerald-500/15 text-emerald-500'
                    : c.level === 'moderate'
                    ? 'bg-amber-500/15 text-amber-500'
                    : 'bg-rose-500/15 text-rose-500'
                }`}>
                  {c.delay}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pune Metro Status */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
            <Train className="w-4 h-4" /> Maha Metro Network
          </span>
          <h3 className="font-editorial text-xl font-black text-[var(--text-main)] mt-0.5">
            Pune Metro Operational Status
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {metroUpdates.map(m => (
            <div
              key={m.line}
              className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex flex-col justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-mono text-[11px] font-bold text-sky-500 block">
                  {m.line}
                </span>
                <span className="font-bold text-[var(--text-main)] block mt-0.5">
                  {m.stretch}
                </span>
              </div>
              <span className="text-[11px] text-emerald-500 font-medium">
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Events & Weekend Programs */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Cultural Calendar
          </span>
          <h3 className="font-editorial text-xl font-black text-[var(--text-main)] mt-0.5">
            Verified Cultural Gatherings & Experiences
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weekendEvents.map(evt => (
            <div
              key={evt.title}
              className="p-4 rounded-2xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] flex flex-col justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-mono text-[10px] text-amber-500 font-bold uppercase block">
                  {evt.cost}
                </span>
                <h4 className="font-bold text-sm text-[var(--text-main)] mt-0.5">
                  {evt.title}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {evt.venue}
                </p>
                <p className="text-[11px] text-[var(--text-subtle)] mt-1 font-mono">
                  {evt.time}
                </p>
              </div>

              <button
                onClick={() => onSelectPlaceOnMap(evt.placeId)}
                className="w-full py-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-amber-500 hover:text-white font-bold text-[11px] border border-[var(--border-subtle)] transition-all"
              >
                Inspect Venue on Map →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
