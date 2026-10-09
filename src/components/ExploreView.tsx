import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Map as MapIcon,
  Grid,
  ArrowUpDown,
  Compass,
  Landmark,
  ShieldCheck,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { Place, PUNE_NEIGHBORHOOD_CENTERS } from '../data/cityData';
import { PlaceCard } from './PlaceCard';
import { RealLeafletMap } from './RealLeafletMap';
import { IndiaFlagLogo } from './IndiaFlagLogo';

interface ExploreViewProps {
  places: Place[];
  selectedPlaceId: string | null;
  onSelectPlaceId: (id: string) => void;
  onOpenDetailModal: (place: Place) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedCity?: string;
  userLocation?: { lat: number; lng: number } | null;
  onLocateMe?: () => void;
  isLocating?: boolean;
  initialViewMode?: 'grid' | 'split';
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  places,
  selectedPlaceId,
  onSelectPlaceId,
  onOpenDetailModal,
  favorites,
  onToggleFavorite,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  selectedCity = 'Pune',
  userLocation,
  onLocateMe,
  isLocating = false,
  initialViewMode = 'split'
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'cost_asc' | 'cost_desc'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'split'>(initialViewMode);

  const categories = [
    { id: 'all', label: 'All Places' },
    { id: 'forts', label: 'Forts & Heritage 🇮🇳' },
    { id: 'heritage', label: 'Monuments' },
    { id: 'tourist', label: 'Attractions' },
    { id: 'gem', label: 'Hidden Gems' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'cafe', label: 'Cafes & Bakeries' },
    { id: 'nature', label: 'Parks & Hills' },
    { id: 'hotel', label: 'Hotels & Stays' },
    { id: 'shopping', label: 'Shopping' }
  ];

  const neighborhoods = [
    { id: 'all', label: 'All Regions' },
    { id: 'Southwest Sahyadris', label: 'Sahyadri Forts (Maharashtra)' },
    { id: 'National Heritage', label: 'National Forts (Delhi / Agra / Rajasthan)' },
    { id: 'Old City (Peths)', label: 'Old City (Peths & Shaniwar Wada)' },
    { id: 'Deccan / FC Road', label: 'Deccan & FC Road' },
    { id: 'Shivajinagar / JM Road', label: 'Shivajinagar & JM Road' },
    { id: 'Pune Camp / East Street', label: 'Pune Camp' },
    { id: 'Koregaon Park (North Main Rd)', label: 'Koregaon Park' },
    { id: 'Kothrud / Senapati Bapat Rd', label: 'Kothrud' },
    { id: 'Kalyani Nagar / Nagar Rd', label: 'Kalyani Nagar' },
    { id: 'Swargate / Parvati', label: 'Swargate' }
  ];

  // Featured Indian Forts subset for the spotlight section
  const featuredForts = useMemo(() => {
    return places.filter(p => p.isFort || p.category === 'forts');
  }, [places]);

  // Center coords from selected city/region
  const centerCoords = useMemo(() => {
    if (selectedCity && PUNE_NEIGHBORHOOD_CENTERS[selectedCity]) {
      return PUNE_NEIGHBORHOOD_CENTERS[selectedCity];
    }
    return null;
  }, [selectedCity]);

  // Filtered Places synchronized with Search and Category filters
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      // 1. Category Filter: 'forts' matches forts and historical monuments
      if (activeCategory !== 'all') {
        if (activeCategory === 'forts') {
          const isFortOrHeritage =
            place.category === 'forts' ||
            place.category === 'heritage' ||
            place.isFort ||
            place.tags.includes('Forts & Heritage') ||
            place.tags.includes('Maratha Fortress') ||
            place.tags.includes('UNESCO World Heritage');
          if (!isFortOrHeritage) return false;
        } else if (activeCategory === 'food') {
          if (place.category !== 'food' && place.category !== 'budget') return false;
        } else if (place.category !== activeCategory) {
          return false;
        }
      }

      // 2. Neighborhood / Region Filter
      if (selectedNeighborhood !== 'all') {
        if (selectedNeighborhood === 'National Heritage') {
          if (!place.neighborhood.includes('National Heritage')) return false;
        } else if (selectedNeighborhood === 'Southwest Sahyadris') {
          const isSahyadri =
            place.neighborhood.includes('Sahyadris') ||
            place.neighborhood.includes('Lonavala') ||
            place.neighborhood.includes('Konkan') ||
            place.neighborhood.includes('Junnar');
          if (!isSahyadri) return false;
        } else if (place.neighborhood !== selectedNeighborhood) {
          return false;
        }
      }

