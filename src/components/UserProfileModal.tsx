import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Calendar,
  SlidersHorizontal,
  Trash2,
  ArrowRight,
  User,
  Shield
} from 'lucide-react';
import { Place } from '../data/cityData';
import { PlaceImage } from './PlaceImage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (id: string) => void;
  places: Place[];
  onSelectPlace: (id: string) => void;
  savedItineraries: Array<{
    id: string;
    title: string;
    placesCount: number;
    totalCost: number;
    createdAt: string;
  }>;
  currentUser?: { name: string; email: string } | null;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  places,
  onSelectPlace,
  savedItineraries,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'itineraries' | 'account'>('favorites');

  if (!isOpen) return null;

  const favoritePlaces = favorites
    .map(id => places.find(p => p.id === id))
    .filter((p): p is Place => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full max-h-[85vh] shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {currentUser?.name[0]?.toUpperCase() || <Bookmark className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {currentUser?.name || 'Saved Places & Trips'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {currentUser?.email || 'Your personal bookmarks and saved city outings'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
            title="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-slate-200 px-4 pt-2 gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'favorites'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Saved Places ({favoritePlaces.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('itineraries')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'itineraries'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Saved Trips ({savedItineraries.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'account'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Account Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 flex-1 overflow-y-auto text-xs">
          {activeTab === 'favorites' && (
            <div className="space-y-2.5">
              {favoritePlaces.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-1">
                  <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-700">No saved places yet</p>
                  <p className="text-[11px]">Click the bookmark icon on any place card to save it for your next trip.</p>
                </div>
              ) : (
                favoritePlaces.map(place => (
                  <div
                    key={place.id}
                    className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 bg-white shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-slate-100 shrink-0">
                        <PlaceImage
                          src={place.imageUrl}
                          alt={place.name}
                          category={place.category}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">
                          {place.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {place.neighborhood} • {place.cost === 0 ? 'Free Entry' : `₹${place.cost}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectPlace(place.id);
                          onClose();
                        }}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600"
                        title="View Place Details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFavorite(place.id)}
                        className="p-1.5 rounded-md hover:bg-rose-50 text-rose-500"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'itineraries' && (
            <div className="space-y-2.5">
              {savedItineraries.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-1">
                  <Calendar className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-700">No saved itineraries</p>
                  <p className="text-[11px]">Build a customized outing using the Trip Planner tab.</p>
                </div>
              ) : (
                savedItineraries.map(it => (
                  <div
                    key={it.id}
                    className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{it.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {it.placesCount} stops • Approx ₹{it.totalCost} • {it.createdAt}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      Saved
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-3 p-1">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Account Info</span>
                <p className="font-bold text-slate-900 text-sm">{currentUser?.name || 'Local Guest User'}</p>
                <p className="text-slate-600 text-xs">{currentUser?.email || 'guest@citylife.pune'}</p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-2 text-slate-600">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified City Life Member</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
