import React, { useState, useMemo } from 'react';
import { Place, ROAD_JUNCTIONS } from '../data/cityData';
import { Calendar, Clock, MapPin, Bookmark, Check } from 'lucide-react';

interface TripPlannerViewProps {
  places: Place[];
  onOpenDetailModal: (place: Place) => void;
  onSaveItinerary: (it: { title: string; placesCount: number; totalCost: number }) => void;
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  places,
  onOpenDetailModal,
  onSaveItinerary
}) => {
  const [startArea, setStartArea] = useState('Shivajinagar Junction');
  const [durationHours, setDurationHours] = useState<number>(4);
  const [budgetLimit, setBudgetLimit] = useState<number>(800);
  const [interest, setInterest] = useState<'All' | 'Heritage' | 'Food' | 'Nature'>('All');
  const [wheelchairOnly, setWheelchairOnly] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Practical Itinerary synthesis
  const itinerary = useMemo(() => {
    let remainingBudget = budgetLimit;
    const selectedIds = new Set<string>();
    const plan = [];

    const slotsCount = durationHours <= 3 ? 2 : durationHours <= 5 ? 3 : 4;
    const slotTimes = [
      { time: '09:00 AM – 11:00 AM', label: 'Morning Stop' },
      { time: '11:30 AM – 01:30 PM', label: 'Midday Stop' },
      { time: '02:30 PM – 04:30 PM', label: 'Afternoon Stop' },
      { time: '05:30 PM – 07:30 PM', label: 'Evening Stop' }
    ];

    for (let i = 0; i < slotsCount; i++) {
      const candidates = places.filter(p => {
        if (selectedIds.has(p.id)) return false;
        if (p.cost > remainingBudget && remainingBudget > 0 && p.cost > remainingBudget * 1.3) return false;
        if (wheelchairOnly && !p.wheelchairAccessible) return false;
        return true;
      });

      const scored = candidates.map(p => {
        let score = (p.rating ?? 4.5) * 2;
        if (interest === 'Heritage' && p.category === 'heritage') score += 5;
        if (interest === 'Food' && (p.category === 'food' || p.category === 'cafe' || p.category === 'budget')) score += 5;
        if (interest === 'Nature' && p.category === 'nature') score += 5;
        return { place: p, score };
      });

      scored.sort((a, b) => b.score - a.score);

      const pick = scored[0]?.place || places.find(p => !selectedIds.has(p.id)) || places[0];
      selectedIds.add(pick.id);
      remainingBudget = Math.max(0, remainingBudget - pick.cost);

      plan.push({
        slot: slotTimes[i] || { time: 'Flexible', label: `Stop ${i + 1}` },
        place: pick
      });
    }

    const totalCost = plan.reduce((sum, item) => sum + item.place.cost, 0);
    return { plan, totalCost, remainingBudget: Math.max(0, budgetLimit - totalCost) };
  }, [places, durationHours, budgetLimit, interest, wheelchairOnly]);

  const handleSave = () => {
    onSaveItinerary({
      title: `${interest} Tour in Pune (${durationHours}h)`,
      placesCount: itinerary.plan.length,
      totalCost: itinerary.totalCost
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Itinerary Builder</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Trip Planner
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Set your budget, available time, and preferences to build a practical step-by-step city exploration plan.
          </p>
        </div>
      </div>

      {/* Input Parameters Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900">1. Trip Preferences</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Starting Location */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Starting Area</label>
            <select
              value={startArea}
              onChange={e => setStartArea(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 outline-none"
            >
              {ROAD_JUNCTIONS.map(j => (
                <option key={j.id} value={j.name}>{j.name}</option>
              ))}
            </select>
          </div>

          {/* Time Available */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Available Time</label>
            <select
              value={durationHours}
              onChange={e => setDurationHours(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 outline-none"
            >
              <option value={2}>2 Hours (Quick Highlights)</option>
              <option value={4}>4 Hours (Half-Day)</option>
              <option value={6}>6 Hours (Extended)</option>
              <option value={8}>8 Hours (Full Day)</option>
            </select>
          </div>

          {/* Budget Limit */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Budget Limit</label>
              <span className="font-bold text-blue-600 font-mono">₹{budgetLimit}</span>
            </div>
            <input
              type="range"
              min={100}
              max={3000}
              step={100}
              value={budgetLimit}
              onChange={e => setBudgetLimit(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Interest */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Primary Interest</label>
            <select
              value={interest}
              onChange={e => setInterest(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 outline-none"
            >
              <option value="All">All-Rounder Mix</option>
              <option value="Heritage">History & Heritage</option>
              <option value="Food">Food & Street Flavors</option>
              <option value="Nature">Parks & Hill Sunsets</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={wheelchairOnly}
              onChange={e => setWheelchairOnly(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Only recommend wheelchair / step-free accessible spots</span>
          </label>
        </div>
      </div>

      {/* Generated Itinerary Plan */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">2. Suggested Schedule</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Estimated total spend: <strong>₹{itinerary.totalCost}</strong> • Remaining budget: <strong>₹{itinerary.remainingBudget}</strong>
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved!' : 'Save Itinerary'}</span>
          </button>
        </div>

        <div className="space-y-3">
          {itinerary.plan.map((item, idx) => (
            <div
              key={`stop-${item.place.id}-${idx}`}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {item.slot.time} • {item.slot.label}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                    {item.place.name}
                  </h3>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    {item.place.neighborhood} • ★ {item.place.rating} • {item.place.cost === 0 ? 'Free' : `₹${item.place.cost} approx`}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenDetailModal(item.place)}
                className="text-blue-600 hover:underline font-semibold self-end sm:self-auto text-xs"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