      // 3. City selector from header
      if (selectedCity && selectedCity !== 'Pune') {
        if (selectedCity === 'Forts & Heritage' && !place.isFort && place.category !== 'forts' && place.category !== 'heritage') return false;
        if (selectedCity === 'Old City' && place.neighborhood !== 'Old City (Peths)') return false;
        if (selectedCity === 'Deccan' && place.neighborhood !== 'Deccan / FC Road') return false;
        if (selectedCity === 'Shivajinagar' && place.neighborhood !== 'Shivajinagar / JM Road') return false;
        if (selectedCity === 'Camp' && place.neighborhood !== 'Pune Camp / East Street') return false;
        if (selectedCity === 'Koregaon Park' && !place.neighborhood.includes('Koregaon Park')) return false;
        if (selectedCity === 'Kothrud' && !place.neighborhood.includes('Kothrud')) return false;
        if (selectedCity === 'Kalyani Nagar' && !place.neighborhood.includes('Kalyani Nagar')) return false;
        if (selectedCity === 'Swargate' && !place.neighborhood.includes('Swargate')) return false;
        if (selectedCity === 'Delhi' && !place.neighborhood.includes('Delhi')) return false;
        if (selectedCity === 'Agra' && !place.neighborhood.includes('Agra')) return false;
        if (selectedCity === 'Rajasthan' && !place.neighborhood.includes('Rajasthan')) return false;
      }

      // 4. Budget Filter
      if (selectedBudgetRange === 'free' && place.cost > 0) return false;
      if (selectedBudgetRange === 'budget' && (place.cost > 200 || place.cost === 0)) return false;
      if (selectedBudgetRange === 'moderate' && (place.cost <= 200 || place.cost > 600)) return false;
      if (selectedBudgetRange === 'premium' && place.cost <= 600) return false;

