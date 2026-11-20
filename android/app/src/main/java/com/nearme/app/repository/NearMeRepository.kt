package com.nearme.app.repository

import com.nearme.app.data.MockData
import com.nearme.app.model.Business
import com.nearme.app.model.Product
import com.nearme.app.model.VendorCheckIn
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class NearMeRepository {

    private val _businesses = MutableStateFlow<List<Business>>(MockData.sampleBusinesses)
    val businesses: StateFlow<List<Business>> = _businesses.asStateFlow()

    private val _vendorCheckIn = MutableStateFlow(
        VendorCheckIn(
            businessId = "b2",
            businessName = "Mama's Special Tong & Malai Cha",
            category = com.nearme.app.model.BusinessCategory.TEA_TONG,
            isActive = true,
            currentAddress = "Beside TSC Playground shade, Dhaka University",
            startedAt = "10:00 AM Today",
            expiresInHours = 6,
            expiresAt = "04:00 PM Today",
            note = "Fresh morning malai cha & roasted toast ready!"
        )
    )
    val vendorCheckIn: StateFlow<VendorCheckIn> = _vendorCheckIn.asStateFlow()

    // Business CRUD
    fun addBusiness(business: Business) {
        _businesses.update { current -> listOf(business) + current }
    }

    fun updateBusiness(updated: Business) {
        _businesses.update { current ->
            current.map { if (it.id == updated.id) updated else it }
        }
    }

    fun deleteBusiness(businessId: String) {
        _businesses.update { current ->
            current.filter { it.id != businessId }
        }
    }

    // Product CRUD
    fun addProduct(businessId: String, product: Product) {
        _businesses.update { current ->
            current.map { b ->
                if (b.id == businessId) {
                    b.copy(products = listOf(product) + b.products)
                } else b
            }
        }
    }

    fun updateProduct(businessId: String, updatedProduct: Product) {
        _businesses.update { current ->
            current.map { b ->
                if (b.id == businessId) {
                    b.copy(products = b.products.map { p -> if (p.id == updatedProduct.id) updatedProduct else p })
                } else b
            }
        }
    }

    fun deleteProduct(businessId: String, productId: String) {
        _businesses.update { current ->
            current.map { b ->
                if (b.id == businessId) {
                    b.copy(products = b.products.filter { it.id != productId })
                } else b
            }
        }
    }

    fun toggleProductAvailability(businessId: String, productId: String) {
        _businesses.update { current ->
            current.map { b ->
                if (b.id == businessId) {
                    b.copy(products = b.products.map { p ->
                        if (p.id == productId) p.copy(isAvailable = !p.isAvailable) else p
                    })
                } else b
            }
        }
    }

    // Vendor Check-In
    fun startCheckIn(hours: Int, location: String, note: String) {
        val checkIn = VendorCheckIn(
            businessId = "b2",
            businessName = "Mama's Special Tong & Malai Cha",
            category = com.nearme.app.model.BusinessCategory.TEA_TONG,
            isActive = true,
            currentAddress = location,
            startedAt = "Just now",
            expiresInHours = hours,
            expiresAt = "In $hours hours",
            note = note
        )
        _vendorCheckIn.value = checkIn
        // Update in businesses list
        _businesses.update { current ->
            current.map { b ->
                if (b.id == checkIn.businessId) {
                    b.copy(isCheckInActive = true, checkInLocation = location, isOpen = true)
                } else b
            }
        }
    }

    fun endCheckIn() {
        _vendorCheckIn.update { it.copy(isActive = false) }
        _businesses.update { current ->
            current.map { b ->
                if (b.id == _vendorCheckIn.value.businessId) {
                    b.copy(isCheckInActive = false)
                } else b
            }
        }
    }
}
