import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Business,
  BusinessCategory,
  Product,
  RadiusFilter,
  ScreenId,
  UserRole,
  VendorCheckIn,
} from '../types/nearme';
import { MOCK_BUSINESSES } from '../data/mockData';

interface SnackbarState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface NearMeContextType {
  // Navigation
  currentScreen: ScreenId;
  navigationStack: ScreenId[];
  navigateTo: (screen: ScreenId, replace?: boolean) => void
  navigateBack: () => void;
  canNavigateBack: boolean;

  // Role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toggleRole: () => void;

  // Auth simulation
  isLoggedIn: boolean;
  currentUser: { name: string; phone: string; email: string };
  login: (phone: string, role: UserRole) => void;
  register: (name: string, phone: string, role: UserRole) => void;
  logout: () => void;

  // Business discovery & filtering
  businesses: Business[];
  currentBusiness: Business | null;
  setCurrentBusiness: (b: Business | null) => void;
  selectedCategory: BusinessCategory | 'All';
  setSelectedCategory: (cat: BusinessCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  radiusFilter: RadiusFilter;
  setRadiusFilter: (r: RadiusFilter) => void;
  filteredBusinesses: Business[];

  // Bookmarks
  savedBusinessIds: string[];
  toggleBookmark: (businessId: string) => void;
  isBookmarked: (businessId: string) => boolean;

  // Vendor Check-In
  vendorCheckIn: VendorCheckIn;
  startVendorCheckIn: (hours: number, location: string, note?: string) => void;
  endVendorCheckIn: () => void;

  // Owner Operations
  ownerBusiness: Business | null;
  addBusiness: (data: Partial<Business>) => Business;
  updateBusiness: (id: string, updates: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;

  // Product Operations
  addProduct: (businessId: string, product: Omit<Product, 'id' | 'businessId'>) => void;
  updateProduct: (businessId: string, productId: string, updates: Partial<Product>) => void;
  deleteProduct: (businessId: string, productId: string) => void;
  toggleProductAvailability: (businessId: string, productId: string) => void;

  // UI helpers
  snackbar: SnackbarState | null;
  showSnackbar: (message: string, type?: 'success' | 'info' | 'error') => void;
  isDeviceFrame: boolean;
  setIsDeviceFrame: (val: boolean) => void;
  isCodeInspectorOpen: boolean;
  setIsCodeInspectorOpen: (val: boolean) => void;
}

const NearMeContext = createContext<NearMeContextType | undefined>(undefined);

export const NearMeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('welcome');
  const [navigationStack, setNavigationStack] = useState<ScreenId[]>(['welcome']);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Tanvir Hossain',
    phone: '+880 1712-345678',
    email: 'tanvir.cse@du.ac.bd',
  });

  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(MOCK_BUSINESSES[0]);
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusFilter, setRadiusFilter] = useState<RadiusFilter>(3000);
  const [savedBusinessIds, setSavedBusinessIds] = useState<string[]>(['b2', 'b4']);

  // UI state
  const [snackbar, setSnackbar] = useState<SnackbarState | null>(null);
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);
  const [isCodeInspectorOpen, setIsCodeInspectorOpen] = useState(false);

  // Vendor check-in state
  const [vendorCheckIn, setVendorCheckIn] = useState<VendorCheckIn>({
    businessId: 'b2',
    businessName: "Mama's Special Tong & Malai Cha",
    category: 'Tea Stall & Tong',
    isActive: true,
    currentAddress: 'Beside TSC Playground shade, Dhaka University',
    latitude: 23.7335,
    longitude: 90.3927,
    startedAt: '10:00 AM Today',
    expiresInHours: 6,
    expiresAt: '04:00 PM Today',
    note: 'Fresh morning malai cha & roasted butter toast ready!',
  });

  // Owner's business (defaults to b2 for street vendor demo or first business)
  const ownerBusiness = businesses.find((b) => b.id === 'b2') || businesses[0] || null;

  const showSnackbar = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setSnackbar({ message, type });
    setTimeout(() => {
      setSnackbar((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const navigateTo = (screen: ScreenId, replace: boolean = false) => {
    if (replace) {
      setNavigationStack((prev) => {
        const next = [...prev];
        next[next.length - 1] = screen;
        return next;
      });
    } else {
      setNavigationStack((prev) => [...prev, screen]);
    }
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (navigationStack.length > 1) {
      const nextStack = [...navigationStack];
      nextStack.pop();
      const previousScreen = nextStack[nextStack.length - 1];
      setNavigationStack(nextStack);
      setCurrentScreen(previousScreen);
    }
  };

  const toggleRole = () => {
    const newRole = userRole === 'customer' ? 'owner' : 'customer';
    setUserRole(newRole);
    if (newRole === 'customer') {
      navigateTo('customer_home');
    } else {
      navigateTo('owner_dashboard');
    }
    showSnackbar(`Switched to ${newRole === 'customer' ? 'Customer' : 'Business Owner'} mode`, 'info');
  };

  const login = (phone: string, role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentUser((prev) => ({ ...prev, phone }));
    showSnackbar(`Signed in successfully as ${role === 'customer' ? 'Customer' : 'Business Owner'}`);
    navigateTo(role === 'customer' ? 'customer_home' : 'owner_dashboard');
  };

  const register = (name: string, phone: string, role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentUser({ name, phone, email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com` });
    showSnackbar('Account registered successfully! Welcome to NearMe.');
    navigateTo(role === 'customer' ? 'customer_home' : 'owner_dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showSnackbar('Signed out of NearMe', 'info');
    navigateTo('welcome');
  };

  const toggleBookmark = (businessId: string) => {
    setSavedBusinessIds((prev) => {
      const exists = prev.includes(businessId);
      if (exists) {
        showSnackbar('Removed from saved places', 'info');
        return prev.filter((id) => id !== businessId);
      } else {
        showSnackbar('Saved to your favorites!', 'success');
        return [...prev, businessId];
      }
    });
  };

  const isBookmarked = (businessId: string) => savedBusinessIds.includes(businessId);

  // Vendor Check-In Actions
  const startVendorCheckIn = (hours: number, location: string, note?: string) => {
    const now = new Date();
    const expiryDate = new Date(now.getTime() + hours * 60 * 60 * 1000);
    const formatTime = (d: Date) =>
      d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const newCheckIn: VendorCheckIn = {
      businessId: ownerBusiness?.id || 'b2',
      businessName: ownerBusiness?.name || "Mama's Special Tong",
      category: ownerBusiness?.category || 'Tea Stall & Tong',
      isActive: true,
      currentAddress: location,
      latitude: 23.7508,
      longitude: 90.3780,
      startedAt: `${formatTime(now)} Today`,
      expiresInHours: hours,
      expiresAt: `${formatTime(expiryDate)} Today`,
      note: note || "Selling hot street delicacies here today!",
    };

    setVendorCheckIn(newCheckIn);

    // Update business in listing
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === newCheckIn.businessId
          ? {
              ...b,
              isCheckInActive: true,
              checkInLocation: location,
              checkInExpiresAt: newCheckIn.expiresAt,
              isOpen: true,
            }
          : b
      )
    );

    showSnackbar('Broadcast Live! Customers nearby can see your active stall pin.', 'success');
  };

  const endVendorCheckIn = () => {
    setVendorCheckIn((prev) => ({ ...prev, isActive: false }));
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === vendorCheckIn.businessId ? { ...b, isCheckInActive: false } : b
      )
    );
    showSnackbar('Vendor check-in session ended.', 'info');
  };

  // Business CRUD
  const addBusiness = (data: Partial<Business>): Business => {
    const newId = `b_${Date.now()}`;
    const newBusiness: Business = {
      id: newId,
      ownerId: 'owner_user',
      name: data.name || 'New Business',
      category: data.category || 'Grocery',
      description: data.description || '',
      contactNumber: data.contactNumber || '+880 1700-000000',
      address: data.address || 'Dhaka, Bangladesh',
      area: data.area || 'Dhaka',
      latitude: data.latitude || 23.7500,
      longitude: data.longitude || 90.3750,
      distanceMeters: Math.floor(Math.random() * 2000) + 300,
      openingTime: data.openingTime || '08:00 AM',
      closingTime: data.closingTime || '10:00 PM',
      isOpen: data.isOpen ?? true,
      isStreetVendor: data.isStreetVendor ?? false,
      rating: 5.0,
      reviewCount: 1,
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
      products: [],
    };

    setBusinesses((prev) => [newBusiness, ...prev]);
    showSnackbar('Business created successfully!', 'success');
    return newBusiness;
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
    if (currentBusiness?.id === id) {
      setCurrentBusiness((prev) => (prev ? { ...prev, ...updates } : null));
    }
    showSnackbar('Business details updated', 'success');
  };

  const deleteBusiness = (id: string) => {
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
    showSnackbar('Business deleted from directory', 'info');
  };

  // Product CRUD
  const addProduct = (businessId: string, product: Omit<Product, 'id' | 'businessId'>) => {
    const newProduct: Product = {
      id: `p_${Date.now()}`,
      businessId,
      ...product,
    };

    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === businessId ? { ...b, products: [newProduct, ...b.products] } : b
      )
    );

    if (currentBusiness?.id === businessId) {
      setCurrentBusiness((prev) =>
        prev ? { ...prev, products: [newProduct, ...prev.products] } : null
      );
    }
    showSnackbar(`Added product: ${newProduct.name}`, 'success');
  };

  const updateProduct = (businessId: string, productId: string, updates: Partial<Product>) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== businessId) return b;
        return {
          ...b,
          products: b.products.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
        };
      })
    );
    if (currentBusiness?.id === businessId) {
      setCurrentBusiness((prev) =>
        prev
          ? {
              ...prev,
              products: prev.products.map((p) =>
                p.id === productId ? { ...p, ...updates } : p
              ),
            }
          : null
      );
    }
    showSnackbar('Product updated successfully', 'success');
  };

  const deleteProduct = (businessId: string, productId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== businessId) return b;
        return {
          ...b,
          products: b.products.filter((p) => p.id !== productId),
        };
      })
    );
    if (currentBusiness?.id === businessId) {
      setCurrentBusiness((prev) =>
        prev
          ? {
              ...prev,
              products: prev.products.filter((p) => p.id !== productId),
            }
          : null
      );
    }
    showSnackbar('Product removed', 'info');
  };

  const toggleProductAvailability = (businessId: string, productId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== businessId) return b;
        return {
          ...b,
          products: b.products.map((p) => {
            if (p.id !== productId) return p;
            const updated = !p.isAvailable;
            showSnackbar(
              `${p.name} marked as ${updated ? 'In Stock' : 'Out of Stock'}`,
              'info'
            );
            return { ...p, isAvailable: updated };
          }),
        };
      })
    );
  };

  // Filter businesses by search, category, radius
  const filteredBusinesses = businesses.filter((b) => {
    // Radius check
    if (b.distanceMeters > radiusFilter) {
      return false;
    }
    // Category check
    if (selectedCategory !== 'All' && b.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchCategory = b.category.toLowerCase().includes(q);
      const matchArea = b.area.toLowerCase().includes(q);
      const matchProduct = b.products.some((p) => p.name.toLowerCase().includes(q));
      return matchName || matchCategory || matchArea || matchProduct;
    }
    return true;
  });

  return (
    <NearMeContext.Provider
      value={{
        currentScreen,
        navigationStack,
        navigateTo,
        navigateBack,
        canNavigateBack: navigationStack.length > 1,
        userRole,
        setUserRole,
        toggleRole,
        isLoggedIn,
        currentUser,
        login,
        register,
        logout,
        businesses,
        currentBusiness,
        setCurrentBusiness,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        radiusFilter,
        setRadiusFilter,
        filteredBusinesses,
        savedBusinessIds,
        toggleBookmark,
        isBookmarked,
        vendorCheckIn,
        startVendorCheckIn,
        endVendorCheckIn,
        ownerBusiness,
        addBusiness,
        updateBusiness,
        deleteBusiness,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,
        snackbar,
        showSnackbar,
        isDeviceFrame,
        setIsDeviceFrame,
        isCodeInspectorOpen,
        setIsCodeInspectorOpen,
      }}
    >
      {children}
    </NearMeContext.Provider>
  );
};

export const useNearMe = (): NearMeContextType => {
  const context = useContext(NearMeContext);
  if (!context) {
    throw new Error('useNearMe must be used within a NearMeProvider');
  }
  return context;
};
