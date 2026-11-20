import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  Store,
  UtensilsCrossed,
  Coffee,
  HeartPulse,
  Cake,
  Bike,
  Star,
  Clock,
  Radio,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useNearMe } from '../context/NearMeContext';
import { Business, RadiusFilter } from '../types/nearme';

export const MockMapCanvas: React.FC = () => {
  const {
    businesses,
    radiusFilter,
    setRadiusFilter,
    navigateTo,
    setCurrentBusiness,
    vendorCheckIn,
  } = useNearMe();

  const [selectedMarker, setSelectedMarker] = useState<Business | null>(businesses[1] || businesses[0]);
  const [mapZoom, setMapZoom] = useState(1);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Grocery':
        return <Store className="w-3.5 h-3.5" />;
      case 'Street Food':
        return <UtensilsCrossed className="w-3.5 h-3.5" />;
      case 'Tea Stall & Tong':
        return <Coffee className="w-3.5 h-3.5" />;
      case 'Bakery & Snacks':
        return <Cake className="w-3.5 h-3.5" />;
      case 'Pharmacy':
        return <HeartPulse className="w-3.5 h-3.5" />;
      default:
        return <Bike className="w-3.5 h-3.5" />;
    }
  };

  // Coordinates converted to SVG canvas percentages relative to central Dhanmondi
  // Center is at 23.7500 N, 90.3800 E
  const getMarkerCoords = (b: Business, index: number) => {
    // Generate well-distributed visually appealing positions on our map grid
    const positions: Record<string, { x: number; y: number }> = {
      b1: { x: 46, y: 44 }, // Bhai Bhai Dhanmondi
      b2: { x: 55, y: 56 }, // TSC Tong
      b3: { x: 62, y: 38 }, // Karwan Bazar
      b4: { x: 42, y: 52 }, // Rabindra Sarobar
      b5: { x: 30, y: 34 }, // Mohammadpur
      b6: { x: 74, y: 26 }, // Banani
      b7: { x: 28, y: 22 }, // Mirpur 1
      b8: { x: 66, y: 72 }, // Nazira Bazar
      b9: { x: 76, y: 14 }, // Uttara
      b10: { x: 54, y: 40 }, // Farmgate
      b11: { x: 50, y: 74 }, // Lalbagh
      b12: { x: 80, y: 30 }, // Gulshan
    };

    if (positions[b.id]) return positions[b.id];
    // Fallback radial calculation
    const angle = (index / 12) * 2 * Math.PI;
    const dist = (b.distanceMeters / 5000) * 36;
    return {
      x: 50 + Math.cos(angle) * dist,
      y: 50 + Math.sin(angle) * dist,
    };
  };

  // Radius circle pixel scale
  const radiusCircleScale = {
    500: 16,
    1000: 28,
    3000: 56,
    5000: 84,
  }[radiusFilter];

  return (
    <div className="relative w-full h-full min-h-[480px] bg-[#E8ECE9] overflow-hidden select-none flex flex-col">
      {/* Top Warning Banner / Phase 1 Mock Indicator */}
      <div className="absolute top-2 left-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-200/90 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
          <Info className="w-3.5 h-3.5 text-[#16834A] shrink-0" />
          <span className="truncate">
            <strong className="text-[#16834A]">Mock GPS Map:</strong> Dhanmondi & Dhaka Center
          </span>
        </div>
        <span className="text-[10px] bg-[#E8F5EC] text-[#16834A] font-semibold px-2 py-0.5 rounded-full border border-[#16834A]/20">
          Phase 1 Prototype
        </span>
      </div>

      {/* Radius Filter Floating Bar */}
      <div className="absolute top-12 left-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm p-1 rounded-xl shadow-xs border border-neutral-200/80">
        <span className="text-[11px] font-semibold text-neutral-500 pl-2 pr-1">Radius:</span>
        {([500, 1000, 3000, 5000] as RadiusFilter[]).map((r) => (
          <button
            key={r}
            onClick={() => setRadiusFilter(r)}
            className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              radiusFilter === r
                ? 'bg-[#16834A] text-white shadow-xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            {r < 1000 ? `${r}m` : `${r / 1000}km`}
          </button>
        ))}
      </div>

      {/* Interactive Stylized Vector Map Canvas */}
      <div
        className="w-full flex-1 relative cursor-grab active:cursor-grabbing transition-transform duration-300"
        style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full absolute inset-0 pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Background Map Blocks */}
          <rect width="100" height="100" fill="#EAEFEA" />

          {/* Green Parks / Open Areas */}
          {/* Ramna Park / DU Campus */}
          <ellipse cx="62" cy="58" rx="7" ry="6" fill="#D3E8D9" />
          {/* Dhanmondi Lake green belt */}
          <path
            d="M 40,42 Q 44,50 42,62 Q 41,70 38,76"
            stroke="#BDDDC7"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Dhanmondi Lake Water Body */}
          <path
            d="M 40,42 Q 44,50 42,62 Q 41,70 38,76"
            stroke="#99CCE6"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Major Roads Grid (Satmasjid Rd, Mirpur Rd, Kazi Nazrul Ave) */}
          <line x1="10" y1="36" x2="90" y2="36" stroke="#FFFFFF" strokeWidth="2.4" />
          <line x1="10" y1="52" x2="90" y2="52" stroke="#FFFFFF" strokeWidth="2.8" />
          <line x1="10" y1="68" x2="90" y2="68" stroke="#FFFFFF" strokeWidth="2.2" />

          <line x1="32" y1="10" x2="32" y2="90" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="70" y1="10" x2="70" y2="90" stroke="#FFFFFF" strokeWidth="2.5" />

          {/* Diagonal avenues */}
          <line x1="20" y1="80" x2="80" y2="20" stroke="#FFFFFF" strokeWidth="2.2" />

          {/* Road Borders */}
          <line x1="10" y1="52" x2="90" y2="52" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1 1" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1 1" />

          {/* Road labels */}
          <text x="51" y="24" fontSize="2.2" fill="#8898AA" fontWeight="bold">
            Mirpur Rd
          </text>
          <text x="51" y="84" fontSize="2.2" fill="#8898AA" fontWeight="bold">
            Satmasjid Rd
          </text>
          <text x="14" y="50" fontSize="2.2" fill="#8898AA" fontWeight="bold">
            Manik Mia Ave
          </text>
          <text x="64" y="50" fontSize="2.2" fill="#8898AA" fontWeight="bold">
            TSC / Nilkhet
          </text>

          {/* Radius Range Circle Around User (at center 50, 50) */}
          <circle
            cx="50"
            cy="50"
            r={radiusCircleScale / 2}
            fill="#16834A"
            fillOpacity="0.06"
            stroke="#16834A"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
        </svg>

        {/* User Location Pulse Marker (Fixed at 50%, 50%) */}
        <div
          className="absolute z-20 pointer-events-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: '50%', top: '50%' }}
          title="Your Current Location (Dhanmondi, Dhaka)"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing radar waves */}
            <span className="absolute w-8 h-8 rounded-full bg-[#16834A]/25 animate-ping" />
            <span className="w-5 h-5 rounded-full bg-[#16834A] border-2 border-white shadow-md flex items-center justify-center text-white">
              <Navigation className="w-2.5 h-2.5 fill-white rotate-45" />
            </span>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900/90 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              You are here
            </div>
          </div>
        </div>

        {/* Business and Vendor Pins */}
        {businesses.map((b, idx) => {
          const coords = getMarkerCoords(b, idx);
          const isSelected = selectedMarker?.id === b.id;
          const isVendorLive = b.isCheckInActive;
          const isInsideRadius = b.distanceMeters <= radiusFilter;

          if (!isInsideRadius) return null;

          return (
            <button
              key={b.id}
              onClick={() => setSelectedMarker(b)}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 cursor-pointer focus:outline-none ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Active Live Vendor badge */}
                {isVendorLive && (
                  <span className="absolute -top-3.5 px-1 py-0.2 rounded-full bg-[#FF9F43] text-white text-[8px] font-black tracking-tight shadow-xs flex items-center gap-0.5 ring-1 ring-white animate-bounce">
                    <Radio className="w-2 h-2" />
                    LIVE
                  </span>
                )}

                {/* Marker Pin Icon */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 transition-all ${
                    isVendorLive
                      ? 'bg-[#FF9F43] border-white text-white'
                      : isSelected
                      ? 'bg-[#16834A] border-white text-white ring-2 ring-[#16834A]'
                      : 'bg-white border-[#16834A] text-[#16834A]'
                  }`}
                >
                  {getCategoryIcon(b.category)}
                </div>

                {/* Marker pointer triangle */}
                <div
                  className={`w-2 h-2 rotate-45 -mt-1 ${
                    isVendorLive
                      ? 'bg-[#FF9F43]'
                      : isSelected
                      ? 'bg-[#16834A]'
                      : 'bg-white border-r-2 border-b-2 border-[#16834A]'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Map Controls (Zoom In/Out, Recenter) */}
      <div className="absolute right-3 top-24 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => setMapZoom((z) => Math.min(1.4, z + 0.15))}
          className="w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 font-bold text-sm hover:bg-neutral-50 active:scale-95"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => setMapZoom((z) => Math.max(0.85, z - 0.15))}
          className="w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 font-bold text-sm hover:bg-neutral-50 active:scale-95"
          title="Zoom Out"
        >
          -
        </button>
        <button
          onClick={() => setMapZoom(1)}
          className="w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center text-[#16834A] hover:bg-neutral-50 active:scale-95"
          title="Recenter to You"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Selected Business Card preview */}
      {selectedMarker && (
        <div className="p-3 bg-white border-t border-neutral-200 z-20 shadow-lg">
          <div className="flex items-start gap-3">
            <img
              src={selectedMarker.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300'}
              alt={selectedMarker.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-neutral-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5EC] text-[#16834A]">
                  {selectedMarker.category}
                </span>
                {selectedMarker.isCheckInActive && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF9F43] text-white flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5" />
                    Selling Here Today
                  </span>
                )}
                <span className="text-[10px] font-semibold text-neutral-500 flex items-center gap-0.5 ml-auto">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {selectedMarker.rating} ({selectedMarker.reviewCount})
                </span>
              </div>

              <h3 className="font-bold text-neutral-900 text-sm truncate mt-1">
                {selectedMarker.name}
              </h3>

              <p className="text-xs text-neutral-500 truncate">{selectedMarker.address}</p>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100">
                <div className="flex items-center gap-3 text-[11px] font-medium text-neutral-600">
                  <span className="text-[#16834A] font-bold">
                    {selectedMarker.distanceMeters < 1000
                      ? `${selectedMarker.distanceMeters}m away`
                      : `${(selectedMarker.distanceMeters / 1000).toFixed(1)}km away`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    {selectedMarker.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setCurrentBusiness(selectedMarker);
                    navigateTo('business_detail');
                  }}
                  className="px-3 py-1 rounded-lg bg-[#16834A] text-white text-xs font-semibold hover:bg-[#0E5E34] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
