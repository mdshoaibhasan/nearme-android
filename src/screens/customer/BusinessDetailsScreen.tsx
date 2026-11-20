import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Bookmark,
  Share2,
  Navigation,
  Radio,
  Store,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';

export const BusinessDetailsScreen: React.FC = () => {
  const {
    currentBusiness,
    isBookmarked,
    toggleBookmark,
    showSnackbar,
    navigateTo,
  } = useNearMe();

  if (!currentBusiness) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <Store className="w-12 h-12 text-neutral-300 mb-2" />
        <p className="text-sm font-bold text-neutral-600">No business selected</p>
        <button
          onClick={() => navigateTo('customer_home')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#16834A] text-white text-xs font-semibold cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const b = currentBusiness;
  const bookmarked = isBookmarked(b.id);

  const handleCall = () => {
    showSnackbar(`Calling ${b.contactNumber}... (Simulated phone call)`, 'info');
  };

  const handleDirections = () => {
    showSnackbar(`Walking route started: ${b.distanceMeters}m to ${b.name}`, 'success');
  };

  const handleShare = () => {
    showSnackbar(`Copied link to ${b.name} to clipboard!`, 'info');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none">
      {/* Hero Image Banner */}
      <div className="relative w-full h-52 bg-neutral-200 shrink-0">
        <img
          src={b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'}
          alt={b.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Floating Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:bg-white shadow-sm cursor-pointer"
            title="Share business"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleBookmark(b.id)}
            className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm cursor-pointer ${
              bookmarked ? 'text-[#16834A]' : 'text-neutral-700 hover:bg-white'
            }`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#16834A]' : ''}`} />
          </button>
        </div>

        {/* Bottom Hero Badges */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5EC] text-[#16834A] text-xs font-bold uppercase tracking-wider">
                {b.category}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  b.isOpen ? 'bg-[#16834A] text-white' : 'bg-neutral-800 text-white'
                }`}
              >
                {b.isOpen ? 'OPEN NOW' : 'CLOSED'}
              </span>
            </div>
            <h1 className="text-xl font-black text-white leading-tight drop-shadow-md">
              {b.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Live Vendor Active Check-In Banner if active */}
        {b.isCheckInActive && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF5EB] to-[#FFF0DD] border border-[#FF9F43]/40 shadow-xs">
            <div className="flex items-center gap-2 text-[#FF9F43] font-bold text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F43] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF9F43]" />
              </span>
              <span className="uppercase tracking-wider">Selling Here Today (Live Stall)</span>
            </div>
            <p className="text-xs text-neutral-700 mt-1 font-medium">
              📍 Current Spot: <strong>{b.checkInLocation || b.address}</strong>
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Broadcast active until <strong>{b.checkInExpiresAt || '11:00 PM'}</strong>
            </p>
          </div>
        )}

        {/* Quick Action Buttons (Call, Directions) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCall}
            className="py-2.5 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#0E5E34] active:scale-[0.99] transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Call Merchant</span>
          </button>
          <button
            onClick={handleDirections}
            className="py-2.5 px-4 rounded-xl bg-[#E8F5EC] text-[#16834A] border border-[#16834A]/30 font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#d8eedf] active:scale-[0.99] transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </button>
        </div>

        {/* Key Info Cards */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-neutral-500 font-medium">Distance from you:</span>
            <span className="font-bold text-[#16834A]">
              {b.distanceMeters < 1000
                ? `${b.distanceMeters} meters away`
                : `${(b.distanceMeters / 1000).toFixed(1)} km away`}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-500 font-medium">Customer Rating:</span>
            <span className="font-bold text-neutral-800 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {b.rating} out of 5.0 ({b.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-500 font-medium">Operating Hours:</span>
            <span className="font-bold text-neutral-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              {b.openingTime} – {b.closingTime}
            </span>
          </div>

          <div className="flex items-start justify-between pt-1 border-t border-neutral-200/60">
            <span className="text-neutral-500 font-medium shrink-0 mr-2">Address:</span>
            <span className="font-semibold text-neutral-800 text-right">{b.address}</span>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-sm font-bold text-[#202124] mb-1.5">About This Business</h3>
          <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
            {b.description}
          </p>
        </div>

        {/* Product Catalog & Stalls List */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-sm font-bold text-[#202124] flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#16834A]" />
              <span>Available Products & Prices ({b.products.length})</span>
            </h3>
            <span className="text-[11px] font-bold text-[#16834A]">BDT Currency (৳)</span>
          </div>

          {b.products.length === 0 ? (
            <p className="text-xs text-neutral-400 italic py-4 text-center">
              No products listed yet. Check back soon!
            </p>
          ) : (
            <div className="space-y-2">
              {b.products.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl border border-neutral-200/80 bg-white flex items-center justify-between shadow-2xs hover:border-[#16834A]/40 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-[#202124] truncate">{p.name}</h4>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          p.isAvailable
                            ? 'bg-[#E8F5EC] text-[#16834A]'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {p.isAvailable ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    {p.description && (
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                        {p.description}
                      </p>
                    )}
                    <span className="text-[10px] text-neutral-400 font-medium">
                      Unit: {p.unit}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-[#16834A]">৳{p.price}</div>
                    <span className="text-[9px] text-neutral-400">Fixed Rate</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* University Project Disclaimer Badge */}
        <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5 text-[11px] text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-[#16834A] shrink-0 mt-0.5" />
          <div>
            <strong>Phase 1 Local Mock:</strong> Prices and vendor statuses are stored in local
            repository and update reactively during this session.
          </div>
        </div>
      </div>
    </div>
  );
};
