import React, { useState } from 'react';
import {
  Store,
  Edit,
  Trash2,
  Eye,
  Clock,
  Phone,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';
import { Business, BusinessCategory } from '../../types/nearme';
import { INITIAL_CATEGORIES } from '../../data/mockData';
import { BusinessDetailsScreen } from '../customer/BusinessDetailsScreen';

// ============================================
// 1. BUSINESS PROFILE SCREEN
// ============================================
export const BusinessProfileScreen: React.FC = () => {
  const {
    ownerBusiness,
    navigateTo,
    setCurrentBusiness,
    deleteBusiness,
  } = useNearMe();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!ownerBusiness) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
        <Store className="w-12 h-12 text-neutral-300 mb-2" />
        <h3 className="text-sm font-bold text-neutral-700">No Business Registered</h3>
        <button
          onClick={() => navigateTo('owner_add_business')}
          className="mt-3 px-4 py-2 rounded-xl bg-[#16834A] text-white text-xs font-bold"
        >
          Add Business
        </button>
      </div>
    );
  }

  const b = ownerBusiness;

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      {/* Business Header Card */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-200">
        <img
          src={b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'}
          alt={b.name}
          className="w-full h-36 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5EC] text-[#16834A]">
              {b.category}
            </span>
            <h2 className="text-lg font-black text-white mt-1 leading-tight">{b.name}</h2>
            <p className="text-xs text-white/80">{b.address}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigateTo('owner_edit_business')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#16834A] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#0E5E34] transition-all cursor-pointer shadow-xs"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Edit Business Profile</span>
        </button>
        <button
          onClick={() => {
            setCurrentBusiness(b);
            navigateTo('owner_business_preview');
          }}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#E8F5EC] text-[#16834A] border border-[#16834A]/30 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#d5eedd] transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview as Customer</span>
        </button>
      </div>

      {/* Specifications */}
      <div className="p-4 rounded-2xl border border-neutral-200 bg-white space-y-3 text-xs">
        <h3 className="font-bold text-[#202124] border-b border-neutral-100 pb-2">
          Business Details
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500 font-medium">Contact Phone:</span>
          <span className="font-semibold text-neutral-800">{b.contactNumber}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500 font-medium">Opening Hours:</span>
          <span className="font-semibold text-neutral-800">
            {b.openingTime} – {b.closingTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-neutral-500 font-medium">Mock Coordinates:</span>
          <span className="font-mono text-neutral-600 text-[11px]">
            {b.latitude.toFixed(4)}° N, {b.longitude.toFixed(4)}° E
          </span>
        </div>

        <div className="flex items-start justify-between pt-1 border-t border-neutral-100">
          <span className="text-neutral-500 font-medium shrink-0 mr-2">Description:</span>
          <span className="text-neutral-700 text-right leading-relaxed">{b.description}</span>
        </div>
      </div>

      {/* Products Inventory Quick Link */}
      <div
        onClick={() => navigateTo('owner_manage_products')}
        className="p-3.5 rounded-2xl border border-neutral-200 bg-[#E8F5EC]/30 flex items-center justify-between hover:border-[#16834A] transition-all cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-[#16834A]" />
          <div>
            <h4 className="text-xs font-bold text-[#202124]">
              Manage Product Catalog ({b.products.length})
            </h4>
            <p className="text-[11px] text-neutral-500">Add, edit, or toggle in-stock items</p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-400" />
      </div>

      {/* Delete Business Option with Confirmation */}
      <div className="pt-2">
        {showDeleteConfirm ? (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Confirm Delete Business?</span>
            </div>
            <p className="text-[11px] text-neutral-600">
              Are you sure you want to remove <strong>"{b.name}"</strong>? This will remove all
              associated products.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  deleteBusiness(b.id);
                  setShowDeleteConfirm(false);
                  navigateTo('owner_dashboard');
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white font-bold text-xs cursor-pointer hover:bg-red-700"
              >
                Yes, Delete Business
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 rounded-xl bg-white border border-neutral-300 font-semibold text-xs text-neutral-700 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-2.5 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Business Profile</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// 2. ADD BUSINESS SCREEN
// ============================================
export const AddBusinessScreen: React.FC = () => {
  const { addBusiness, navigateTo } = useNearMe();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('Grocery');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('+880 1711-');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Dhanmondi, Dhaka');
  const [latitude, setLatitude] = useState('23.7508');
  const [longitude, setLongitude] = useState('90.3780');
  const [openingTime, setOpeningTime] = useState('08:00 AM');
  const [closingTime, setClosingTime] = useState('10:00 PM');
  const [isStreetVendor, setIsStreetVendor] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a business name');
      return;
    }
    if (!address.trim()) {
      setError('Please provide an address');
      return;
    }
    setError('');

    const newBiz = addBusiness({
      name,
      category,
      description,
      contactNumber,
      address,
      area,
      latitude: parseFloat(latitude) || 23.75,
      longitude: parseFloat(longitude) || 90.38,
      openingTime,
      closingTime,
      isStreetVendor,
      isOpen: true,
    });

    navigateTo('owner_dashboard');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8">
      <div className="mb-4">
        <h2 className="text-lg font-black text-[#202124]">Register New Business</h2>
        <p className="text-xs text-neutral-500">
          List your shop, restaurant, or mobile food cart on NearMe
        </p>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Business Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Bhai Bhai General Store"
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as BusinessCategory)}
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A] bg-white font-medium"
          >
            {INITIAL_CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell customers what products you specialize in..."
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Contact Number *</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="+880 1711-234567"
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Area / Neighborhood</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Dhanmondi, Dhaka"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Full Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Road 27, House 12"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
            />
          </div>
        </div>

        {/* Mock Coordinates */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Opening Time</label>
            <input
              type="text"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              placeholder="08:00 AM"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Closing Time</label>
            <input
              type="text"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              placeholder="11:00 PM"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
        </div>

        {/* Mobile Street Vendor Toggle */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
          <input
            type="checkbox"
            id="streetVendorCheck"
            checked={isStreetVendor}
            onChange={(e) => setIsStreetVendor(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
          <label htmlFor="streetVendorCheck" className="text-xs font-bold text-neutral-800 cursor-pointer">
            This is a Mobile Street Vendor / Food Cart
            <span className="block text-[10px] text-neutral-500 font-normal">
              Enables "I'm Selling Here Today" live location broadcasts.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs hover:bg-[#0E5E34] transition-all shadow-md cursor-pointer"
        >
          Save & Register Business
        </button>
      </form>
    </div>
  );
};

// ============================================
// 3. EDIT BUSINESS SCREEN
// ============================================
export const EditBusinessScreen: React.FC = () => {
  const { ownerBusiness, updateBusiness, navigateTo } = useNearMe();

  const b = ownerBusiness;

  const [name, setName] = useState(b?.name || '');
  const [category, setCategory] = useState<BusinessCategory>(b?.category || 'Grocery');
  const [description, setDescription] = useState(b?.description || '');
  const [contactNumber, setContactNumber] = useState(b?.contactNumber || '');
  const [address, setAddress] = useState(b?.address || '');
  const [area, setArea] = useState(b?.area || '');
  const [latitude, setLatitude] = useState(b?.latitude.toString() || '23.75');
  const [longitude, setLongitude] = useState(b?.longitude.toString() || '90.38');
  const [openingTime, setOpeningTime] = useState(b?.openingTime || '08:00 AM');
  const [closingTime, setClosingTime] = useState(b?.closingTime || '11:00 PM');
  const [isStreetVendor, setIsStreetVendor] = useState(b?.isStreetVendor ?? false);

  if (!b) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness(b.id, {
      name,
      category,
      description,
      contactNumber,
      address,
      area,
      latitude: parseFloat(latitude) || b.latitude,
      longitude: parseFloat(longitude) || b.longitude,
      openingTime,
      closingTime,
      isStreetVendor,
    });
    navigateTo('owner_dashboard');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8">
      <div className="mb-4">
        <h2 className="text-lg font-black text-[#202124]">Edit Business Profile</h2>
        <p className="text-xs text-neutral-500">Update business information and schedule</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Business Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as BusinessCategory)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white"
          >
            {INITIAL_CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Contact Phone</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Opening Time</label>
            <input
              type="text"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Closing Time</label>
            <input
              type="text"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
          <input
            type="checkbox"
            id="editStreetVendor"
            checked={isStreetVendor}
            onChange={(e) => setIsStreetVendor(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
          <label htmlFor="editStreetVendor" className="text-xs font-bold text-neutral-800">
            Street Vendor / Mobile Stall Mode
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs hover:bg-[#0E5E34] transition-all cursor-pointer shadow-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigateTo('owner_dashboard')}
            className="py-3 px-4 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================
// 4. BUSINESS PREVIEW SCREEN
// ============================================
export const BusinessPreviewScreen: React.FC = () => {
  const { navigateTo } = useNearMe();

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden select-none">
      <div className="bg-[#16834A] text-white px-4 py-2 flex items-center justify-between text-xs font-bold z-10 shadow-xs">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          <span>Customer View Preview (Live Simulator)</span>
        </div>
        <button
          onClick={() => navigateTo('owner_dashboard')}
          className="text-[10px] bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full cursor-pointer"
        >
          Exit Preview
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <BusinessDetailsScreen />
      </div>
    </div>
  );
};
