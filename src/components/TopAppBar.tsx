import React from 'react';
import { ArrowLeft, MapPin, Code2, Users, RefreshCw } from 'lucide-react';
import { useNearMe } from '../context/NearMeContext';
import { ScreenId } from '../types/nearme';

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showRoleToggle?: boolean;
  actions?: React.ReactNode;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  showBack = false,
  onBack,
  showRoleToggle = true,
  actions,
}) => {
  const {
    currentScreen,
    navigateBack,
    canNavigateBack,
    userRole,
    toggleRole,
    setIsCodeInspectorOpen,
  } = useNearMe();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigateBack();
    }
  };

  const getScreenTitle = () => {
    if (title) return title;
    switch (currentScreen) {
      case 'customer_home':
        return 'NearMe';
      case 'search':
        return 'Search Businesses';
      case 'categories':
        return 'All Categories';
      case 'nearby_list':
        return 'Nearby Businesses';
      case 'map_view':
        return 'Explore Map';
      case 'business_detail':
        return 'Business Details';
      case 'product_list':
        return 'Products & Stalls';
      case 'customer_profile':
        return 'My Profile';
      case 'customer_settings':
        return 'Settings';
      case 'owner_dashboard':
        return 'Owner Dashboard';
      case 'owner_business_profile':
        return 'Business Profile';
      case 'owner_add_business':
        return 'Add Business';
      case 'owner_edit_business':
        return 'Edit Business';
      case 'owner_manage_products':
        return 'Manage Products';
      case 'owner_add_product':
        return 'Add Product';
      case 'owner_edit_product':
        return 'Edit Product';
      case 'owner_business_preview':
        return 'Public Preview';
      case 'owner_profile':
        return 'Owner Profile';
      case 'owner_settings':
        return 'Owner Settings';
      case 'vendor_checkin':
        return 'Vendor Live Check-In';
      default:
        return 'NearMe';
    }
  };

  const shouldShowBack =
    showBack ||
    (canNavigateBack &&
      ![
        'welcome',
        'customer_home',
        'owner_dashboard',
        'role_selection',
      ].includes(currentScreen));

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-neutral-100 px-4 py-2.5 flex items-center justify-between z-20 select-none">
      <div className="flex items-center gap-2.5">
        {shouldShowBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 transition-colors focus:outline-none"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}

        <div>
          <h1 className="text-[17px] font-bold text-[#202124] tracking-tight leading-tight">
            {getScreenTitle()}
          </h1>
          {currentScreen === 'customer_home' && (
            <div className="flex items-center gap-1 text-[11px] text-[#16834A] font-medium">
              <MapPin className="w-3 h-3 stroke-[2.5]" />
              <span>Dhanmondi, Dhaka (23.75° N, 90.38° E)</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {actions}

        {showRoleToggle && (
          <button
            onClick={toggleRole}
            title={`Switch to ${userRole === 'customer' ? 'Business Owner' : 'Customer'} view`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F5EC] text-[#16834A] hover:bg-[#d5eedd] transition-all cursor-pointer border border-[#16834A]/20 shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="capitalize">{userRole}</span>
            <RefreshCw className="w-3 h-3 text-[#16834A]/70" />
          </button>
        )}

        <button
          onClick={() => setIsCodeInspectorOpen(true)}
          title="Inspect Jetpack Compose / Android Studio Source Code"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
        >
          <Code2 className="w-4 h-4 text-emerald-800" />
        </button>
      </div>
    </div>
  );
};