      // 5. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = place.name.toLowerCase().includes(q);
        const matchTag = place.tags.some(t => t.toLowerCase().includes(q));
        const matchStory = place.story.toLowerCase().includes(q);
        const matchHood = place.neighborhood.toLowerCase().includes(q);
        const matchLocality = place.postalLocality.toLowerCase().includes(q);
        if (!matchName && !matchTag && !matchStory && !matchHood && !matchLocality) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'cost_asc') return a.cost - b.cost;
      if (sortBy === 'cost_desc') return b.cost - a.cost;
      return a.name.localeCompare(b.name);
    });
  }, [places, activeCategory, selectedNeighborhood, selectedCity, selectedBudgetRange, searchQuery, sortBy]);

  const handleCardViewOnMap = (place: Place) => {
    onSelectPlaceId(place.id);
    setViewMode('split');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Overview & Filter Controls */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        {/* Subtle Indian identity accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        <div className="max-w-3xl mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <IndiaFlagLogo className="w-5 h-5 rounded-xs shadow-2xs" />
            <span className="text-xs font-bold text-amber-700 tracking-wide uppercase">
              Explore India's Living Heritage
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Discover Cities, Forts & Living Culture
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Verified Indian hill forts, historic citadels, culinary landmarks, and scenic trails mapped with authentic OpenStreetMap data.
          </p>
        </div>

        {/* Practical 4-Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
          {/* Quick search input */}
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, fort, city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-600 text-slate-900"
            />
          </div>

          {/* Location / Region selector */}
          <div>
            <select
              value={selectedNeighborhood}
              onChange={e => setSelectedNeighborhood(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-600 text-slate-800 font-medium cursor-pointer"
            >
              {neighborhoods.map(n => (
                <option key={n.id} value={n.id}>{n.label}</option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div>
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-600 text-slate-800 font-medium cursor-pointer"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Admission / Budget Selector */}
          <div>
            <select
              value={selectedBudgetRange}
              onChange={e => setSelectedBudgetRange(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-600 text-slate-800 font-medium cursor-pointer"
            >
              <option value="all">Any Pricing</option>
              <option value="free">Free Admission (₹0)</option>
              <option value="budget">Under ₹200 (Budget)</option>
              <option value="moderate">₹200 – ₹600 (Moderate)</option>
              <option value="premium">₹600+ (Premium)</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. OPTIONAL SPOTLIGHT: "Explore India's Heritage" (Indian Forts Showcase) */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Explore India's Heritage & Forts
                </h2>
                <p className="text-xs text-slate-500">
                  Iconic Maratha hill bastions, UNESCO World Heritage citadels, and national monuments
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveCategory('forts')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All Forts ({featuredForts.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Forts Quick-View Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
            {featuredForts.slice(0, 5).map(fort => (
              <div
                key={`spotlight-${fort.id}`}
                onClick={() => onOpenDetailModal(fort)}
                className="group cursor-pointer rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-xs p-2.5 transition-all bg-slate-50/50 hover:bg-white"
              >
                <div className="relative aspect-video rounded-md overflow-hidden bg-slate-200 mb-2">
                  <img
                    src={fort.imageUrl}
                    alt={fort.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1626014303757-6467000c0f9a?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/95 text-slate-800 shadow-2xs">
                    {fort.cost === 0 ? 'Free' : `₹${fort.cost}`}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {fort.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  📍 {fort.neighborhood}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-slate-200/60">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleCardViewOnMap(fort);
                    }}
                    className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
                  >
                    <MapIcon className="w-3 h-3" />
                    <span>Map</span>
                  </button>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${fort.lat},${fort.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-0.5"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Route</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Category Chips & Layout Mode Switcher */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Horizontal Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            const isFortsTab = cat.id === 'forts';
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`py-1.5 px-3 rounded-full text-xs font-medium whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                    : isFortsTab
                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {isFortsTab && !isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Controls: Sort & Map Toggle */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 text-xs text-slate-600 border border-slate-200 bg-white rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent outline-none cursor-pointer text-slate-800 font-medium text-xs"
            >
              <option value="name">Alphabetical</option>
              <option value="cost_asc">Price: Low to High</option>
              <option value="cost_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Toggle Map vs Grid View */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'grid' ? 'split' : 'grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              viewMode === 'split'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {viewMode === 'grid' ? (
              <>
                <MapIcon className="w-3.5 h-3.5" />
                <span>Interactive Map</span>
              </>
            ) : (
              <>
                <Grid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* 4. Discovery Results */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-0.5">
          <span>
            Showing <strong>{filteredPlaces.length}</strong> verified locations
            {activeCategory === 'forts' && ' in Forts & Heritage'}
            {selectedCity !== 'Pune' && ` for ${selectedCity}`}
          </span>
          {(searchQuery || activeCategory !== 'all' || selectedNeighborhood !== 'all' || selectedBudgetRange !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedNeighborhood('all');
                setSelectedBudgetRange('all');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-xl p-8 space-y-3">
            <Compass className="w-8 h-8 mx-auto text-slate-300" />
            <h3 className="font-bold text-base text-slate-900">No matching locations found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your category filter or search keywords to discover verified forts and heritage landmarks.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedNeighborhood('all');
                setSelectedBudgetRange('all');
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'split' ? (
          /* Split View: Left Real Leaflet Map, Right Cards */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-7 sticky top-28 h-[600px]">
              <RealLeafletMap
                places={filteredPlaces}
                selectedPlaceId={selectedPlaceId}
                onSelectPlace={id => {
                  onSelectPlaceId(id);
                  const p = places.find(pl => pl.id === id);
                  if (p) onOpenDetailModal(p);
                }}
                onOpenDetailModal={onOpenDetailModal}
                userLocation={userLocation}
                height="600px"
                centerCoords={centerCoords}
                onLocateMe={onLocateMe}
                isLocating={isLocating}
              />
            </div>

            <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredPlaces.map(place => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isSelected={place.id === selectedPlaceId}
                  isFavorite={favorites.includes(place.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectPlace={p => onOpenDetailModal(p)}
                  onViewOnMap={p => onSelectPlaceId(p.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Grid View: Responsive cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlaces.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
                isSelected={place.id === selectedPlaceId}
                isFavorite={favorites.includes(place.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectPlace={p => onOpenDetailModal(p)}
                onViewOnMap={handleCardViewOnMap}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
