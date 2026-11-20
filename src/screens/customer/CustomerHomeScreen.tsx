import React from 'react';
import {
  Search,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Bookmark,
  Radio,
  SlidersHorizontal,
  Store,
  UtensilsCrossed,
  Coffee,
  HeartPulse,
  Cake,
  Bike,
  Sparkles,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { Business, BusinessCategory, RadiusFilter } from '../../types/nearme';

export const CustomerHomeScreen: React.FC = () => {
  const {
    businesses,
    filteredBusinesses,
    radiusFilter,
    setRadiusFilter,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    navigateTo,
    setCurrentBusiness,
    isBookmarked,
    toggleBookmark,
    currentUser,
    vendorCheckIn,
  } = useNearMe();

  const getCategoryIconComponent = (catName: string) => {
    switch (catName) {
      case 'Grocery':
        return Store;
      case 'Street Food':
        return UtensilsCrossed;
      case 'Tea Stall & Tong':
        return Coffee;
      case 'Bakery & Snacks':
        return Cake;
      case 'Pharmacy':
        return HeartPulse;
      default:
        return Bike;
    }
  };

  const handleBusinessClick = (b: Business) => {
    setCurrentBusiness(b);
    navigateTo('business_detail');
  };

  // Find live street vendors
  const liveVendors = businesses.filter((b) => b.isCheckInActive);

  return (
    <div className="w-full h-full bg-[#FFFFFF] flex flex-col overflow-y-auto select-none">
      {/* 1. Header & Greeting Section */}
      <div className="bg-gradient-to-b from-[#E8F5EC] to-white px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16834A]">
              <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Dhanmondi, Dhaka</span>
            </div>
            <h2 className="text-xl font-black text-[#202124] tracking-tight mt-0.5">
              Hello, {currentUser.name.split(' ')[0]} 👋
            </h2>
          </div>

          <div
            onClick={() => navigateTo('customer_profile')}
            className="w-10 h-10 rounded-full bg-[#16834A] text-white flex items-center justify-center font-bold text-sm shadow-xs border-2 border-white cursor-pointer"
          >
            {currentUser.name.charAt(0)}
          </div>
        </div>

        {/* 2. Search Bar */}
        <div
          onClick={() => navigateTo('search')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-neutral-200/90 shadow-xs cursor-pointer hover:border-[#16834A]/50 transition-all"
        >
          <Search className="w-4 h-4 text-[#16834A] stroke-[2.5]" />
          <span className="text-xs text-neutral-400 font-medium">
            Search shops, tong tea, fuchka, rice...
          </span>
          <div className="ml-auto w-7 h-7 rounded-lg bg-[#E8F5EC] flex items-center justify-center text-[#16834A]">
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
          </div>
        </div>

        {/* 3. Radius Selection Filter */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-neutral-700">Discovery Radius:</span>
            <span className="font-semibold text-[#16834A]">
              {filteredBusinesses.length} places found
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 bg-neutral-100/80 p-1 rounded-xl">
            {([500, 1000, 3000, 5000] as RadiusFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRadiusFilter(r)}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  radiusFilter === r
                    ? 'bg-[#16834A] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {r < 1000 ? `${r}m` : `${r / 1000}km`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Live Street Vendors Section (Active Check-In Broadcast) */}
      {liveVendors.length > 0 && (
        <div className="px-5 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F43] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF9F43]" />
              </span>
              <h3 className="text-xs font-black tracking-wide uppercase text-[#202124]">
                Selling Here Today (Live Vendors)
              </h3>
            </div>
            <button
              onClick={() => navigateTo('map_view')}
              className="text-[11px] font-bold text-[#16834A] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View Map</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {liveVendors.map((vendor) => (
              <div
                key={vendor.id}
                onClick={() => handleBusinessClick(vendor)}
                className="w-64 shrink-0 rounded-2xl bg-gradient-to-br from-[#FFF8EE] to-[#FFF2E2] border border-[#FF9F43]/30 p-3 shadow-xs cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#FF9F43] text-white text-[9px] font-black tracking-wider flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5" />
                    LIVE NOW
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium truncate">
                    Expires: {vendor.checkInExpiresAt || 'Today'}
                  </span>
                </div>
                <h4 className="font-bold text-[#202124] text-xs truncate">{vendor.name}</h4>
                <p className="text-[11px] text-neutral-600 truncate mt-0.5">
                  📍 {vendor.checkInLocation || vendor.address}
                </p>
                <div className="mt-2 pt-2 border-t border-[#FF9F43]/20 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#16834A]">
                    {vendor.distanceMeters}m away
                  </span>
                  <span className="text-[#FF9F43] font-bold">Inspect Stall →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Category Icons Grid */}
      <div className="px-5 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-sm font-bold text-[#202124]">Categories</h3>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs font-bold text-[#16834A] hover:underline cursor-pointer"
          >
            See All ({INITIAL_CATEGORIES.length})
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {INITIAL_CATEGORIES.slice(0, 8).map((cat) => {
            const Icon = getCategoryIconComponent(cat.name);
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCategory('All');
                  } else {
                    setSelectedCategory(cat.name);
                    navigateTo('nearby_list');
                  }
                }}
                className="flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer group hover:bg-[#E8F5EC]/50"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#16834A] text-white shadow-md'
                      : 'bg-[#F2F7F4] text-[#16834A] group-hover:bg-[#E8F5EC]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-semibold text-neutral-700 text-center mt-1.5 line-clamp-1 leading-tight">
                  {cat.name.replace('& Tong', '').replace('& Snacks', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Nearby Businesses List Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-[#202124]">
              {selectedCategory === 'All' ? 'Nearby Places' : `${selectedCategory}`}
            </h3>
            <p className="text-[11px] text-neutral-500">
              Within {radiusFilter < 1000 ? `${radiusFilter}m` : `${radiusFilter / 1000}km`} radius
            </p>
          </div>

          <button
            onClick={() => navigateTo('nearby_list')}
            className="text-xs font-bold text-[#16834A] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Business Cards Feed */}
        {filteredBusinesses.length === 0 ? (
          <div className="py-8 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
            <Store className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-neutral-600">No businesses in this radius</p>
            <p className="text-[11px] text-neutral-400 mt-1">
              Try expanding your radius to 3km or 5km
            </p>
            <button
              onClick={() => setRadiusFilter(5000)}
              className="mt-3 px-3 py-1.5 rounded-xl bg-[#16834A] text-white text-xs font-bold"
            >
              Set Radius to 5km
            </button>
          </div>
        ) : (
          <div className="space-y-3.5 pb-6">
            {filteredBusinesses.map((b) => {
              const bookmarked = isBookmarked(b.id);
              return (
                <div
                  key={b.id}
                  onClick={() => handleBusinessClick(b)}
                  className="rounded-2xl border border-neutral-200/80 bg-white p-3 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex gap-3">
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                      <img
                        src={b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300'}
                        alt={b.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span
                        className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
                          b.isOpen ? 'bg-[#16834A] text-white' : 'bg-neutral-800 text-white'
                        }`}
                      >
                        {b.isOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] font-bold text-[#16834A] uppercase tracking-wider bg-[#E8F5EC] px-2 py-0.5 rounded-full">
                            {b.category}
                          </span>
                          <h4 className="font-bold text-[#202124] text-xs mt-1 truncate group-hover:text-[#16834A] transition-colors">
                            {b.name}
                          </h4>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(b.id);
                          }}
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
                            bookmarked
                              ? 'bg-[#E8F5EC] text-[#16834A]'
                              : 'text-neutral-400 hover:text-neutral-600'
                          }`}
                          title={bookmarked ? 'Saved' : 'Save business'}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${bookmarked ? 'fill-[#16834A]' : ''}`}
                          />
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">{b.address}</p>

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold text-neutral-600">
                        <span className="text-[#16834A] font-bold">
                          {b.distanceMeters < 1000
                            ? `${b.distanceMeters}m away`
                            : `${(b.distanceMeters / 1000).toFixed(1)}km away`}
                        </span>
                        <span className="flex items-center gap-0.5 text-neutral-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {b.rating}
                        </span>
                        <span className="text-neutral-400 font-normal">
                          {b.openingTime} - {b.closingTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Previews pill list */}
                  {b.products && b.products.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight shrink-0">
                        Products:
                      </span>
                      {b.products.slice(0, 3).map((p) => (
                        <span
                          key={p.id}
                          className="shrink-0 text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-lg flex items-center gap-1"
                        >
                          <span>{p.name}</span>
                          <strong className="text-[#16834A]">৳{p.price}</strong>
                        </span>
                      ))}
                      {b.products.length > 3 && (
                        <span className="text-[10px] text-neutral-400 font-semibold shrink-0">
                          +{b.products.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
