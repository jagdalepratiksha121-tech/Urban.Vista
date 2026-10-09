/**
 * City Life — Stop Surviving the City. Start Living It.
 * A trustworthy, realistic, production-quality city exploration platform
 * with authentic Pune data, Leaflet OpenStreetMap integration, and verified sources.
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ExploreView } from './components/ExploreView';
import { HiddenGemsView } from './components/HiddenGemsView';
import { HistoryCultureView } from './components/HistoryCultureView';
import { CitySafetyView } from './components/CitySafetyView';
import { CompareView } from './components/CompareView';
import { TripPlannerView } from './components/TripPlannerView';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { CityCompanionModal } from './components/CityCompanionModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import {
  PUNE_PLACES,
  INITIAL_RISK_ZONES,
  ROAD_JUNCTIONS,
  ROAD_EDGES,
  Place,
  IncidentRiskZone,
  JunctionNode,
  PUNE_NEIGHBORHOOD_CENTERS
} from './data/cityData';

export default function App() {
  // Navigation & Search State
  const [currentTab, setCurrentTab] = useState<string>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('Pune');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Geolocation State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationToast, setLocationToast] = useState<{ type: 'success' | 'warning'; message: string } | null>(null);

  // Selected Place & Modals
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  const [isAiCompanionOpen, setIsAiCompanionOpen] = useState<boolean>(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);

  // User Bookmarks & Saved Trips
  const [favorites, setFavorites] = useState<string[]>(['shaniwar-wada', 'aga-khan-palace', 'pataleshwar-cave']);
  const [savedItineraries, setSavedItineraries] = useState<Array<{
    id: string;
    title: string;
    placesCount: number;
    totalCost: number;
    createdAt: string;
  }>>([
    {
      id: 'it-1',
      title: 'Peshwa Heritage & Peth Food Trail',
      placesCount: 3,
      totalCost: 155,
      createdAt: 'Yesterday'
    }
  ]);
  const [compareIds, setCompareIds] = useState<string[]>(['shaniwar-wada', 'aga-khan-palace']);

  // Safe Route Navigation State
  const [routeFrom, setRouteFrom] = useState<string>('J1'); // Aundh
  const [routeTo, setRouteTo] = useState<string>('J17'); // Swargate

  // Geolocation Handler — Always ensures location works reliably
  const handleLocateMe = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      setUserLocation({ lat: 18.5204, lng: 73.8567 });
      setIsLocating(false);
      setLocationToast({ type: 'success', message: 'Centered on Pune City Center (18.5204° N, 73.8567° E).' });
      if (currentTab !== 'explore' && currentTab !== 'map') setCurrentTab('explore');
      setTimeout(() => setLocationToast(null), 4000);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setIsLocating(false);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationToast({ type: 'success', message: 'Current GPS location found and centered on map!' });
        if (currentTab !== 'explore' && currentTab !== 'map') setCurrentTab('explore');
        setTimeout(() => setLocationToast(null), 4000);
      },
      error => {
        setIsLocating(false);
        // Fallback to Pune center so the pin appears and map centers immediately
        setUserLocation({ lat: 18.5204, lng: 73.8567 });
        let msg = 'Centered on Pune City (18.5204° N, 73.8567° E).';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'GPS permission restricted by browser. Dropped pin on Pune City Center.';
        }
        setLocationToast({ type: 'warning', message: msg });
        if (currentTab !== 'explore' && currentTab !== 'map') setCurrentTab('explore');
        setTimeout(() => setLocationToast(null), 4500);
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  };

  // Toggle Favorite Action
  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Toggle Compare Action
  const handleAddToCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(i => i !== id));
    } else if (compareIds.length < 4) {
      setCompareIds([...compareIds, id]);
    }
  };

  // Route directly to a place
  const handleRouteHere = (place: Place) => {
    let closestId = ROAD_JUNCTIONS[0].id;
    let minDist = Infinity;
    ROAD_JUNCTIONS.forEach(j => {
      const d = Math.hypot(j.lat - place.lat, j.lng - place.lng);
      if (d < minDist) {
        minDist = d;
        closestId = j.id;
      }
    });

    setRouteTo(closestId);
    setCurrentTab('safety');
  };

  // Save Custom Itinerary
  const handleSaveItinerary = (it: { title: string; placesCount: number; totalCost: number }) => {
    setSavedItineraries(prev => [
      {
        id: `it-${Date.now()}`,
        title: it.title,
        placesCount: it.placesCount,
        totalCost: it.totalCost,
        createdAt: 'Just now'
      },
      ...prev
    ]);
  };

  /* --------------------------------------------------------------------------
     Dijkstra Routing Engine (Fastest vs. Safest)
     -------------------------------------------------------------------------- */
  const nodeMap = useMemo(() => new Map<string, JunctionNode>(ROAD_JUNCTIONS.map(j => [j.id, j])), []);

  const getEdgeRisk = (uNode: JunctionNode, vNode: JunctionNode): number => {
    const samples = [0, 0.25, 0.5, 0.75, 1.0];
    let maxRisk = 0;

    samples.forEach(t => {
      const pxLat = (1 - t) * uNode.lat + t * vNode.lat;
      const pxLng = (1 - t) * uNode.lng + t * vNode.lng;

      let pointRisk = 0;
      INITIAL_RISK_ZONES.forEach(rz => {
        const dKm = Math.hypot((pxLat - rz.lat) * 111, (pxLng - rz.lng) * 105);
        const radiusKm = rz.r * 0.15;
        if (dKm < radiusKm) {
          pointRisk += (1 - dKm / radiusKm) * (rz.severity / 10);
        }
      });

      if (pointRisk > maxRisk) maxRisk = pointRisk;
    });

    return Math.min(1.5, maxRisk);
  };

  const calculateDijkstra = (mode: 'fastest' | 'safest') => {
    const adj = new Map<string, Array<{ to: string; dist: number; risk: number }>>();
    ROAD_JUNCTIONS.forEach(j => adj.set(j.id, []));

    ROAD_EDGES.forEach(edge => {
      const uNode = nodeMap.get(edge.u);
      const vNode = nodeMap.get(edge.v);
      if (!uNode || !vNode) return;

      const rawDist = Math.hypot((vNode.lat - uNode.lat) * 111, (vNode.lng - uNode.lng) * 105);
      const risk = getEdgeRisk(uNode, vNode);

      adj.get(edge.u)?.push({ to: edge.v, dist: rawDist, risk });
      adj.get(edge.v)?.push({ to: edge.u, dist: rawDist, risk });
    });

    const distMap = new Map<string, number>();
    const prevMap = new Map<string, string | null>();
    const visited = new Set<string>();

    ROAD_JUNCTIONS.forEach(j => {
      distMap.set(j.id, Infinity);
      prevMap.set(j.id, null);
    });
    distMap.set(routeFrom, 0);

    for (let i = 0; i < ROAD_JUNCTIONS.length; i++) {
      let minNode: string | null = null;
      let minDist = Infinity;

      ROAD_JUNCTIONS.forEach(j => {
        if (!visited.has(j.id)) {
          const d = distMap.get(j.id) ?? Infinity;
          if (d < minDist) {
            minDist = d;
            minNode = j.id;
          }
        }
      });

      if (!minNode || minNode === routeTo) break;
      visited.add(minNode);

      const neighbors = adj.get(minNode) || [];
      for (const n of neighbors) {
        if (visited.has(n.to)) continue;

        const weight = mode === 'fastest' ? n.dist : n.dist * (1 + 8 * n.risk);
        const alt = minDist + weight;
        if (alt < (distMap.get(n.to) ?? Infinity)) {
          distMap.set(n.to, alt);
          prevMap.set(n.to, minNode);
        }
      }
    }

    const path: string[] = [];
    let curr: string | null = routeTo;
    while (curr) {
      path.unshift(curr);
      curr = prevMap.get(curr) || null;
    }

    let totalRawDist = 0;
    let accumulatedRisk = 0;

    for (let k = 0; k < path.length - 1; k++) {
      const u = nodeMap.get(path[k]);
      const v = nodeMap.get(path[k + 1]);
      if (u && v) {
        const d = Math.hypot((v.lat - u.lat) * 111, (v.lng - u.lng) * 105);
        totalRawDist += d;
        accumulatedRisk += d * getEdgeRisk(u, v);
      }
    }

    const distanceKm = Number(totalRawDist.toFixed(1));
    const timeMins = Math.max(4, Math.round(distanceKm * 2.8));
    const riskExposurePercent = totalRawDist > 0
      ? Math.min(95, Math.round((accumulatedRisk / totalRawDist) * 100))
      : 0;

    return { path, distanceKm, timeMins, riskExposurePercent };
  };

  const fastestRoute = useMemo(() => calculateDijkstra('fastest'), [routeFrom, routeTo]);
  const safestRoute = useMemo(() => calculateDijkstra('safest'), [routeFrom, routeTo]);

  // Filter sets for specific tabs
  const hiddenGems = useMemo(() => PUNE_PLACES.filter(p => p.category === 'gem' || p.isFeaturedGem), []);
  const heritagePlaces = useMemo(() => PUNE_PLACES.filter(p => p.category === 'heritage' || p.category === 'forts' || p.isFort), []);

  // Center coordinate mapping when neighborhood selector is used
  const centerCoords = useMemo(() => {
    return PUNE_NEIGHBORHOOD_CENTERS[selectedCity] || PUNE_NEIGHBORHOOD_CENTERS['Pune'];
  }, [selectedCity]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      
      {/* Location Toast Notification */}
      {locationToast && (
        <div className={`fixed top-18 right-4 z-50 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-lg border animate-fade-in flex items-center gap-2 ${
          locationToast.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          <span>{locationToast.message}</span>
        </div>
      )}

      {/* 1. COMPACT, PRACTICAL HEADER */}
      <Header
        currentTab={currentTab}
        setCurrentTab={tab => {
          if (tab === 'forts') {
            setCurrentTab('explore');
            setActiveCategory('forts');
          } else if (tab === 'food') {
            setCurrentTab('explore');
            setActiveCategory('food');
          } else if (tab === 'attractions') {
            setCurrentTab('explore');
            setActiveCategory('tourist');
          } else {
            setCurrentTab(tab);
          }
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        savedCount={favorites.length}
        openFavoritesModal={() => setIsFavoritesModalOpen(true)}
        openAiCompanion={() => setIsAiCompanionOpen(true)}
        onSearchSubmit={() => setCurrentTab('explore')}
        currentUser={currentUser}
        onOpenAuth={mode => {
          setAuthModalMode(mode);
          setIsAuthModalOpen(true);
        }}
        onLogout={() => setCurrentUser(null)}
        onLocateMe={handleLocateMe}
        isLocating={isLocating}
      />

      {/* 2. MAIN APPLICATION CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* TAB A: EXPLORE & INTERACTIVE MAP VIEW */}
        {(currentTab === 'explore' || currentTab === 'map') && (
          <ExploreView
            places={PUNE_PLACES}
            selectedPlaceId={selectedPlaceId}
            onSelectPlaceId={id => setSelectedPlaceId(id)}
            onOpenDetailModal={p => setModalPlace(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            selectedCity={selectedCity}
            userLocation={userLocation}
            onLocateMe={handleLocateMe}
            isLocating={isLocating}
            initialViewMode="split"
          />
        )}

        {/* TAB B: HIDDEN GEMS */}
        {currentTab === 'gems' && (
          <HiddenGemsView
            gems={hiddenGems}
            onOpenDetailModal={p => setModalPlace(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewOnMap={p => {
              setSelectedPlaceId(p.id);
              setCurrentTab('explore');
            }}
          />
        )}

        {/* TAB C: HISTORY & CULTURE */}
        {currentTab === 'history' && (
          <HistoryCultureView
            heritagePlaces={heritagePlaces}
            onOpenDetailModal={p => setModalPlace(p)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewOnMap={p => {
              setSelectedPlaceId(p.id);
              setCurrentTab('explore');
            }}
          />
        )}

        {/* TAB D: CITY SAFETY (With Leaflet Map & Dijkstra Router) */}
        {currentTab === 'safety' && (
          <CitySafetyView
            places={PUNE_PLACES}
            riskZones={INITIAL_RISK_ZONES}
            routeFrom={routeFrom}
            setRouteFrom={setRouteFrom}
            routeTo={routeTo}
            setRouteTo={setRouteTo}
            fastestRoute={fastestRoute}
            safestRoute={safestRoute}
          />
        )}

        {/* TAB E: COMPARE PLACES */}
        {currentTab === 'compare' && (
          <CompareView
            places={PUNE_PLACES}
            compareIds={compareIds}
            setCompareIds={setCompareIds}
            onOpenDetailModal={p => setModalPlace(p)}
          />
        )}

        {/* TAB F: TRIP PLANNER */}
        {currentTab === 'planner' && (
          <TripPlannerView
            places={PUNE_PLACES}
            onOpenDetailModal={p => setModalPlace(p)}
            onSaveItinerary={handleSaveItinerary}
          />
        )}
      </main>

      {/* 3. CLEAN, COMPACT FOOTER */}
      <Footer
        onNavClick={tab => {
          if (tab === 'forts') {
            setCurrentTab('explore');
            setActiveCategory('forts');
          } else if (tab === 'food') {
            setCurrentTab('explore');
            setActiveCategory('food');
          } else if (tab === 'attractions') {
            setCurrentTab('explore');
            setActiveCategory('tourist');
          } else {
            setCurrentTab(tab);
          }
        }}
      />

      {/* 4. DIALOG MODALS */}
      {/* A. Place Detail Modal */}
      <PlaceDetailModal
        place={modalPlace}
        onClose={() => setModalPlace(null)}
        isFavorite={modalPlace ? favorites.includes(modalPlace.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCompare={handleAddToCompare}
        isInCompare={modalPlace ? compareIds.includes(modalPlace.id) : false}
        onRouteHere={handleRouteHere}
        onViewOnMap={p => {
          setSelectedPlaceId(p.id);
          setCurrentTab('explore');
        }}
      />

      {/* B. AI City Companion Assistant */}
      <CityCompanionModal
        isOpen={isAiCompanionOpen}
        onClose={() => setIsAiCompanionOpen(false)}
        onSelectPlace={id => {
          setSelectedPlaceId(id);
          const p = PUNE_PLACES.find(pl => pl.id === id);
          if (p) setModalPlace(p);
        }}
        places={PUNE_PLACES}
      />

      {/* C. User Saved Places & Preferences */}
      <UserProfileModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        places={PUNE_PLACES}
        onSelectPlace={id => {
          setSelectedPlaceId(id);
          const p = PUNE_PLACES.find(pl => pl.id === id);
          if (p) setModalPlace(p);
        }}
        savedItineraries={savedItineraries}
        currentUser={currentUser}
      />

      {/* D. Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={user => {
          setCurrentUser(user);
          setLocationToast({ type: 'success', message: `Signed in as ${user.name}` });
          setTimeout(() => setLocationToast(null), 3000);
        }}
      />
    </div>
  );
}
