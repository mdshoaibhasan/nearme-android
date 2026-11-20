package com.nearme.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nearme.app.model.Business
import com.nearme.app.model.BusinessCategory
import com.nearme.app.model.Product
import com.nearme.app.model.UserRole
import com.nearme.app.model.VendorCheckIn
import com.nearme.app.repository.NearMeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn

class NearMeViewModel(
    private val repository: NearMeRepository = NearMeRepository()
) : ViewModel() {

    // User Role State
    private val _userRole = MutableStateFlow(UserRole.CUSTOMER)
    val userRole: StateFlow<UserRole> = _userRole.asStateFlow()

    // Filters
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _selectedCategory = MutableStateFlow<BusinessCategory?>(null)
    val selectedCategory: StateFlow<BusinessCategory?> = _selectedCategory.asStateFlow()

    private val _radiusFilterMeters = MutableStateFlow(3000) // 3 km default
    val radiusFilterMeters: StateFlow<Int> = _radiusFilterMeters.asStateFlow()

    // Selected Business for Detail Screen
    private val _selectedBusiness = MutableStateFlow<Business?>(null)
    val selectedBusiness: StateFlow<Business?> = _selectedBusiness.asStateFlow()

    // Bookmarks
    private val _savedBusinessIds = MutableStateFlow<Set<String>>(setOf("b2", "b4"))
    val savedBusinessIds: StateFlow<Set<String>> = _savedBusinessIds.asStateFlow()

    // Vendor Live Check-In State
    val vendorCheckIn: StateFlow<VendorCheckIn> = repository.vendorCheckIn

    // Filtered businesses stream
    val filteredBusinesses: StateFlow<List<Business>> = combine(
        repository.businesses,
        _searchQuery,
        _selectedCategory,
        _radiusFilterMeters
    ) { businesses, query, category, radius ->
        businesses.filter { b ->
            val matchRadius = b.distanceMeters <= radius
            val matchCategory = category == null || b.category == category
            val matchQuery = query.isBlank() ||
                    b.name.contains(query, ignoreCase = true) ||
                    b.area.contains(query, ignoreCase = true) ||
                    b.products.any { it.name.contains(query, ignoreCase = true) }
            matchRadius && matchCategory && matchQuery
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Actions
    fun setUserRole(role: UserRole) {
        _userRole.value = role
    }

    fun toggleRole() {
        _userRole.value = if (_userRole.value == UserRole.CUSTOMER) UserRole.BUSINESS_OWNER else UserRole.CUSTOMER
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun selectCategory(category: BusinessCategory?) {
        _selectedCategory.value = category
    }

    fun setRadiusFilter(radius: Int) {
        _radiusFilterMeters.value = radius
    }

    fun selectBusiness(business: Business) {
        _selectedBusiness.value = business
    }

    fun toggleBookmark(businessId: String) {
        _savedBusinessIds.value = if (_savedBusinessIds.value.contains(businessId)) {
            _savedBusinessIds.value - businessId
        } else {
            _savedBusinessIds.value + businessId
        }
    }

    fun addBusiness(business: Business) = repository.addBusiness(business)
    fun updateBusiness(business: Business) = repository.updateBusiness(business)
    fun deleteBusiness(id: String) = repository.deleteBusiness(id)

    fun addProduct(businessId: String, product: Product) = repository.addProduct(businessId, product)
    fun updateProduct(businessId: String, product: Product) = repository.updateProduct(businessId, product)
    fun deleteProduct(businessId: String, productId: String) = repository.deleteProduct(businessId, productId)
    fun toggleProductAvailability(businessId: String, productId: String) =
        repository.toggleProductAvailability(businessId, productId)

    fun startVendorCheckIn(hours: Int, location: String, note: String) =
        repository.startCheckIn(hours, location, note)

    fun endVendorCheckIn() = repository.endCheckIn()
}
