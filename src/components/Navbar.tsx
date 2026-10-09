import React from 'react';
import {
  Compass,
  Moon,
  Sun,
  CloudRain,
  SunMedium,
  Sparkles,
  Bookmark,
  MapPin,
  Route,
  Scale,
  ShieldAlert,
  CalendarDays,
  Gem,
  Landmark,
  Radio,
  FileText,
  SlidersHorizontal,
  Home
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  isNight: boolean;
  setIsNight: (n: boolean | ((prev: boolean) => boolean)) => void;
  isRain: boolean;
  setIsRain: (r: boolean | ((prev: boolean) => boolean)) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  savedFavoritesCount: number;
  openFavoritesModal: () => void;
  openAiCompanion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  theme,
  setTheme,
  isNight,
  setIsNight,
  isRain,
  setIsRain,
  selectedCity,
  setSelectedCity,
  savedFavoritesCount,
  openFavoritesModal,
  openAiCompanion
}) => {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'gems', label: 'Hidden Gems', icon: Gem },
    { id: 'history', label: 'History & Culture', icon: Landmark },
    { id: 'safety', label: 'City Safety', icon: ShieldAlert },
    { id: 'compare', label: 'Compare', icon: Scale },
    { id: 'insights', label: 'City Insights', icon: Radio },
    { id: 'reports', label: 'Community Reports', icon: FileText },
    { id: 'planner', label: 'Trip Planner', icon: CalendarDays }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] px-3 sm:px-6 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & City Selector */}
        <div className="w-full md:w-auto flex items-center justify-between gap-4">
          <div
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-xl font-bold tracking-tight text-[var(--text-main)]">
                  City Life
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                  Urban Guide
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-medium -mt-0.5 tracking-tight">
                Stop Surviving the City. Start Living It.
              </p>
            </div>
          </div>

          {/* City District Dropdown */}
          <div className="flex items-center gap-1.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-lg px-2 py-1 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-transparent text-[var(--text-main)] text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="Pune (All Metro)">Pune (All Metro)</option>
              <option value="Old City Peths">Old City (Peths)</option>
              <option value="Deccan / FC Road">Deccan / FC Road</option>
              <option value="Camp & East St">Pune Camp & Cantonment</option>
              <option value="Koregaon Park">Koregaon Park</option>
              <option value="Kothrud & Hills">Kothrud & Vetal Hills</option>
              <option value="Kalyani Nagar / Yerawada">Kalyani Nagar & Yerawada</option>
            </select>
          </div>
        </div>

        {/* Action Controls & AI Companion Button */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          
          {/* AI City Companion Trigger */}
          <button
            onClick={openAiCompanion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-sm transition-all shrink-0 hover:shadow-md"
            title="Ask City Companion AI"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Ask City Companion</span>
          </button>

          {/* Day / Night Toggle */}
          <button
            onClick={() => setIsNight(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 ${
              isNight
                ? 'bg-indigo-950/40 text-indigo-300 border-indigo-700/50 shadow-inner'
                : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
            }`}
            title="Toggle Day/Night: Night highlights well-lit corridors and updates risk assessments"
          >
            {isNight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Night</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Day</span>
              </>
            )}
          </button>

          {/* Weather Alert Demo Toggle */}
          <button
            onClick={() => setIsRain(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all shrink-0 ${
              isRain
                ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/50 animate-pulse'
                : 'bg-[var(--bg-card-subtle)] text-[var(--text-muted)] border-[var(--border-subtle)]'
            }`}
            title="Toggle Weather Telemetry: Simulates Monsoon Waterlogging Alert"
          >
            {isRain ? (
              <>
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Rain Alert</span>
              </>
            ) : (
              <>
                <SunMedium className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Clear</span>
              </>
            )}
          </button>

          {/* Favorites / Profile */}
          <button
            onClick={openFavoritesModal}
            className="p-2 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-amber-500 border border-[var(--border-subtle)] transition-colors relative shrink-0"
            title="Saved Places & Custom Itineraries"
          >
            <Bookmark className="w-3.5 h-3.5" />
            {savedFavoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {savedFavoritesCount}
              </span>
            )}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-[var(--bg-card-subtle)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)] transition-colors shrink-0"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar Links */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 overflow-x-auto no-scrollbar">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-subtle)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Monsoon Alert Banner */}
      {isRain && (
        <div className="mt-2 max-w-7xl mx-auto bg-sky-500/15 border border-sky-500/30 text-sky-900 dark:text-sky-200 px-3.5 py-1.5 rounded-lg text-xs flex items-center justify-between gap-2 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              <strong>Monsoon Waterlogging Alert Active:</strong> Moderate rain in Shivajinagar and Swargate basins. Covered cultural sanctuaries, Irani cafes, and indoor heritage sites are prioritized.
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-sky-500/20 px-2 py-0.5 rounded text-sky-700 dark:text-sky-300 font-bold shrink-0">
            IMD Pune Radar
          </span>
        </div>
      )}
    </header>
  );
};
