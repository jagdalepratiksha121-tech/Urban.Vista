import React, { useState } from 'react';
import { Landmark, Utensils, Coffee, Trees, Compass, Hotel, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { Category } from '../data/cityData';

interface PlaceImageProps {
  src: string;
  alt: string;
  category?: Category | string;
  className?: string;
  aspectClassName?: string;
}

export const PlaceImage: React.FC<PlaceImageProps> = ({
  src,
  alt,
  category,
  className = 'w-full h-full object-cover',
  aspectClassName = ''
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryIcon = () => {
    switch (category) {
      case 'heritage':
      case 'forts':
        return <Landmark className="w-8 h-8 text-amber-700" />;
      case 'food':
        return <Utensils className="w-8 h-8 text-rose-600" />;
      case 'cafe':
        return <Coffee className="w-8 h-8 text-orange-600" />;
      case 'nature':
        return <Trees className="w-8 h-8 text-emerald-600" />;
      case 'hotel':
        return <Hotel className="w-8 h-8 text-blue-600" />;
      case 'shopping':
        return <ShoppingBag className="w-8 h-8 text-purple-600" />;
      case 'gem':
        return <Sparkles className="w-8 h-8 text-teal-600" />;
      default:
        return <Compass className="w-8 h-8 text-blue-600" />;
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'heritage':
      case 'forts':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'food':
      case 'cafe':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'nature':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'gem':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'hotel':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full bg-slate-100 flex flex-col items-center justify-center p-4 text-center select-none ${aspectClassName}`}
        role="img"
        aria-label={`${alt} illustration`}
      >
        <div className="w-14 h-14 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-2">
          {getCategoryIcon()}
        </div>
        <p className="font-semibold text-xs text-slate-800 line-clamp-1 max-w-[90%]">
          {alt}
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor()}`}>
            Verified Pune Location
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-100 ${aspectClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center text-slate-300">
          <MapPin className="w-6 h-6 animate-bounce" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
