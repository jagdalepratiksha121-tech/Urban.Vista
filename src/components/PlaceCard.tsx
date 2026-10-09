import React from 'react';
import { Bookmark, MapPin, ArrowUpRight, Navigation, CheckCircle2 } from 'lucide-react';
import { Place } from '../data/cityData';
import { PlaceImage } from './PlaceImage';

interface PlaceCardProps {
  place: Place;
  isSelected?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onViewOnMap?: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSelected = false,
  isFavorite,
  onToggleFavorite,
  onSelectPlace,
  onViewOnMap
}) => {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  return (
    <div
      onClick={() => onSelectPlace(place)}
      className={`group cursor-pointer rounded-xl bg-white border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-100 shadow-md'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div>
        {/* Photo Container with Verified Placeholder Fallback */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <PlaceImage
            src={place.imageUrl}
            alt={place.name}
            category={place.category}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Chip */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            {place.isFort || place.category === 'forts' ? (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#FF9933] text-white shadow-xs border border-amber-600/30 flex items-center gap-1">
                <span>🇮🇳</span>
                <span>Fort</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs border border-slate-200/80">
                {place.category === 'gem' ? 'Hidden Gem' : place.category}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onToggleFavorite(place.id);
            }}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
              isFavorite
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 hover:bg-white text-slate-700'
            }`}
            title={isFavorite ? 'Saved in favorites' : 'Save place'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-3.5">
          {/* Price & Official Status */}
          <div className="flex items-center justify-between text-xs mb-1 gap-2">
            <span className="font-bold text-blue-600 truncate">
              {place.cost === 0 ? 'Free entry' : `₹${place.cost}`}
            </span>
            <span className="text-[10px] text-slate-500 font-medium truncate flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{place.officialStatus.split(' ')[0]}</span>
            </span>
          </div>

          {/* Place Name */}
          <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
            {place.name}
          </h3>

          {/* Neighborhood & Locality */}
          <div className="text-xs text-slate-500 flex items-center gap-1 mt-1 line-clamp-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{place.neighborhood}</span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {place.tagline}
          </p>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-3.5 py-2.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-3">
          {onViewOnMap && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onViewOnMap(place);
              }}
              className="text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1"
              title="Show on Leaflet Map"
            >
              <MapPin className="w-3 h-3" />
              <span>Map</span>
            </button>
          )}

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-slate-600 hover:text-blue-600 font-semibold flex items-center gap-1"
            title="Open GPS turn-by-turn directions"
          >
            <Navigation className="w-3 h-3" />
            <span>Route</span>
          </a>
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onSelectPlace(place);
          }}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 ml-auto"
        >
          <span>Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
