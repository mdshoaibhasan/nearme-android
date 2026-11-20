export type UserRole = 'customer' | 'owner';

export type BusinessCategory =
  | 'Grocery'
  | 'Street Food'
  | 'Tea Stall & Tong'
  | 'Bakery & Snacks'
  | 'Fresh Fruits'
  | 'Vegetables'
  | 'Meat & Fish'
  | 'Pharmacy'
  | 'Mobile Vendor';

export interface Product {
  id: string;
  businessId: string;
  name: string;
  price: number; // in BDT (৳)
  unit: string; // e.g. "kg", "plate", "piece", "cup", "500g"
  category: string;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  category: BusinessCategory;
  description: string;
  contactNumber: string;
  address: string;
  area: string; // e.g., "Dhanmondi, Dhaka"
  latitude: number;
  longitude: number;
  distanceMeters: number; // mock distance from customer
  openingTime: string; // "07:00 AM"
  closingTime: string; // "11:00 PM"
  isOpen: boolean;
  isStreetVendor: boolean;
  isCheckInActive?: boolean;
  checkInLocation?: string;
  checkInExpiresAt?: string;
  rating: number; // e.g. 4.8
  reviewCount: number;
  imageUrl?: string;
  products: Product[];
}

export interface VendorCheckIn {
  businessId: string;
  businessName: string;
  category: BusinessCategory;
  isActive: boolean;
  currentAddress: string;
  latitude: number;
  longitude: number;
  startedAt: string;
  expiresInHours: number;
  expiresAt: string;
  note?: string;
}

export type ScreenId =
  // Auth & Onboarding
  | 'splash'
  | 'welcome'
  | 'login'
  | 'register'
  | 'role_selection'
  // Customer Screens
  | 'customer_home'
  | 'search'
  | 'categories'
  | 'nearby_list'
  | 'map_view'
  | 'business_detail'
  | 'product_list'
  | 'customer_profile'
  | 'customer_settings'
  // Owner Screens
  | 'owner_dashboard'
  | 'owner_business_profile'
  | 'owner_add_business'
  | 'owner_edit_business'
  | 'owner_manage_products'
  | 'owner_add_product'
  | 'owner_edit_product'
  | 'owner_business_preview'
  | 'owner_profile'
  | 'owner_settings'
  | 'vendor_checkin';

export type RadiusFilter = 500 | 1000 | 3000 | 5000; // in meters
