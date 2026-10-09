import React from 'react';
import { IndiaFlagLogo } from './IndiaFlagLogo';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12 py-8 px-4 sm:px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand with Indian Flag Logo */}
        <div className="flex items-center gap-2.5">
          <IndiaFlagLogo className="w-6 h-6 rounded-md shadow-2xs" />
          <span className="font-bold text-sm text-slate-900">City Life</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">Stop Surviving the City. Start Living It.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 flex-wrap text-slate-600 font-medium">
          <button onClick={() => onNavClick('explore')} className="hover:text-blue-600">
            Explore
          </button>
          <button onClick={() => onNavClick('forts')} className="hover:text-blue-600 font-semibold text-amber-700">
            Forts & Heritage
          </button>
          <button onClick={() => onNavClick('gems')} className="hover:text-blue-600">
            Hidden Gems
          </button>
          <button onClick={() => onNavClick('history')} className="hover:text-blue-600">
            History
          </button>
          <button onClick={() => onNavClick('safety')} className="hover:text-blue-600">
            Safety
          </button>
          <button onClick={() => onNavClick('compare')} className="hover:text-blue-600">
            Compare
          </button>
          <button onClick={() => onNavClick('planner')} className="hover:text-blue-600">
            Trip Planner
          </button>
        </div>

        {/* Attribution & Copyright */}
        <div className="text-[11px] text-slate-400 text-center md:text-right">
          © {new Date().getFullYear()} City Life India. Archaeological Survey of India (ASI) & OpenStreetMap data.
        </div>
      </div>
    </footer>
  );
};
