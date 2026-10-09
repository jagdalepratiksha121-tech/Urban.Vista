import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Bookmark,
  Scale,
  Navigation,
  CheckCircle2,
  Train,
  ShieldCheck,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Place } from '../data/cityData';
import { PlaceImage } from './PlaceImage';
import { IndiaFlagLogo } from './IndiaFlagLogo';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isInCompare: boolean;
  onAddToCompare: (id: string) => void;
  onViewOnMap?: (place: Place) => void;
  onRouteHere?: (place: Place) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInCompare,
  onAddToCompare,
  onViewOnMap,
  onRouteHere
}) => {
  const [showGoogleMapEmbed, setShowGoogleMapEmbed] = useState(false);

  if (!place) return null;

  const isFort = place.isFort || place.category === 'forts';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', ' + place.postalLocality)}`;
  const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  const googleEmbedUrl = `https://maps.google.com/maps?q=${place.lat},${place.lng}&t=m&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-sm"
          title="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image Container */}
        <div className="relative aspect-[16/9] w-full bg-slate-200">
          <PlaceImage
            src={place.imageUrl}
            alt={place.name}
            category={place.category}
            className="w-full h-full object-cover"
          />

          {/* Badges Overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 flex-wrap">
            {isFort && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FF9933] text-white font-bold text-xs shadow-md">
                <IndiaFlagLogo className="w-3.5 h-3.5 rounded-xs" />
                <span>Historic Indian Fort</span>
              </div>
            )}
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/95 text-slate-900 shadow-xs border border-slate-100">
              {place.category === 'gem' ? 'Hidden Gem' : place.category === 'forts' ? 'Fortress' : place.category}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white shadow-xs font-mono">
              {place.cost === 0 ? 'Free Entry' : `₹${place.cost}`}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{place.neighborhood}</span>
              <span>•</span>
              <span className="text-slate-600 font-medium">{place.postalLocality}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {place.name}
            </h2>
            <p className="text-slate-600 mt-1 leading-relaxed text-sm">
              {place.tagline}
            </p>
          </div>

          {/* Official Verification Banner */}
          <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 flex items-start gap-2.5 text-blue-950">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-xs">{place.officialStatus}</span>
              <span className="text-[11px] text-blue-800">{place.verifiedCostDescription}</span>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              About This Location
            </h3>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px]">
              {place.story}
            </p>
          </div>

          {/* Historical Summary & Source Attribution */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Historical Context & Authority</span>
            </h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {place.historySummary}
            </p>
            <div className="text-[10px] text-slate-500 font-medium pt-1.5 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <span>Official Source: <strong>{place.sourceAttribution}</strong></span>
              <span className="font-mono text-slate-400">{place.lat.toFixed(4)}° N, {place.lng.toFixed(4)}° E</span>
            </div>
          </div>

          {/* Practical Details: Timings, Transit, Accessibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800 block text-xs">Visiting Hours</span>
                <span className="text-slate-600 text-[11px]">{place.visitingHours}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2">
              <Train className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-slate-800 block text-xs">Public Transit</span>
                <span className="text-slate-600 text-[11px]">{place.nearestTransit}</span>
              </div>
            </div>
          </div>

          {/* Accessibility status */}
          <div className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-start gap-2">
            <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${place.wheelchairAccessible ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div>
              <span className="font-semibold text-slate-800 text-xs">
                Accessibility: {place.wheelchairAccessible ? 'Wheelchair / Step-Free' : 'Stepped / Mountain Terrain'}
              </span>
              <span className="text-slate-500 text-[11px] block mt-0.5">
                {place.accessibilityNotes}
              </span>
            </div>
          </div>

          {/* Real Google Map Live Preview Toggle */}
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <div className="px-3 py-2 flex items-center justify-between bg-white border-b border-slate-200">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 text-xs">
                <span>🌐 Real Google Map Location</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleMapEmbed(!showGoogleMapEmbed)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <span>{showGoogleMapEmbed ? 'Hide Google Map' : 'Show Google Map View'}</span>
              </button>
            </div>

            {showGoogleMapEmbed && (
              <div className="aspect-[16/9] w-full">
                <iframe
                  title={`Google Map - ${place.name}`}
                  src={googleEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-slate-200 flex-wrap">
            <button
              type="button"
              onClick={() => onToggleFavorite(place.id)}
              className={`py-2 px-3 rounded-lg font-semibold border flex items-center gap-1.5 transition-colors ${
                isFavorite
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              type="button"
              onClick={() => onAddToCompare(place.id)}
              className={`py-2 px-3 rounded-lg font-semibold border flex items-center gap-1.5 transition-colors ${
                isInCompare
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isInCompare ? 'In Compare' : 'Compare'}</span>
            </button>

            {onViewOnMap && (
              <button
                type="button"
                onClick={() => {
                  onViewOnMap(place);
                  onClose();
                }}
                className="py-2 px-3 rounded-lg font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Interactive Map</span>
              </button>
            )}

            {/* Direct Google Maps Navigation */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Google Maps ↗</span>
            </a>

            <a
              href={googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 ml-auto transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
