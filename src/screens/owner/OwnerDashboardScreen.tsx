import React from 'react';
import {
  Store,
  Radio,
  Package,
  PlusCircle,
  Eye,
  Edit,
  Clock,
  Phone,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';

export const OwnerDashboardScreen: React.FC = () => {
  const {
    ownerBusiness,
    vendorCheckIn,
    navigateTo,
    setCurrentBusiness,
    updateBusiness,
    showSnackbar,
  } = useNearMe();

  if (!ownerBusiness) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <Store className="w-12 h-12 text-neutral-300 mb-2" />
        <h3 className="text-sm font-bold text-neutral-700">No Business Registered Yet</h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs">
          Register your shop or mobile street cart to start receiving customers.
        </p>
        <button
          onClick={() => navigateTo('owner_add_business')}
          className="mt-4 px-4 py-2.5 rounded-xl bg-[#16834A] text-white text-xs font-bold cursor-pointer"
        >
          + Add Your Business
        </button>
      </div>
    );
  }

  const b = ownerBusiness;

  const toggleBusinessOpenStatus = () => {
    updateBusiness(b.id, { isOpen: !b.isOpen });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      {/* 1. Header with Status Toggle */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#E8F5EC] to-[#F7FCF9] border border-[#16834A]/20 shadow-xs">
        <div className="flex items-start justify-between">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-bold text-[#16834A] uppercase bg-white px-2 py-0.5 rounded-full border border-[#16834A]/20">
              {b.category}
            </span>
            <h2 className="text-lg font-black text-[#202124] truncate mt-1">{b.name}</h2>
            <p className="text-xs text-neutral-500 truncate mt-0.5">{b.address}</p>
          </div>

          {/* Open/Close status button */}
          <button
            onClick={toggleBusinessOpenStatus}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 ${
              b.isOpen
                ? 'bg-[#16834A] text-white hover:bg-[#0E5E34]'
                : 'bg-neutral-800 text-white hover:bg-neutral-900'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${b.isOpen ? 'bg-emerald-300 animate-pulse' : 'bg-neutral-400'}`}
            />
            <span>{b.isOpen ? 'Store Open' : 'Store Closed'}</span>
          </button>
        </div>

        {/* Quick business stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#16834A]/10 text-center">
          <div className="bg-white/80 p-2 rounded-xl">
            <span className="text-[10px] text-neutral-400 font-semibold block">Products</span>
            <span className="text-base font-black text-[#16834A]">{b.products.length}</span>
          </div>
          <div className="bg-white/80 p-2 rounded-xl">
            <span className="text-[10px] text-neutral-400 font-semibold block">Rating</span>
            <span className="text-base font-black text-[#202124] flex items-center justify-center gap-0.5">
              ★ {b.rating}
            </span>
          </div>
          <div className="bg-white/80 p-2 rounded-xl">
            <span className="text-[10px] text-neutral-400 font-semibold block">Status</span>
            <span className="text-xs font-bold text-[#16834A] block mt-0.5">
              {b.isOpen ? 'Active' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Vendor Check-in Callout Card ("I'm Selling Here Today") */}
      <div
        onClick={() => navigateTo('vendor_checkin')}
        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative shadow-xs ${
          vendorCheckIn.isActive
            ? 'bg-gradient-to-r from-[#FFF5EB] to-[#FFF0DD] border-[#FF9F43]'
            : 'bg-[#F9FAF9] border-dashed border-neutral-300 hover:border-[#16834A]'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                vendorCheckIn.isActive
                  ? 'bg-[#FF9F43] text-white shadow-sm'
                  : 'bg-[#E8F5EC] text-[#16834A]'
              }`}
            >
              <Radio className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#202124]">
                  Vendor Live Check-In
                </h3>
                {vendorCheckIn.isActive && (
                  <span className="px-1.5 py-0.2 rounded bg-[#FF9F43] text-white text-[9px] font-black animate-pulse">
                    BROADCASTING
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-neutral-700 mt-0.5">
                {vendorCheckIn.isActive
                  ? 'Active: Selling Here Today!'
                  : 'Announce Your Street Spot Today'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-neutral-400 mt-1" />
        </div>

        {vendorCheckIn.isActive ? (
          <div className="mt-3 pt-2 border-t border-[#FF9F43]/30 text-xs text-neutral-700 space-y-1">
            <p className="truncate">
              📍 <strong>Location:</strong> {vendorCheckIn.currentAddress}
            </p>
            <p className="text-[11px] text-neutral-500">
              Active until <strong>{vendorCheckIn.expiresAt}</strong> • Visible to customers on Map
            </p>
          </div>
        ) : (
          <p className="text-[11px] text-neutral-500 mt-2">
            Perfect for mobile tea tongs, puchka vans, and roadside stalls to inform customers of your exact spot.
          </p>
        )}
      </div>

      {/* 3. Quick Action Buttons Grid */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-2.5">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => navigateTo('owner_add_product')}
            className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#16834A] hover:bg-[#E8F5EC]/20 transition-all flex items-center gap-3 text-left cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EC] text-[#16834A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Add Product</h4>
              <p className="text-[10px] text-neutral-500">Post item & price in ৳</p>
            </div>
          </button>

          <button
            onClick={() => navigateTo('owner_manage_products')}
            className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#16834A] hover:bg-[#E8F5EC]/20 transition-all flex items-center gap-3 text-left cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EC] text-[#16834A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Inventory</h4>
              <p className="text-[10px] text-neutral-500">{b.products.length} products listed</p>
            </div>
          </button>

          <button
            onClick={() => navigateTo('owner_edit_business')}
            className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#16834A] hover:bg-[#E8F5EC]/20 transition-all flex items-center gap-3 text-left cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Edit className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Edit Details</h4>
              <p className="text-[10px] text-neutral-500">Hours, contact & info</p>
            </div>
          </button>

          <button
            onClick={() => {
              setCurrentBusiness(b);
              navigateTo('owner_business_preview');
            }}
            className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#16834A] hover:bg-[#E8F5EC]/20 transition-all flex items-center gap-3 text-left cursor-pointer shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Eye className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#202124]">Customer View</h4>
              <p className="text-[10px] text-neutral-500">Preview public page</p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Business Information Summary Card */}
      <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-2.5 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <h3 className="font-bold text-[#202124]">Business Information</h3>
          <button
            onClick={() => navigateTo('owner_edit_business')}
            className="text-[11px] font-bold text-[#16834A] hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500 font-medium">Contact Number:</span>
          <span className="font-semibold text-neutral-800">{b.contactNumber}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500 font-medium">Operating Hours:</span>
          <span className="font-semibold text-neutral-800">
            {b.openingTime} – {b.closingTime}
          </span>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-neutral-500 font-medium shrink-0 mr-2">Address:</span>
          <span className="font-semibold text-neutral-800 text-right">{b.address}</span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
          <span className="text-neutral-500 font-medium">Vendor Type:</span>
          <span className="font-bold text-[#16834A]">
            {b.isStreetVendor ? 'Mobile Street Vendor' : 'Fixed Retail Store'}
          </span>
        </div>
      </div>
    </div>
  );
};
