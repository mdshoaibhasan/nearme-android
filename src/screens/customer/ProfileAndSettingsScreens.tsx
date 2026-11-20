import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Bookmark,
  Settings,
  LogOut,
  RefreshCw,
  Globe,
  Bell,
  Trash2,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';

export const CustomerProfileScreen: React.FC = () => {
  const {
    currentUser,
    userRole,
    toggleRole,
    logout,
    savedBusinessIds,
    businesses,
    setCurrentBusiness,
    navigateTo,
    setIsCodeInspectorOpen,
  } = useNearMe();

  const savedBusinesses = businesses.filter((b) => savedBusinessIds.includes(b.id));

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      {/* Profile Header Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#E8F5EC] to-white border border-[#16834A]/20 flex items-center gap-3.5 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#16834A] text-white flex items-center justify-center font-black text-2xl shadow-sm border-2 border-white">
          {currentUser.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-[#202124] truncate">{currentUser.name}</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16834A] text-white">
              Customer
            </span>
          </div>
          <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-[#16834A]" />
            <span>{currentUser.phone}</span>
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
            <Mail className="w-3 h-3 text-[#16834A]" />
            <span className="truncate">{currentUser.email}</span>
          </p>
        </div>
      </div>

      {/* Switch to Business Owner Mode Promo Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF8EE] to-[#FFF0DD] border border-[#FF9F43]/30 flex items-center justify-between shadow-xs">
        <div>
          <h4 className="text-xs font-bold text-[#202124]">Do you run a shop or food stall?</h4>
          <p className="text-[11px] text-neutral-600 mt-0.5">
            Switch to Owner Mode to post products & broadcast live spots.
          </p>
        </div>
        <button
          onClick={toggleRole}
          className="px-3 py-1.5 rounded-xl bg-[#FF9F43] text-white text-xs font-bold hover:bg-[#E68A2E] transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Switch Mode</span>
        </button>
      </div>

      {/* Saved / Bookmarked Places */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-[#16834A] fill-[#16834A]" />
            <span>Saved Places ({savedBusinesses.length})</span>
          </h3>
          <span className="text-[11px] text-neutral-400">Tap to view</span>
        </div>

        {savedBusinesses.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-neutral-200 text-center text-xs text-neutral-400">
            No saved places yet. Click the bookmark icon on any store to save it here.
          </div>
        ) : (
          <div className="space-y-2">
            {savedBusinesses.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  setCurrentBusiness(b);
                  navigateTo('business_detail');
                }}
                className="p-3 rounded-xl border border-neutral-200 hover:border-[#16834A] transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={b.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200'}
                    alt={b.name}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-neutral-900 truncate">{b.name}</h5>
                    <p className="text-[10px] text-neutral-500 truncate">
                      {b.category} • {b.area}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-[#16834A]">
                    {b.distanceMeters < 1000
                      ? `${b.distanceMeters}m`
                      : `${(b.distanceMeters / 1000).toFixed(1)}km`}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Settings & Quick Links */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => navigateTo('customer_settings')}
          className="w-full p-3 rounded-xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-neutral-500" />
            <span>App Settings & Language</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>

        <button
          onClick={() => setIsCodeInspectorOpen(true)}
          className="w-full p-3 rounded-xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Code2 className="w-4 h-4 text-[#16834A]" />
            <span>View Native Kotlin Jetpack Compose Code</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F5EC] text-[#16834A]">
            Android Studio
          </span>
        </button>

        <button
          onClick={logout}
          className="w-full p-3 rounded-xl border border-red-200 text-red-600 flex items-center justify-between hover:bg-red-50 transition-colors text-xs font-semibold cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4" />
            <span>Sign Out of NearMe</span>
          </div>
        </button>
      </div>

      {/* University Project Badge */}
      <div className="p-3 rounded-xl bg-neutral-100 text-neutral-600 text-[11px] flex items-center gap-2.5">
        <GraduationCap className="w-5 h-5 text-[#16834A] shrink-0" />
        <div>
          <strong>NearMe Phase 1 Android Prototype</strong>
          <p className="text-[10px] text-neutral-500">
            Final-Semester University Software Engineering Project • MVVM Pattern
          </p>
        </div>
      </div>
    </div>
  );
};

export const CustomerSettingsScreen: React.FC = () => {
  const { showSnackbar } = useNearMe();
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [highAccuracyGps, setHighAccuracyGps] = useState(true);

  const handleClearCache = () => {
    showSnackbar('Local session cache cleared successfully.', 'info');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      <div>
        <h2 className="text-lg font-black text-[#202124]">Settings & Preferences</h2>
        <p className="text-xs text-neutral-500">Configure app behavior and localization</p>
      </div>

      {/* Language Selection */}
      <div className="p-4 rounded-2xl border border-neutral-200 space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#16834A]" />
          <h3 className="text-xs font-bold text-[#202124]">Application Language</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setLanguage('en');
              showSnackbar('Language set to English');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-[#16834A] text-white border-[#16834A]'
                : 'bg-white text-neutral-700 border-neutral-200'
            }`}
          >
            English (Default)
          </button>
          <button
            onClick={() => {
              setLanguage('bn');
              showSnackbar('ভাষা বাংলা নির্বাচন করা হয়েছে');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              language === 'bn'
                ? 'bg-[#16834A] text-white border-[#16834A]'
                : 'bg-white text-neutral-700 border-neutral-200'
            }`}
          >
            বাংলা (Bengali)
          </button>
        </div>
      </div>

      {/* Discovery & Location Settings */}
      <div className="p-4 rounded-2xl border border-neutral-200 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#16834A]" />
          <h3 className="text-xs font-bold text-[#202124]">Location Preferences</h3>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <div>
            <span className="font-semibold text-neutral-800">High Accuracy Mock GPS</span>
            <p className="text-[10px] text-neutral-500">Fine-grain street coordinates (Phase 1)</p>
          </div>
          <input
            type="checkbox"
            checked={highAccuracyGps}
            onChange={(e) => setHighAccuracyGps(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
        </div>

        <div className="flex items-center justify-between text-xs py-1 border-t border-neutral-100">
          <div>
            <span className="font-semibold text-neutral-800">Vendor Live Alerts</span>
            <p className="text-[10px] text-neutral-500">Notify when street food carts check in nearby</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
        </div>
      </div>

      {/* Cache & Maintenance */}
      <div className="p-4 rounded-2xl border border-neutral-200 space-y-2.5">
        <h3 className="text-xs font-bold text-[#202124]">Storage & Maintenance</h3>
        <button
          onClick={handleClearCache}
          className="w-full py-2.5 px-3 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Local Session Storage</span>
        </button>
      </div>

      {/* University Architecture Notes */}
      <div className="p-4 rounded-2xl bg-[#E8F5EC]/60 border border-[#16834A]/30 space-y-2">
        <div className="flex items-center gap-2 text-[#16834A] font-bold text-xs">
          <GraduationCap className="w-4 h-4" />
          <span>University Project Architecture</span>
        </div>
        <p className="text-[11px] text-neutral-700 leading-relaxed">
          <strong>Phase 1 Deliverables:</strong> Native Jetpack Compose UI, Navigation Graph, MVVM
          Architecture, StateFlow/ViewModel simulation, Material 3 theming, Mock Bangladesh
          repository.
        </p>
        <p className="text-[11px] text-neutral-700 leading-relaxed">
          <strong>Phase 2 Roadmap:</strong> Firebase Auth (Phone OTP), Cloud Firestore real-time
          vendor stream, Google Maps SDK with custom pin clustering.
        </p>
      </div>
    </div>
  );
};
