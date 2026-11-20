import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Store,
  RefreshCw,
  Settings,
  LogOut,
  ChevronRight,
  GraduationCap,
  Bell,
  Radio,
  Code2,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';

export const OwnerProfileScreen: React.FC = () => {
  const {
    currentUser,
    ownerBusiness,
    toggleRole,
    logout,
    navigateTo,
    setIsCodeInspectorOpen,
  } = useNearMe();

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      {/* Profile Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#E8F5EC] to-white border border-[#16834A]/20 flex items-center gap-3.5 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#16834A] text-white flex items-center justify-center font-black text-2xl shadow-sm border-2 border-white">
          {currentUser.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-[#202124] truncate">{currentUser.name}</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF9F43] text-white">
              Owner
            </span>
          </div>
          <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
            <Phone className="w-3 h-3 text-[#16834A]" />
            <span>{currentUser.phone}</span>
          </p>
          <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
            <Store className="w-3 h-3 text-[#16834A]" />
            <span className="truncate">{ownerBusiness?.name || 'My Store'}</span>
          </p>
        </div>
      </div>

      {/* Switch to Customer Experience */}
      <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between shadow-2xs">
        <div>
          <h4 className="text-xs font-bold text-[#202124]">View Customer Experience</h4>
          <p className="text-[11px] text-neutral-500 mt-0.5">
            Discover other nearby vendors and testing discovery radius.
          </p>
        </div>
        <button
          onClick={toggleRole}
          className="px-3 py-1.5 rounded-xl bg-[#16834A] text-white text-xs font-bold hover:bg-[#0E5E34] transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Customer Mode</span>
        </button>
      </div>

      {/* Links */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => navigateTo('owner_business_profile')}
          className="w-full p-3 rounded-xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Store className="w-4 h-4 text-[#16834A]" />
            <span>Edit My Store / Cart Profile</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>

        <button
          onClick={() => navigateTo('owner_settings')}
          className="w-full p-3 rounded-xl border border-neutral-200 flex items-center justify-between hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Settings className="w-4 h-4 text-neutral-500" />
            <span>Merchant & Broadcast Settings</span>
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
            <span>Sign Out</span>
          </div>
        </button>
      </div>

      {/* University Project Info */}
      <div className="p-3 rounded-xl bg-neutral-100 text-neutral-600 text-[11px] flex items-center gap-2.5">
        <GraduationCap className="w-5 h-5 text-[#16834A] shrink-0" />
        <div>
          <strong>NearMe Business Portal</strong>
          <p className="text-[10px] text-neutral-500">
            University Final Year Project • Ready for Cloud Firestore sync in Phase 2
          </p>
        </div>
      </div>
    </div>
  );
};

export const OwnerSettingsScreen: React.FC = () => {
  const { showSnackbar } = useNearMe();
  const [autoNotify, setAutoNotify] = useState(true);
  const [keepSpotAlive, setKeepSpotAlive] = useState(false);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      <div>
        <h2 className="text-lg font-black text-[#202124]">Merchant Settings</h2>
        <p className="text-xs text-neutral-500">Configure your store visibility and radar</p>
      </div>

      <div className="p-4 rounded-2xl border border-neutral-200 space-y-3">
        <h3 className="text-xs font-bold text-[#202124] flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#FF9F43]" />
          <span>Broadcasting Preferences</span>
        </h3>

        <div className="flex items-center justify-between text-xs py-1">
          <div>
            <span className="font-semibold text-neutral-800">Auto-Alert Nearby Customers</span>
            <p className="text-[10px] text-neutral-500">
              Send mock push notification when starting a check-in
            </p>
          </div>
          <input
            type="checkbox"
            checked={autoNotify}
            onChange={(e) => setAutoNotify(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
        </div>

        <div className="flex items-center justify-between text-xs py-1 border-t border-neutral-100">
          <div>
            <span className="font-semibold text-neutral-800">Persist Check-In Overnight</span>
            <p className="text-[10px] text-neutral-500">Keep active spot until manually closed</p>
          </div>
          <input
            type="checkbox"
            checked={keepSpotAlive}
            onChange={(e) => setKeepSpotAlive(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#E8F5EC]/50 border border-[#16834A]/20 text-xs text-neutral-700 space-y-2">
        <h4 className="font-bold text-[#16834A]">Phase 2 Backend Preparation</h4>
        <p className="text-[11px] leading-relaxed">
          The code structure uses clean repository and MVVM patterns. Adding Firebase Authentication
          and Cloud Firestore in Phase 2 will only require swapping the mock repository implementation
          with Firestore collection streams.
        </p>
      </div>
    </div>
  );
};
