import React from 'react';
import {
  Compass,
  Gem,
  ArrowRight,
  ShieldCheck,
  CloudRain,
  Sun,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Users,
  Navigation,
  CheckCircle2,
  Bookmark,
  Scale
} from 'lucide-react';
import { Place } from '../data/cityData';

interface LandingViewProps {
  onExploreClick: () => void;
  onGemsClick: () => void;
  onPlaceClick: (id: string) => void;
  featuredPlaces: Place[];
  hiddenGems: Place[];
  weatherAlertActive: boolean;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onExploreClick,
  onGemsClick,
  onPlaceClick,
  featuredPlaces,
  hiddenGems,
  weatherAlertActive
}) => {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-12 animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-card-subtle)] border border-[var(--border-strong)] p-6 sm:p-12 shadow-sm">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Urban Navigation • Pune Pilot</span>
          </div>

          {/* Big Editorial Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl font-black text-[var(--text-main)] tracking-tight leading-[1.15]">
            Your City Has More Stories Than You Know.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-xl text-[var(--text-subtle)] max-w-2xl font-normal leading-relaxed">
            Discover hidden gems, local experiences, cultural treasures, affordable spots, and smarter ways to explore your city.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore My City</span>
            </button>

            <button
              onClick={onGemsClick}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-main)] border border-[var(--border-strong)] shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Gem className="w-4 h-4 text-cyan-500" />
              <span>Discover Hidden Gems</span>
            </button>
          </div>

          {/* Real Live Highlights Bar */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 mt-4 border-t border-[var(--border-subtle)]">
            <div className="text-center">
              <span className="font-mono text-2xl font-black text-amber-500 block">16+</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">Verified Landmarks</span>
            </div>

            <div className="text-center">
              <span className="font-mono text-2xl font-black text-emerald-500 block">100%</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">Real Incident Sourcing</span>
            </div>

            <div className="text-center">
              <span className="font-mono text-2xl font-black text-cyan-500 block">Dijkstra</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">Dual-Risk Routing</span>
            </div>

            <div className="text-center">
              <span className="font-mono text-2xl font-black text-indigo-500 block">Gemini 3.8</span>
              <span className="text-xs text-[var(--text-muted)] font-medium">AI City Companion</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING EXPERIENCES & CITY LIFE PHOTOGRAPHY */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Curated City Highlights
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-black text-[var(--text-main)] mt-0.5">
              Popular Destinations & Trending Experiences
            </h2>
          </div>
          <button
            onClick={onExploreClick}
            className="text-xs font-bold text-amber-500 hover:text-amber-600 flex items-center gap-1"
          >
            <span>View All 16 Spots on Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredPlaces.slice(0, 4).map(place => (
            <div
              key={place.id}
              onClick={() => onPlaceClick(place.id)}
              className="group cursor-pointer rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                    {place.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-amber-400 font-mono text-xs font-black">
                  {place.cost === 0 ? 'FREE' : `₹${place.cost}`}
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-main)] group-hover:text-amber-500 transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs text-[var(--text-subtle)] mt-1 line-clamp-2">
                    {place.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    {place.neighborhood}
                  </span>
                  <span className="font-mono font-bold text-emerald-500">
                    ★ {place.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED HIDDEN GEMS SPOTLIGHT */}
      <section className="bg-gradient-to-br from-amber-500/10 via-[var(--bg-card)] to-cyan-500/10 border border-[var(--border-strong)] rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5" />
              Beyond Tourist Traps
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-black text-[var(--text-main)] mt-0.5">
              Featured Hidden Gems
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Quiet sanctuaries, ancient rock-cut caves, and authentic local spots.
            </p>
          </div>

          <button
            onClick={onGemsClick}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Explore All Hidden Gems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hiddenGems.slice(0, 3).map(gem => (
            <div
              key={gem.id}
              onClick={() => onPlaceClick(gem.id)}
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 cursor-pointer hover:border-cyan-500 transition-all flex flex-col justify-between gap-4 shadow-sm"
            >
              <div>
                <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3">
                  <img
                    src={gem.imageUrl}
                    alt={gem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-500 text-black text-[10px] font-black uppercase">
                    Hidden Gem
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[var(--text-main)]">
                  {gem.name}
                </h3>
                <p className="text-xs text-[var(--text-subtle)] mt-1 italic leading-relaxed">
                  "{gem.tagline}"
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] text-[11px] font-mono">
                  {gem.cost === 0 ? 'FREE ENTRY' : `₹${gem.cost} avg`}
                </span>
                <span className="text-cyan-500 font-bold hover:underline">
                  Read Why →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW CITY LIFE WORKS — 3 PILLARS */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Product Philosophy
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-black text-[var(--text-main)] mt-0.5">
            How City Life Works
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Transforming fragmented urban chaos into honest, location-aware intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-black">
              1
            </div>
            <h3 className="font-bold text-base text-[var(--text-main)]">
              Uncover Real Stories
            </h3>
            <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
              Step beyond repetitive social media reels. Discover 8th-century basalt cave temples, 1955 Irani bakeries, and panoramic 2,600ft sunset hill trails verified by local historians.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-black">
              2
            </div>
            <h3 className="font-bold text-base text-[var(--text-main)]">
              Smarter, Safer Decisions
            </h3>
            <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
              Our dual-path Dijkstra router compares fastest paths against risk-penalized corridors. Avoid unlit railway underpasses and heavy freight merges during late night or monsoon rain.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center font-black">
              3
            </div>
            <h3 className="font-bold text-base text-[var(--text-main)]">
              Honest Data Integrity
            </h3>
            <p className="text-xs text-[var(--text-subtle)] leading-relaxed">
              No fabricated reviews or promotional fluff. Every safety alert includes official public records (Police, Municipal Corporation) and transparent citizen verifications.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK CTA SECTION */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h2 className="font-editorial text-2xl sm:text-4xl font-black">
            Stop Surviving the City. Start Living It.
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-lg mt-1.5">
            Join thousands of curious residents, newcomers, students, and solo travelers experiencing Pune with clarity, culture, and peace of mind.
          </p>
        </div>

        <button
          onClick={onExploreClick}
          className="px-6 py-3.5 rounded-xl bg-white text-stone-900 font-black text-sm shadow-lg hover:bg-amber-50 transition-all shrink-0 hover:scale-105"
        >
          Launch Interactive Map
        </button>
      </section>
    </div>
  );
};
