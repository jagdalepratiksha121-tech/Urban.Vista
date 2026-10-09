import React from 'react';
import { Place } from '../data/cityData';
import { PlaceCard } from './PlaceCard';
import { Sparkles, Info, CheckCircle2 } from 'lucide-react';

interface HiddenGemsViewProps {
  gems: Place[];
  onOpenDetailModal: (place: Place) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewOnMap: (place: Place) => void;
}

export const HiddenGemsView: React.FC<HiddenGemsViewProps> = ({
  gems,
  onOpenDetailModal,
  favorites,
  onToggleFavorite,
  onViewOnMap
}) => {
  return (
    <div className="space-y-6">
      {/* Introduction Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Local Discoveries</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hidden Gems in Pune
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Discover lesser-known spots, quiet corners, and authentic local favorites beyond the usual tourist attractions.
          </p>
        </div>

        {/* Verification transparency banner */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start sm:items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Data Transparency:</strong> All recommendations are cross-checked against municipal heritage records or long-standing local community feedback.
          </span>
        </div>
      </div>

      {/* Gems Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {gems.map(gem => (
          <PlaceCard
            key={gem.id}
            place={gem}
            isFavorite={favorites.includes(gem.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectPlace={onOpenDetailModal}
            onViewOnMap={onViewOnMap}
          />
        ))}
      </div>
    </div>
  );
};
