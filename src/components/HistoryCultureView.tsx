import React, { useState } from 'react';
import { Place, HISTORICAL_TIMELINE } from '../data/cityData';
import { PlaceCard } from './PlaceCard';
import { Landmark, CheckCircle2, Shield, Compass } from 'lucide-react';
import { IndiaFlagLogo } from './IndiaFlagLogo';

interface HistoryCultureViewProps {
  heritagePlaces: Place[];
  onOpenDetailModal: (place: Place) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewOnMap: (place: Place) => void;
}

export const HistoryCultureView: React.FC<HistoryCultureViewProps> = ({
  heritagePlaces,
  onOpenDetailModal,
  favorites,
  onToggleFavorite,
  onViewOnMap
}) => {
  const [filterType, setFilterType] = useState<'all' | 'forts' | 'palaces'>('all');

  const displayedPlaces = heritagePlaces.filter(p => {
    if (filterType === 'forts') return p.isFort || p.category === 'forts';
    if (filterType === 'palaces') return !p.isFort && p.category !== 'forts';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-1.5">
            <IndiaFlagLogo className="w-5 h-5 rounded-xs" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
              Indian Heritage & Forts
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Historic Forts, Citadels & Living Culture
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Explore India's defensive hill bastions, Maratha capitals, rock-cut ancient caves, and monumental UNESCO World Heritage landmarks.
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Sourced from the Archaeological Survey of India (ASI) & UNESCO World Heritage Centre.</span>
        </div>
      </div>

      {/* Historical Chronology Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="w-4 h-4 text-amber-700" />
          <h2 className="text-base font-bold text-slate-900">
            Chronology of Maratha & Indian Heritage
          </h2>
        </div>

        <div className="relative border-l border-slate-200 ml-3 space-y-5">
          {HISTORICAL_TIMELINE.map((item, idx) => (
            <div key={`hist-${idx}`} className="relative pl-6">
              {/* Bullet */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white" />

              <div>
                <span className="text-xs font-bold text-blue-600 font-mono">
                  {item.year}
                </span>
                <h3 className="text-sm font-semibold text-slate-900 mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-Filters for Heritage Places */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Heritage ({heritagePlaces.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('forts')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterType === 'forts'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Forts ({heritagePlaces.filter(p => p.isFort || p.category === 'forts').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('palaces')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filterType === 'palaces'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monuments & Temples ({heritagePlaces.filter(p => !p.isFort && p.category !== 'forts').length})
          </button>
        </div>

        <span className="text-xs text-slate-500">
          Showing <strong>{displayedPlaces.length}</strong> verified locations
        </span>
      </div>

      {/* Heritage Places Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedPlaces.map(place => (
          <PlaceCard
            key={place.id}
            place={place}
            isFavorite={favorites.includes(place.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectPlace={onOpenDetailModal}
            onViewOnMap={onViewOnMap}
          />
        ))}
      </div>
    </div>
  );
};
