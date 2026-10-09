import React, { useState, useMemo } from 'react';
import { Place } from '../data/cityData';
import { Scale, Check, Plus, X, MapPin, CheckCircle2 } from 'lucide-react';
import { PlaceImage } from './PlaceImage';

interface CompareViewProps {
  places: Place[];
  compareIds: string[];
  setCompareIds: (ids: string[]) => void;
  onOpenDetailModal: (place: Place) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  places,
  compareIds,
  setCompareIds,
  onOpenDetailModal
}) => {
  const [priority, setPriority] = useState<'cost' | 'accessibility'>('cost');

  const comparedPlaces = useMemo(() => {
    return compareIds
      .map(id => places.find(p => p.id === id))
      .filter((p): p is Place => Boolean(p));
  }, [compareIds, places]);

  const removePlace = (id: string) => {
    setCompareIds(compareIds.filter(i => i !== id));
  };

  const addPlace = (id: string) => {
    if (compareIds.length >= 4) return;
    if (!compareIds.includes(id)) {
      setCompareIds([...compareIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Comparison</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Compare Verified Places
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Evaluate official admission pricing, accessibility accommodations, visiting hours, and public transit connectivity.
          </p>
        </div>
      </div>

      {/* Place Selection Chips */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-medium">Add to compare:</span>
          {places.slice(0, 8).map(p => {
            const isAdded = compareIds.includes(p.id);
            return (
              <button
                key={`add-${p.id}`}
                type="button"
                onClick={() => isAdded ? removePlace(p.id) : addPlace(p.id)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                  isAdded
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {p.name.split(' ')[0]} {isAdded ? '✓' : '+'}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          {comparedPlaces.length} of 4 places selected
        </span>
      </div>

      {/* Comparison Table */}
      {comparedPlaces.length < 2 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-xl p-6 text-xs text-slate-500 space-y-2">
          <Scale className="w-8 h-8 mx-auto text-slate-300" />
          <h3 className="font-bold text-sm text-slate-900">Select at least 2 places to compare</h3>
          <p className="max-w-md mx-auto">
            Choose locations from the quick chips above or place cards to see an objective side-by-side comparison.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-semibold text-slate-500 w-36">Field</th>
                  {comparedPlaces.map(p => (
                    <th key={`head-${p.id}`} className="py-3 px-4 font-bold text-slate-900 min-w-[220px]">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{p.name}</span>
                        <button
                          type="button"
                          onClick={() => removePlace(p.id)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Photo Preview */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Preview</td>
                  {comparedPlaces.map(p => (
                    <td key={`img-${p.id}`} className="py-3 px-4">
                      <div className="w-full h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                        <PlaceImage
                          src={p.imageUrl}
                          alt={p.name}
                          category={p.category}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Verified Pricing */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Verified Fee</td>
                  {comparedPlaces.map(p => (
                    <td key={`cost-${p.id}`} className="py-3 px-4">
                      <span className="font-bold text-blue-600 block">
                        {p.cost === 0 ? 'Free Entry' : `₹${p.cost}`}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {p.verifiedCostDescription}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Official Status */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Official Status</td>
                  {comparedPlaces.map(p => (
                    <td key={`status-${p.id}`} className="py-3 px-4 text-slate-800 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{p.officialStatus}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Location & Neighborhood */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Location</td>
                  {comparedPlaces.map(p => (
                    <td key={`loc-${p.id}`} className="py-3 px-4 text-slate-700">
                      <div>
                        <strong>{p.neighborhood}</strong>
                        <span className="text-[11px] text-slate-500 block">{p.postalLocality}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Visiting Hours */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Hours</td>
                  {comparedPlaces.map(p => (
                    <td key={`hours-${p.id}`} className="py-3 px-4 text-slate-700 text-[11px]">
                      {p.visitingHours}
                    </td>
                  ))}
                </tr>

                {/* Accessibility */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Accessibility</td>
                  {comparedPlaces.map(p => (
                    <td key={`acc-${p.id}`} className="py-3 px-4">
                      {p.wheelchairAccessible ? (
                        <span className="text-emerald-700 font-semibold block">Step-Free / Ramp ✓</span>
                      ) : (
                        <span className="text-slate-500 font-medium block">Stepped / Historical</span>
                      )}
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {p.accessibilityNotes}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Transit Access */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Transit Access</td>
                  {comparedPlaces.map(p => (
                    <td key={`transit-${p.id}`} className="py-3 px-4 text-slate-600 text-[11px]">
                      {p.nearestTransit}
                    </td>
                  ))}
                </tr>

                {/* Authority Source */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Authority Source</td>
                  {comparedPlaces.map(p => (
                    <td key={`source-${p.id}`} className="py-3 px-4 text-slate-500 text-[10px]">
                      {p.sourceAttribution}
                    </td>
                  ))}
                </tr>

                {/* Action */}
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-500">Action</td>
                  {comparedPlaces.map(p => (
                    <td key={`action-${p.id}`} className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => onOpenDetailModal(p)}
                        className="py-1.5 px-3 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs"
                      >
                        View Details
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
