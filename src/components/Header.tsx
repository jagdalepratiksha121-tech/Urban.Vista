import React, { useState } from 'react';
import {
  Search,
  Bookmark,
  MapPin,
  Menu,
  X,
  Sparkles,
  Navigation,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { IndiaFlagLogo } from './IndiaFlagLogo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  savedCount: number;
  openFavoritesModal: () => void;
  openAiCompanion: () => void;
  onSearchSubmit?: () => void;
  currentUser: { name: string; email: string } | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onLocateMe: () => void;
  isLocating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  savedCount,
  openFavoritesModal,
  openAiCompanion,
  onSearchSubmit,
  currentUser,
  onOpenAuth,
  onLogout,
  onLocateMe,
  isLocating = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore' },
    { id: 'map', label: 'Interactive Map 🗺️' },
    { id: 'forts', label: 'Forts & Heritage 🇮🇳' },
    { id: 'food', label: 'Food & Cafes' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'gems', label: 'Hidden Gems' },
    { id: 'history', label: 'History' },
    { id: 'safety', label: 'Safety & Routes' },
    { id: 'planner', label: 'Trip Planner' },
    { id: 'compare', label: 'Compare' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentTab !== 'explore' && currentTab !== 'forts' && currentTab !== 'map') {
        setCurrentTab('explore');
      }
      if (onSearchSubmit) onSearchSubmit();
    }
  };

  const locationOptions = [
    { value: 'Pune', label: 'Pune (All Places)' },
    { value: 'Forts & Heritage', label: 'Forts & Heritage 🇮🇳' },
    { value: 'Old City', label: 'Old City (Peths)' },
    { value: 'Deccan', label: 'Deccan & FC Road' },
    { value: 'Shivajinagar', label: 'Shivajinagar & JM Rd' },
    { value: 'Camp', label: 'Pune Camp' },
    { value: 'Koregaon Park', label: 'Koregaon Park' },
    { value: 'Kothrud', label: 'Kothrud' },
    { value: 'Kalyani Nagar', label: 'Kalyani Nagar' },
    { value: 'Swargate', label: 'Swargate' },
    { value: 'Delhi', label: 'Delhi (Red Fort)' },
    { value: 'Agra', label: 'Agra (Agra Fort)' },
    { value: 'Rajasthan', label: 'Chittorgarh Fort' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Elegant Indian Tricolour Ribbon */}
      <div className="h-[3px] w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white border-y border-slate-200" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* 1. Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Redesigned Indian Flag Emblem + Brand */}
        <div
          onClick={() => setCurrentTab('explore')}
          className="flex items-center gap-3 cursor-pointer shrink-0 select-none group"
          title="City Life India — Home"
        >
          {/* Authentic Circular Indian Flag Emblem */}
          <IndiaFlagLogo
            className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform duration-200"
            variant="emblem"
          />

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight block leading-none">
                City Life
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FF9933]/15 text-[#b45309] border border-[#FF9933]/40">
                INDIA 🇮🇳
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Explore your city.
            </span>
          </div>
        </div>

        {/* Center: Search Bar (Desktop / Tablet) */}
        <div className="flex-1 max-w-lg mx-2 hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search forts (Sinhagad, Rajgad, Red Fort), food, heritage..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-8 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-900 border border-slate-200 focus:border-blue-600 rounded-lg outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-0.5"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions, Location Selector, Geolocation, Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Location / Region Dropdown */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <select
              value={selectedCity}
              onChange={e => {
                setSelectedCity(e.target.value);
                if (currentTab !== 'explore' && currentTab !== 'map') {
                  setCurrentTab('explore');
                }
              }}
              className="bg-transparent text-slate-800 text-xs font-semibold cursor-pointer outline-none max-w-[120px] sm:max-w-[150px] truncate"
              title="Select city / region to center map"
            >
              {locationOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Real Geolocation Button ("Locate") */}
          <button
            type="button"
            onClick={onLocateMe}
            disabled={isLocating}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              isLocating
                ? 'bg-blue-50 text-blue-600 border-blue-200 animate-pulse'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Detect GPS or current city location"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-blue-600' : 'text-blue-600'}`} />
            <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'Locate Me'}</span>
          </button>

          {/* Saved Places Bookmark Button */}
          <button
            type="button"
            onClick={openFavoritesModal}
            className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 transition-colors"
            title="View saved places"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* LOG IN & SIGN UP / User Profile */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name[0]?.toUpperCase() || 'U'}
                </div>
                <span className="max-w-[70px] sm:max-w-[110px] truncate hidden sm:inline">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 block truncate">{currentUser.name}</span>
                    <span className="text-slate-500 text-[11px] block truncate">{currentUser.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      openFavoritesModal();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                    <span>Saved Places ({savedCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 font-medium flex items-center gap-2 border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 transition-colors"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-2xs"
              >
                Sign up
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Only shown on small screens) */}
      <div className="sm:hidden px-4 pb-2.5 pt-1 border-t border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search forts, food, attractions..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full pl-9 pr-7 py-1.5 bg-slate-50 text-xs text-slate-900 border border-slate-200 rounded-lg outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Navigation Bar (Desktop & Tablet) */}
      <div className="hidden md:block bg-slate-50/80 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;
              const isForts = link.id === 'forts';
              const isMap = link.id === 'map';
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`py-1 px-3 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-2xs border border-slate-200/80 font-bold'
                      : isForts
                      ? 'text-amber-800 hover:text-amber-900 hover:bg-amber-50/80 font-bold'
                      : isMap
                      ? 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {isForts && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />}
                  {isMap && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 3. Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-3 shadow-lg">
          <nav className="grid grid-cols-2 gap-1.5">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={`mobile-${link.id}`}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
