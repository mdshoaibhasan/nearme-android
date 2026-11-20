package com.nearme.app.navigation

sealed class Screen(val route: String) {
    // Auth & Onboarding
    object Splash : Screen("splash")
    object Welcome : Screen("welcome")
    object Login : Screen("login")
    object Register : Screen("register")
    object RoleSelection : Screen("role_selection")

    // Customer Navigation
    object CustomerHome : Screen("customer_home")
    object Search : Screen("search")
    object Categories : Screen("categories")
    object NearbyList : Screen("nearby_list")
    object MapView : Screen("map_view")
    object BusinessDetail : Screen("business_detail/{businessId}") {
        fun createRoute(businessId: String) = "business_detail/$businessId"
    }
    object ProductList : Screen("product_list")
    object CustomerProfile : Screen("customer_profile")
    object CustomerSettings : Screen("customer_settings")

    // Business Owner Navigation
    object OwnerDashboard : Screen("owner_dashboard")
    object OwnerBusinessProfile : Screen("owner_business_profile")
    object AddBusiness : Screen("add_business")
    object EditBusiness : Screen("edit_business")
    object ManageProducts : Screen("manage_products")
    object AddProduct : Screen("add_product")
    object EditProduct : Screen("edit_product/{productId}") {
        fun createRoute(productId: String) = "edit_product/$productId"
    }
    object BusinessPreview : Screen("business_preview/{businessId}") {
        fun createRoute(businessId: String) = "business_preview/$businessId"
    }
    object OwnerProfile : Screen("owner_profile")
    object OwnerSettings : Screen("owner_settings")
    object VendorCheckIn : Screen("vendor_checkin")
}
