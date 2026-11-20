import React, { useState } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  MapPin,
  Star,
  Clock,
  Bookmark,
  Store,
  UtensilsCrossed,
  Coffee,
  HeartPulse,
  Cake,
  Bike,
  Apple,
  Carrot,
  Fish,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { Business, BusinessCategory, RadiusFilter } from '../../types/nearme';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Grocery':
      return Store;
    case 'Street Food':
      return UtensilsCrossed;
    case 'Tea Stall & Tong':
      return Coffee;
    case 'Bakery & Snacks':
      return Cake;
    case 'Fresh Fruits':
      return Apple;
    case 'Vegetables':
      return Carrot;
    case 'Meat & Fish':
      return Fish;
    case 'Pharmacy':
      return HeartPulse;
    default:
      return Bike;
  }
};

// ============================================
// 1. SEARCH BUSINESSES SCREEN
// ============================================
export const SearchBusinessesScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    radiusFilter,
    setRadiusFilter,
    filteredBusinesses,
    setCurrentBusiness,
    navigateTo,
    isBookmarked,
    toggleBookmark,
  } = useNearMe();

  const suggestions = [
    'Tong Tea',
    'Fuchka',
    'Miniket Rice',
    'Beef Tehari',
    'Paracetamol',
    'Fresh Milk',
    'Organic Vegetables',
    'Bakarkhani',
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none">
      {/* Search Input Bar */}
      <div className="p-4 border-b border-neutral-100 bg-[#E8F5EC]/40">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#16834A] absolute left-3.5 stroke-[2.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores, stalls, products (e.g. cha, rice)..."
            autoFocus
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs font-medium focus:outline-none focus:border-[#16834A] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips Horizontal Scroll */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto scrollbar-none pb-0.5">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#16834A] text-white shadow-xs'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            All Categories
          </button>
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#16834A] text-white shadow-xs'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Radius filter toggle */}
        <div className="flex items-center justify-between mt-2.5 text-[11px]">
          <span className="font-semibold text-neutral-500">Radius:</span>
          <div className="flex gap-1">
            {([500, 1000, 3000, 5000] as RadiusFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRadiusFilter(r)}
                className={`px-2 py-0.5 rounded-md font-bold text-[10px] cursor-pointer ${
                  radiusFilter === r
                    ? 'bg-[#16834A] text-white'
                    : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                {r < 1000 ? `${r}m` : `${r / 1000}km`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Suggestions if no search query */}
      {!searchQuery && (
        <div className="p-4 border-b border-neutral-100">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Trending Searches in Dhaka
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setSearchQuery(s)}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-medium hover:bg-[#E8F5EC] hover:text-[#16834A] transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-neutral-700">
            {filteredBusinesses.length} results matching criteria
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-[#16834A] font-semibold hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredBusinesses.length === 0 ? (
          <div className="py-12 text-center text-neutral-400">
            <Search className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
            <p className="text-xs font-bold text-neutral-600">No matching places or products</p>
            <p className="text-[11px] mt-1">Try another keyword or increase the radius filter</p>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {filteredBusinesses.map((b) => {
              const bookmarked = isBookmarked(b.id);
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setCurrentBusiness(b);
                    navigateTo('business_detail');
                  }}
                  className="p-3 rounded-2xl border border-neutral-200/90 hover:border-[#16834A] transition-all cursor-pointer bg-white shadow-xs group"
                >
                  <div className="flex gap-3">
                    <img
                      src={b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300'}
                      alt={b.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-[#16834A] uppercase bg-[#E8F5EC] px-2 py-0.5 rounded-full">
                          {b.category}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(b.id);
                          }}
                          className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                            bookmarked ? 'text-[#16834A]' : 'text-neutral-400'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#16834A]' : ''}`} />
                        </button>
                      </div>

                      <h4 className="font-bold text-neutral-900 text-xs truncate mt-1 group-hover:text-[#16834A]">
                        {b.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 truncate">{b.address}</p>

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-medium text-neutral-600">
                        <span className="text-[#16834A] font-bold">
                          {b.distanceMeters < 1000
                            ? `${b.distanceMeters}m`
                            : `${(b.distanceMeters / 1000).toFixed(1)}km`}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {b.rating}
                        </span>
                        <span className={`text-[10px] font-bold ${b.isOpen ? 'text-[#16834A]' : 'text-neutral-400'}`}>
                          {b.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 2. CATEGORY SELECTION SCREEN
// ============================================
export const CategorySelectionScreen: React.FC = () => {
  const { setSelectedCategory, navigateTo, businesses } = useNearMe();

  const getBusinessCountByCategory = (category: BusinessCategory) => {
    return businesses.filter((b) => b.category === category).length;
  };

  return (
    <div className="w-full h-full bg-white flex flex-col p-4 overflow-y-auto select-none">
      <div className="mb-4">
        <h2 className="text-xl font-black text-[#202124]">All Categories</h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Explore local businesses and mobile carts by domain
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 pb-6">
        {INITIAL_CATEGORIES.map((cat) => {
          const Icon = getCategoryIcon(cat.name);
          const count = getBusinessCountByCategory(cat.name);

          return (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                navigateTo('nearby_list');
              }}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-neutral-200/80 hover:border-[#16834A] hover:bg-[#E8F5EC]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5EC] text-[#16834A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#202124] group-hover:text-[#16834A] transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                  {count} places
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#16834A]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// 3. NEARBY BUSINESSES LIST SCREEN
// ============================================
export const NearbyBusinessesScreen: React.FC = () => {
  const {
    filteredBusinesses,
    selectedCategory,
    setSelectedCategory,
    setCurrentBusiness,
    navigateTo,
    radiusFilter,
    setRadiusFilter,
    isBookmarked,
    toggleBookmark,
  } = useNearMe();

  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'name'>('distance');
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [filterVendorOnly, setFilterVendorOnly] = useState(false);

  const sortedBusinesses = [...filteredBusinesses]
    .filter((b) => (!filterOpenOnly || b.isOpen) && (!filterVendorOnly || b.isStreetVendor))
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distanceMeters - b.distanceMeters;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none">
      {/* Top Filter & Sort Bar */}
      <div className="p-4 border-b border-neutral-100 bg-[#E8F5EC]/30">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-bold text-[#202124]">
              {selectedCategory === 'All' ? 'Nearby Directory' : selectedCategory}
            </h2>
            <p className="text-[11px] text-neutral-500">
              {sortedBusinesses.length} active places within {radiusFilter < 1000 ? `${radiusFilter}m` : `${radiusFilter / 1000}km`}
            </p>
          </div>

          <button
            onClick={() => navigateTo('map_view')}
            className="px-3 py-1.5 rounded-xl bg-[#16834A] text-white text-xs font-semibold hover:bg-[#0E5E34] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            onClick={() => setFilterOpenOnly(!filterOpenOnly)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              filterOpenOnly
                ? 'bg-[#16834A] text-white border-[#16834A]'
                : 'bg-white text-neutral-700 border-neutral-200'
            }`}
          >
            Open Now Only
          </button>
          <button
            onClick={() => setFilterVendorOnly(!filterVendorOnly)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              filterVendorOnly
                ? 'bg-[#FF9F43] text-white border-[#FF9F43]'
                : 'bg-white text-neutral-700 border-neutral-200'
            }`}
          >
            Street Vendors Only
          </button>

          {/* Sort Selection */}
          <div className="ml-auto flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-neutral-200 rounded-lg px-2 py-0.5 text-neutral-800 text-xs font-semibold focus:outline-none"
            >
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-3.5 pb-8">
        {sortedBusinesses.length === 0 ? (
          <div className="py-12 text-center text-neutral-400">
            <Filter className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
            <p className="text-xs font-bold text-neutral-600">No places match active filters</p>
            <button
              onClick={() => {
                setFilterOpenOnly(false);
                setFilterVendorOnly(false);
                setSelectedCategory('All');
              }}
              className="mt-3 px-3 py-1.5 rounded-xl bg-[#16834A] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          sortedBusinesses.map((b) => {
            const bookmarked = isBookmarked(b.id);
            return (
              <div
                key={b.id}
                onClick={() => {
                  setCurrentBusiness(b);
                  navigateTo('business_detail');
                }}
                className="p-3.5 rounded-2xl border border-neutral-200/90 bg-white hover:border-[#16834A] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex gap-3.5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                    <img
                      src={b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300'}
                      alt={b.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {b.isCheckInActive && (
                      <span className="absolute top-1 left-1 px-1 rounded bg-[#FF9F43] text-white text-[8px] font-black">
                        LIVE
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold text-[#16834A] uppercase bg-[#E8F5EC] px-2 py-0.5 rounded-full">
                        {b.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(b.id);
                        }}
                        className={`w-6 h-6 flex items-center justify-center cursor-pointer ${
                          bookmarked ? 'text-[#16834A]' : 'text-neutral-400'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#16834A]' : ''}`} />
                      </button>
                    </div>

                    <h4 className="font-bold text-[#202124] text-xs mt-1 truncate group-hover:text-[#16834A]">
                      {b.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 truncate">{b.address}</p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold text-neutral-600">
                      <span className="text-[#16834A] font-bold">
                        {b.distanceMeters < 1000
                          ? `${b.distanceMeters}m away`
                          : `${(b.distanceMeters / 1000).toFixed(1)}km away`}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {b.rating} ({b.reviewCount})
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          b.isOpen ? 'text-[#16834A]' : 'text-neutral-400'
                        }`}
                      >
                        {b.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  </div>
                </div>

                {b.products && b.products.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center gap-2 text-[10px] text-neutral-500 overflow-x-auto scrollbar-none">
                    <span className="font-bold text-neutral-400 uppercase">Featured:</span>
                    {b.products.slice(0, 3).map((p) => (
                      <span key={p.id} className="bg-neutral-50 px-2 py-0.5 rounded-md text-neutral-700">
                        {p.name} <strong className="text-[#16834A]">৳{p.price}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
