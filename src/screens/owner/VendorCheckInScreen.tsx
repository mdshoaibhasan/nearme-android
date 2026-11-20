import React, { useState } from 'react';
import {
  Radio,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  StopCircle,
  Send,
  Navigation,
  Compass,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';

export const VendorCheckInScreen: React.FC = () => {
  const {
    ownerBusiness,
    vendorCheckIn,
    startVendorCheckIn,
    endVendorCheckIn,
    navigateTo,
  } = useNearMe();

  const [hours, setHours] = useState<number>(4);
  const [customLocation, setCustomLocation] = useState(
    vendorCheckIn.currentAddress || 'Beside TSC Playground shade, Dhaka University'
  );
  const [note, setNote] = useState('Fresh hot milk tea & toasted snacks available now!');

  const quickSpots = [
    'Beside TSC Playground shade, Dhaka University',
    'Rabindra Sarobar Lakeside Walkway, Dhanmondi',
    'Farmgate Footbridge North Entrance',
    'Mohammadpur Krishi Market Gate 1',
    'Mirpur 10 Metro Pillar 24',
  ];

  const handleStart = () => {
    startVendorCheckIn(hours, customLocation, note);
  };

  const handleEnd = () => {
    endVendorCheckIn();
  };

  const bName = ownerBusiness?.name || vendorCheckIn.businessName;
  const bCat = ownerBusiness?.category || vendorCheckIn.category;

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF9F43] uppercase tracking-wider">
          <Radio className="w-4 h-4 stroke-[2.5]" />
          <span>Street Vendor Live Broadcast</span>
        </div>
        <h2 className="text-xl font-black text-[#202124] tracking-tight mt-1">
          "I'm Selling Here Today"
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Broadcast your mobile cart or stall spot to customers walking within 500m – 5km.
        </p>
      </div>

      {/* Active Check-In Status Card */}
      {vendorCheckIn.isActive ? (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF5EB] via-[#FFF9F2] to-white border-2 border-[#FF9F43] shadow-md space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F43] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FF9F43]" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF9F43]">
                BROADCASTING LIVE
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF9F43] text-white">
              Active Radar
            </span>
          </div>

          <div>
            <h3 className="text-base font-black text-[#202124]">{bName}</h3>
            <span className="text-[11px] font-semibold text-[#16834A]">{bCat}</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#FF9F43]/30 space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FF9F43] shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-500 font-medium">Broadcast Spot:</span>
                <p className="font-bold text-neutral-800">{vendorCheckIn.currentAddress}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[11px]">
              <span className="text-neutral-500">Started: {vendorCheckIn.startedAt}</span>
              <span className="font-bold text-[#FF9F43]">
                Expires at {vendorCheckIn.expiresAt}
              </span>
            </div>
          </div>

          {vendorCheckIn.note && (
            <p className="text-xs text-neutral-600 italic bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
              "{vendorCheckIn.note}"
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => navigateTo('map_view')}
              className="flex-1 py-2.5 rounded-xl bg-[#16834A] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#0E5E34] transition-colors cursor-pointer shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>See on Live Map</span>
            </button>
            <button
              onClick={handleEnd}
              className="py-2.5 px-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <StopCircle className="w-3.5 h-3.5" />
              <span>End Broadcast</span>
            </button>
          </div>
        </div>
      ) : (
        /* Inactive: Setup Form */
        <div className="p-4 rounded-2xl border border-neutral-200 bg-[#FBFDFB] space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5EC] text-[#16834A] flex items-center justify-center font-bold">
              <Radio className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#202124]">{bName}</h3>
              <p className="text-[11px] text-neutral-500">{bCat} • Mobile Vendor Mode</p>
            </div>
          </div>

          {/* Current Location Field */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Today's Selling Location *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#FF9F43] absolute left-3 top-2.5" />
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="e.g. Beside TSC Gate or Rabindra Sarobar"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 text-xs font-medium focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            {/* Quick Pick Dhaka Hotspots */}
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-[10px] text-neutral-400 font-semibold self-center mr-1">
                Quick:
              </span>
              {quickSpots.slice(0, 3).map((spot) => (
                <button
                  key={spot}
                  type="button"
                  onClick={() => setCustomLocation(spot)}
                  className="text-[10px] bg-neutral-100 hover:bg-[#E8F5EC] text-neutral-700 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                >
                  {spot.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Duration / Expiry Selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Broadcast Duration
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[2, 4, 6, 8].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHours(h)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    hours === h
                      ? 'bg-[#FF9F43] text-white border-[#FF9F43] shadow-xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {h} Hours
                </button>
              ))}
            </div>
          </div>

          {/* Note to Customers */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Shoutout Message / Today's Specials
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Piping hot tea with fresh butter biscuits"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>

          {/* Big Action Button */}
          <button
            onClick={handleStart}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF9F43] to-[#E68A2E] text-white font-black text-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>I'm Selling Here Today! (Start Check-In)</span>
          </button>
        </div>
      )}

      {/* Benefits Explanation */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2 text-xs">
        <h4 className="font-bold text-[#202124]">Why use Vendor Check-In?</h4>
        <ul className="space-y-1.5 text-neutral-600 text-[11px] leading-relaxed">
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
            <span>Pulsing orange pin on the live discovery map for all nearby users.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
            <span>Appears in "Selling Here Today" carousel on the Customer Home Screen.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16834A] shrink-0 mt-0.5" />
            <span>Automatic expiration after your selected shift ends.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
