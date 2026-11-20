package com.nearme.app.model

enum class UserRole {
    CUSTOMER,
    BUSINESS_OWNER
}

enum class BusinessCategory(val displayName: String) {
    GROCERY("Grocery"),
    STREET_FOOD("Street Food"),
    TEA_TONG("Tea Stall & Tong"),
    BAKERY("Bakery & Snacks"),
    FRUITS("Fresh Fruits"),
    VEGETABLES("Vegetables"),
    MEAT_FISH("Meat & Fish"),
    PHARMACY("Pharmacy"),
    MOBILE_VENDOR("Mobile Vendor")
}

data class Product(
    val id: String,
    val businessId: String,
    val name: String,
    val price: Double, // in BDT (৳)
    val unit: String,  // e.g. "kg", "plate", "cup"
    val category: String,
    val isAvailable: Boolean = true,
    val description: String = "",
    val imageUrl: String = ""
)

data class Business(
    val id: String,
    val ownerId: String,
    val name: String,
    val category: BusinessCategory,
    val description: String,
    val contactNumber: String,
    val address: String,
    val area: String,
    val latitude: Double,
    val longitude: Double,
    val distanceMeters: Int,
    val openingTime: String,
    val closingTime: String,
    val isOpen: Boolean = true,
    val isStreetVendor: Boolean = false,
    val isCheckInActive: Boolean = false,
    val checkInLocation: String = "",
    val checkInExpiresAt: String = "",
    val rating: Double = 4.8,
    val reviewCount: Int = 120,
    val imageUrl: String = "",
    val products: List<Product> = emptyList()
)

data class VendorCheckIn(
    val businessId: String,
    val businessName: String,
    val category: BusinessCategory,
    val isActive: Boolean = false,
    val currentAddress: String = "",
    val latitude: Double = 23.7508,
    val longitude: Double = 90.3780,
    val startedAt: String = "",
    val expiresInHours: Int = 4,
    val expiresAt: String = "",
    val note: String = ""
)
