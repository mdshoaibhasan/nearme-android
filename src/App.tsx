/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NearMeProvider, useNearMe } from './context/NearMeContext';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidNavigationBar } from './components/AndroidNavigationBar';
import { AndroidGestureBar } from './components/AndroidGestureBar';
import { TopAppBar } from './components/TopAppBar';
import { CodeInspectorModal } from './components/CodeInspectorModal';

// Customer Screens
import {
  SplashScreen,
  WelcomeScreen,
  RoleSelectionScreen,
  LoginScreen,
  RegisterScreen,
} from './screens/customer/AuthScreens';
import { CustomerHomeScreen } from './screens/customer/CustomerHomeScreen';
import {
  SearchBusinessesScreen,
  CategorySelectionScreen,
  NearbyBusinessesScreen,
} from './screens/customer/SearchAndCategoryScreens';
import { MapViewScreen } from './screens/customer/MapViewScreen';
import { BusinessDetailsScreen } from './screens/customer/BusinessDetailsScreen';
import { ProductListScreen } from './screens/customer/ProductListScreen';
import {
  CustomerProfileScreen,
  CustomerSettingsScreen,
} from './screens/customer/ProfileAndSettingsScreens';

// Owner Screens
import { OwnerDashboardScreen } from './screens/owner/OwnerDashboardScreen';
import {
  BusinessProfileScreen,
  AddBusinessScreen,
  EditBusinessScreen,
  BusinessPreviewScreen,
} from './screens/owner/BusinessProfileAndForms';
import {
  ManageProductsScreen,
  AddProductScreen,
  EditProductScreen,
} from './screens/owner/ProductManagementScreens';
import { VendorCheckInScreen } from './screens/owner/VendorCheckInScreen';
import {
  OwnerProfileScreen,
  OwnerSettingsScreen,
} from './screens/owner/OwnerProfileAndSettings';

import {
  Smartphone,
  Maximize2,
  Code2,
  Radio,
  CheckCircle2,
  Info,
  AlertCircle,
  GraduationCap,
  Users,
} from 'lucide-react';

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useNearMe();

  switch (currentScreen) {
    // Auth & Onboarding
    case 'splash':
      return <SplashScreen />;
    case 'welcome':
      return <WelcomeScreen />;
    case 'login':
      return <LoginScreen />;
    case 'register':
      return <RegisterScreen />;
    case 'role_selection':
      return <RoleSelectionScreen />;

    // Customer Screens
    case 'customer_home':
      return <CustomerHomeScreen />;
    case 'search':
      return <SearchBusinessesScreen />;
    case 'categories':
      return <CategorySelectionScreen />;
    case 'nearby_list':
      return <NearbyBusinessesScreen />;
    case 'map_view':
      return <MapViewScreen />;
    case 'business_detail':
      return <BusinessDetailsScreen />;
    case 'product_list':
      return <ProductListScreen />;
    case 'customer_profile':
      return <CustomerProfileScreen />;
    case 'customer_settings':
      return <CustomerSettingsScreen />;

    // Owner Screens
    case 'owner_dashboard':
      return <OwnerDashboardScreen />;
    case 'owner_business_profile':
      return <BusinessProfileScreen />;
    case 'owner_add_business':
      return <AddBusinessScreen />;
    case 'owner_edit_business':
      return <EditBusinessScreen />;
    case 'owner_manage_products':
      return <ManageProductsScreen />;
    case 'owner_add_product':
      return <AddProductScreen />;
    case 'owner_edit_product':
      return <EditProductScreen />;
    case 'owner_business_preview':
      return <BusinessPreviewScreen />;
    case 'owner_profile':
      return <OwnerProfileScreen />;
    case 'owner_settings':
      return <OwnerSettingsScreen />;
    case 'vendor_checkin':
      return <VendorCheckInScreen />;

    default:
      return <CustomerHomeScreen />;
  }
};

