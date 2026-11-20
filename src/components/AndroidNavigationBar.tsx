import React from 'react';
import { Home, Compass, MapPin, User, LayoutDashboard, Store, Package, Radio } from 'lucide-react';
import { useNearMe } from '../context/NearMeContext';
import { ScreenId } from '../types/nearme';

export const AndroidNavigationBar: React.FC = () => {
  const { currentScreen, navigateTo, userRole, vendorCheckIn } = useNearMe();

  // If in auth/onboarding/splash, do not render bottom navigation
  const hideOnScreens: ScreenId[] = ['splash', 'welcome', 'login', 'register', 'role_selection'];
  if (hideOnScreens.includes(currentScreen)) {
    return null;
  }

  if (userRole === 'customer') {
    const navItems = [
      { id: 'customer_home' as ScreenId, label: 'Home', icon: Home },
      { id: 'nearby_list' as ScreenId, label: 'Explore', icon: Compass },
      { id: 'map_view' as ScreenId, label: 'Map', icon: MapPin },
      { id: 'customer_profile' as ScreenId, label: 'Profile', icon: User },
    ];

    const isCurrent = (id: ScreenId) => {
      if (id === 'customer_home') return currentScreen === 'customer_home';
      if (id === 'nearby_list') return currentScreen === 'nearby_list' || currentScreen === 'search' || currentScreen === 'categories';
      if (id === 'map_view') return currentScreen === 'map_view';
      if (id === 'customer_profile') return currentScreen === 'customer_profile' || currentScreen === 'customer_settings';
      return false;
    };

    return (
      <div className="w-full bg-[#FFFFFF] border-t border-neutral-200/80 px-2 py-1.5 flex justify-around items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] select-none">
        {navItems.map((item) => {
          const active = isCurrent(item.id);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer focus:outline-none"
            >
              <div
                className={`px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                  active
                    ? 'bg-[#E8F5EC] text-[#16834A]'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[11px] mt-0.5 font-medium transition-colors ${
                  active ? 'text-[#16834A] font-semibold' : 'text-neutral-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Owner Bottom Navigation
  const ownerNavItems = [
    { id: 'owner_dashboard' as ScreenId, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'owner_business_profile' as ScreenId, label: 'Business', icon: Store },
    { id: 'owner_manage_products' as ScreenId, label: 'Products', icon: Package },
    { id: 'owner_profile' as ScreenId, label: 'Profile', icon: User },
  ];

  const isOwnerCurrent = (id: ScreenId) => {
    if (id === 'owner_dashboard') return currentScreen === 'owner_dashboard';
    if (id === 'owner_business_profile') {
      return (
        currentScreen === 'owner_business_profile' ||
        currentScreen === 'owner_add_business' ||
        currentScreen === 'owner_edit_business' ||
        currentScreen === 'owner_business_preview'
      );
    }
    if (id === 'owner_manage_products') {
      return (
        currentScreen === 'owner_manage_products' ||
        currentScreen === 'owner_add_product' ||
        currentScreen === 'owner_edit_product'
      );
    }
    if (id === 'owner_profile') {
      return currentScreen === 'owner_profile' || currentScreen === 'owner_settings';
    }
    return false;
  };

  return (
    <div className="w-full bg-[#FFFFFF] border-t border-neutral-200/80 px-2 py-1.5 flex justify-around items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] select-none">
      {ownerNavItems.map((item) => {
        const active = isOwnerCurrent(item.id);
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer focus:outline-none relative"
          >
            <div
              className={`px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center relative ${
                active
                  ? 'bg-[#E8F5EC] text-[#16834A]'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {item.id === 'owner_dashboard' && vendorCheckIn.isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FF9F43] ring-2 ring-white animate-pulse" />
              )}
            </div>
            <span
              className={`text-[11px] mt-0.5 font-medium transition-colors ${
                active ? 'text-[#16834A] font-semibold' : 'text-neutral-500'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