const MainLayout: React.FC = () => {
  const {
    currentScreen,
    userRole,
    toggleRole,
    snackbar,
    isDeviceFrame,
    setIsDeviceFrame,
    setIsCodeInspectorOpen,
    vendorCheckIn,
  } = useNearMe();

  // Screens where the top app bar is handled inside the screen or omitted
  const noTopBarScreens = ['splash', 'welcome', 'login', 'register', 'role_selection', 'owner_business_preview'];
  const showTopBar = !noTopBarScreens.includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#E5ECE7] flex flex-col items-center justify-between font-sans selection:bg-[#16834A] selection:text-white pb-4">
      {/* Top University Project Info Banner & Toolbar */}
      <header className="w-full bg-[#16834A] text-white py-2.5 px-4 sm:px-8 shadow-md z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center font-black">
              NM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">NearMe</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  Jetpack Compose & Material 3
                </span>
                {vendorCheckIn.isActive && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-[#FF9F43] text-white px-2 py-0.5 rounded-full font-bold animate-pulse">
                    <Radio className="w-2.5 h-2.5" />
                    Vendor Spot Live
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-100 hidden sm:block">
                Final-Semester University Software Engineering Project • Bangladesh Edition (৳ BDT)
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Switch Role */}
            <button
              onClick={toggleRole}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold transition-all cursor-pointer border border-white/20"
              title="Toggle between Customer and Business Owner experiences"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Role: <strong className="capitalize text-emerald-200">{userRole}</strong></span>
            </button>

            {/* Device Frame Toggle */}
            <button
              onClick={() => setIsDeviceFrame(!isDeviceFrame)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold transition-all cursor-pointer border border-white/20"
              title={isDeviceFrame ? 'Switch to Expanded View' : 'Switch to Pixel Phone Frame'}
            >
              {isDeviceFrame ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Expanded</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Phone Frame</span>
                </>
              )}
            </button>

            {/* Kotlin Code Inspector */}
            <button
              onClick={() => setIsCodeInspectorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF9F43] hover:bg-[#E68A2E] text-white font-bold transition-all cursor-pointer shadow-xs"
              title="Inspect Android Studio Kotlin Code"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Android Studio Code</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Device Container */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-5 w-full">
        {isDeviceFrame ? (
          /* Android Pixel 8 Pro Device Shell */
          <div className="relative w-full max-w-[412px] h-[860px] max-h-[92vh] bg-neutral-900 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-neutral-800 flex flex-col ring-8 ring-black/5">
            {/* Side hardware buttons (Volume & Power) */}
            <div className="absolute -right-2 top-28 w-1 h-12 bg-neutral-700 rounded-r-md" />
            <div className="absolute -right-2 top-44 w-1 h-10 bg-neutral-700 rounded-r-md" />

            {/* Inner Screen Bezel */}
            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col shadow-inner relative">
              {/* Android Status Bar */}
              <AndroidStatusBar isDarkContent={currentScreen !== 'splash'} />

              {/* Material 3 Top App Bar */}
              {showTopBar && <TopAppBar />}

              {/* Screen Body */}
              <div className="flex-1 overflow-hidden relative flex flex-col">
                <ScreenRouter />
              </div>

              {/* Material 3 Bottom Navigation Bar */}
              <AndroidNavigationBar />

              {/* Android Gesture Bar */}
              <AndroidGestureBar />
            </div>
          </div>
        ) : (
          /* Responsive Full Width / Tablet Mode */
          <div className="w-full max-w-3xl h-[840px] max-h-[88vh] bg-white rounded-3xl shadow-xl border border-neutral-200/90 overflow-hidden flex flex-col relative">
            <AndroidStatusBar isDarkContent={currentScreen !== 'splash'} />
            {showTopBar && <TopAppBar />}
            <div className="flex-1 overflow-hidden relative flex flex-col">
              <ScreenRouter />
            </div>
            <AndroidNavigationBar />
            <AndroidGestureBar />
          </div>
        )}
      </main>

      {/* Interactive Toast / Snackbar */}
      {snackbar && (
        <div className="fixed bottom-6 z-50 animate-bounce px-4 py-2.5 rounded-2xl bg-neutral-900/95 text-white text-xs font-semibold shadow-xl border border-neutral-700 flex items-center gap-2 max-w-md mx-auto">
          {snackbar.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16834A] shrink-0" />}
          {snackbar.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
          {snackbar.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          <span>{snackbar.message}</span>
        </div>
      )}

      {/* Kotlin & Architecture Inspector Modal */}
      <CodeInspectorModal />
    </div>
  );
};

export default function App() {
  return (
    <NearMeProvider>
      <MainLayout />
    </NearMeProvider>
  );
}
