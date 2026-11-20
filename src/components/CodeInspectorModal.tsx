import React, { useState } from 'react';
import {
  X,
  Code2,
  Copy,
  Check,
  Download,
  FolderGit2,
  FileCode,
  Layers,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { useNearMe } from '../context/NearMeContext';

export const CodeInspectorModal: React.FC = () => {
  const { isCodeInspectorOpen, setIsCodeInspectorOpen, showSnackbar } = useNearMe();
  const [activeTab, setActiveTab] = useState<'architecture' | 'mainActivity' | 'viewModel' | 'repository' | 'models' | 'theme' | 'gradle'>('architecture');
  const [copied, setCopied] = useState(false);

  if (!isCodeInspectorOpen) return null;

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showSnackbar('Kotlin source code copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets: Record<string, { filename: string; language: string; content: string }> = {
    mainActivity: {
      filename: 'MainActivity.kt',
      language: 'kotlin',
      content: `package com.nearme.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.*
import com.nearme.app.model.UserRole
import com.nearme.app.navigation.Screen
import com.nearme.app.ui.theme.NearMeTheme
import com.nearme.app.viewmodel.NearMeViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NearMeTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val viewModel: NearMeViewModel = viewModel()
                    NearMeApp(viewModel)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NearMeApp(viewModel: NearMeViewModel) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route
    val userRole by viewModel.userRole.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (userRole == UserRole.CUSTOMER) "NearMe" else "Owner Portal") },
                actions = {
                    FilterChip(
                        selected = userRole == UserRole.BUSINESS_OWNER,
                        onClick = { viewModel.toggleRole() },
                        label = { Text(if (userRole == UserRole.CUSTOMER) "Customer" else "Owner") }
                    )
                }
            )
        },
        bottomBar = {
            NavigationBar {
                if (userRole == UserRole.CUSTOMER) {
                    NavigationBarItem(selected = currentRoute == Screen.CustomerHome.route, onClick = { navController.navigate(Screen.CustomerHome.route) }, label = { Text("Home") })
                    NavigationBarItem(selected = currentRoute == Screen.NearbyList.route, onClick = { navController.navigate(Screen.NearbyList.route) }, label = { Text("Explore") })
                    NavigationBarItem(selected = currentRoute == Screen.MapView.route, onClick = { navController.navigate(Screen.MapView.route) }, label = { Text("Map") })
                    NavigationBarItem(selected = currentRoute == Screen.CustomerProfile.route, onClick = { navController.navigate(Screen.CustomerProfile.route) }, label = { Text("Profile") })
                } else {
                    NavigationBarItem(selected = currentRoute == Screen.OwnerDashboard.route, onClick = { navController.navigate(Screen.OwnerDashboard.route) }, label = { Text("Dashboard") })
                    NavigationBarItem(selected = currentRoute == Screen.OwnerBusinessProfile.route, onClick = { navController.navigate(Screen.OwnerBusinessProfile.route) }, label = { Text("Business") })
                    NavigationBarItem(selected = currentRoute == Screen.ManageProducts.route, onClick = { navController.navigate(Screen.ManageProducts.route) }, label = { Text("Products") })
                    NavigationBarItem(selected = currentRoute == Screen.OwnerProfile.route, onClick = { navController.navigate(Screen.OwnerProfile.route) }, label = { Text("Profile") })
                }
            }
        }
    ) { innerPadding ->
        NavHost(navController = navController, startDestination = Screen.CustomerHome.route, modifier = Modifier.padding(innerPadding)) {
            composable(Screen.CustomerHome.route) { CustomerHomeScreen(viewModel, navController) }
            composable(Screen.NearbyList.route) { NearbyBusinessesScreen(viewModel, navController) }
            composable(Screen.MapView.route) { MapViewScreen(viewModel, navController) }
            composable(Screen.OwnerDashboard.route) { OwnerDashboardScreen(viewModel, navController) }
            composable(Screen.VendorCheckIn.route) { VendorCheckInScreen(viewModel, navController) }
        }
    }
}`,
    },
    viewModel: {
      filename: 'NearMeViewModel.kt',
      language: 'kotlin',
      content: `package com.nearme.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nearme.app.model.*
import com.nearme.app.repository.NearMeRepository
import kotlinx.coroutines.flow.*

class NearMeViewModel(
    private val repository: NearMeRepository = NearMeRepository()
) : ViewModel() {

    private val _userRole = MutableStateFlow(UserRole.CUSTOMER)
    val userRole: StateFlow<UserRole> = _userRole.asStateFlow()

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _selectedCategory = MutableStateFlow<BusinessCategory?>(null)
    val selectedCategory: StateFlow<BusinessCategory?> = _selectedCategory.asStateFlow()

    private val _radiusFilterMeters = MutableStateFlow(3000)
    val radiusFilterMeters: StateFlow<Int> = _radiusFilterMeters.asStateFlow()

    val vendorCheckIn: StateFlow<VendorCheckIn> = repository.vendorCheckIn

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

    fun toggleRole() {
        _userRole.value = if (_userRole.value == UserRole.CUSTOMER) UserRole.BUSINESS_OWNER else UserRole.CUSTOMER
    }

    fun setRadiusFilter(radius: Int) { _radiusFilterMeters.value = radius }
    fun startVendorCheckIn(hours: Int, loc: String, note: String) = repository.startCheckIn(hours, loc, note)
    fun endVendorCheckIn() = repository.endCheckIn()
}`,
    },
    repository: {
      filename: 'NearMeRepository.kt',
      language: 'kotlin',
      content: `package com.nearme.app.repository

import com.nearme.app.data.MockData
import com.nearme.app.model.*
import kotlinx.coroutines.flow.*

class NearMeRepository {
    private val _businesses = MutableStateFlow<List<Business>>(MockData.sampleBusinesses)
    val businesses: StateFlow<List<Business>> = _businesses.asStateFlow()

    private val _vendorCheckIn = MutableStateFlow(
        VendorCheckIn(
            businessId = "b2",
            businessName = "Mama's Special Tong & Malai Cha",
            category = BusinessCategory.TEA_TONG,
            isActive = true,
            currentAddress = "Beside TSC Playground shade, Dhaka University",
            startedAt = "10:00 AM Today",
            expiresInHours = 6,
            expiresAt = "04:00 PM Today"
        )
    )
    val vendorCheckIn: StateFlow<VendorCheckIn> = _vendorCheckIn.asStateFlow()

    fun addBusiness(business: Business) {
        _businesses.update { listOf(business) + it }
    }

    fun addProduct(businessId: String, product: Product) {
        _businesses.update { list ->
            list.map { if (it.id == businessId) it.copy(products = listOf(product) + it.products) else it }
        }
    }

    fun toggleProductAvailability(businessId: String, productId: String) {
        _businesses.update { list ->
            list.map { b ->
                if (b.id == businessId) {
                    b.copy(products = b.products.map { p -> if (p.id == productId) p.copy(isAvailable = !p.isAvailable) else p })
                } else b
            }
        }
    }
}`,
    },
    models: {
      filename: 'Models.kt',
      language: 'kotlin',
      content: `package com.nearme.app.model

enum class UserRole { CUSTOMER, BUSINESS_OWNER }

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
    val unit: String,
    val category: String,
    val isAvailable: Boolean = true,
    val description: String = ""
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
    val rating: Double = 4.8,
    val reviewCount: Int = 120,
    val products: List<Product> = emptyList()
)

data class VendorCheckIn(
    val businessId: String,
    val businessName: String,
    val category: BusinessCategory,
    val isActive: Boolean = false,
    val currentAddress: String = "",
    val startedAt: String = "",
    val expiresInHours: Int = 4,
    val expiresAt: String = "",
    val note: String = ""
)`,
    },
    theme: {
      filename: 'Color.kt & Theme.kt',
      language: 'kotlin',
      content: `package com.nearme.app.ui.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.material3.*
import androidx.compose.runtime.Composable

val ForestGreen = Color(0xFF16834A)
val ForestGreenDark = Color(0xFF0E5E34)
val LightGreen = Color(0xFFE8F5EC)
val PureWhite = Color(0xFFFFFFFF)
val DarkCharcoal = Color(0xFF202124)
val AccentOrange = Color(0xFFFF9F43)

private val LightColorScheme = lightColorScheme(
    primary = ForestGreen,
    onPrimary = PureWhite,
    primaryContainer = LightGreen,
    secondary = AccentOrange,
    background = PureWhite,
    onBackground = DarkCharcoal,
    surface = PureWhite,
    onSurface = DarkCharcoal
)

@Composable
fun NearMeTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography,
        content = content
    )
}`,
    },
    gradle: {
      filename: 'app/build.gradle.kts',
      language: 'kotlin',
      content: `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.nearme.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.nearme.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3:1.2.0")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.7.7")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("io.coil-kt:coil-compose:2.5.0")
}`,
    },
  };

  const currentSnippet = activeTab !== 'architecture' ? codeSnippets[activeTab] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#16834A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">
                  Android Studio & Jetpack Compose Inspector
                </h3>
                <span className="text-[10px] font-bold bg-[#FF9F43] text-white px-2 py-0.5 rounded-full">
                  University Project Source
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                Pristine native Kotlin codebase structured under <code>/android</code> for immediate Android Studio import.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCodeInspectorOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('mainActivity')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mainActivity'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-purple-600" />
            <span>MainActivity.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('viewModel')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'viewModel'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-blue-600" />
            <span>NearMeViewModel.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('repository')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'repository'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-emerald-600" />
            <span>NearMeRepository.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'models'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-600" />
            <span>Models.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('theme')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'theme'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-teal-600" />
            <span>Theme.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gradle'
                ? 'bg-white text-[#16834A] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-neutral-600" />
            <span>build.gradle.kts</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-900 text-neutral-100 font-mono text-xs">
          {activeTab === 'architecture' ? (
            <div className="font-sans space-y-6 text-neutral-200">
              <div className="bg-neutral-800 p-5 rounded-2xl border border-neutral-700 space-y-3">
                <div className="flex items-center gap-2 text-[#16834A] font-black text-sm">
                  <GraduationCap className="w-5 h-5" />
                  <span>University Project Architecture: MVVM Pattern</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  NearMe implements Google's recommended Android architecture with unidirectional data flow (UDF).
                  All state resides in <code>StateFlow</code> streams inside the <code>NearMeViewModel</code> and
                  <code>NearMeRepository</code>, keeping UI composables completely stateless and declarative.
                </p>

                {/* Architecture Flow Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-700">
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase">1. Presentation Layer</span>
                    <strong className="text-white block mt-1">Jetpack Compose UI</strong>
                    <span className="text-[11px] text-neutral-400 block mt-1">Material 3 • NavHost • Top/Bottom Bars</span>
                  </div>

                  <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-700">
                    <span className="text-[10px] font-bold text-blue-400 block uppercase">2. State Management</span>
                    <strong className="text-white block mt-1">NearMeViewModel</strong>
                    <span className="text-[11px] text-neutral-400 block mt-1">StateFlow streams • Coroutines • Filters</span>
                  </div>

                  <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-700">
                    <span className="text-[10px] font-bold text-amber-400 block uppercase">3. Data Layer</span>
                    <strong className="text-white block mt-1">NearMeRepository</strong>
                    <span className="text-[11px] text-neutral-400 block mt-1">Local Mock (Phase 1) ➔ Firestore (Phase 2)</span>
                  </div>
                </div>
              </div>

              {/* Ready for Phase 2 Firebase & Google Maps */}
              <div className="bg-neutral-800 p-5 rounded-2xl border border-neutral-700 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF9F43]" />
                  <span>Phase 2 Extension Guide (Firebase & Google Maps)</span>
                </h4>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF9F43] font-bold">1. Firebase Auth:</span>
                    <span>Plug in <code>FirebaseAuth.getInstance().signInWithPhoneNumber(...)</code> into <code>NearMeViewModel.login()</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF9F43] font-bold">2. Cloud Firestore:</span>
                    <span>Replace the <code>MutableStateFlow</code> in <code>NearMeRepository</code> with Firestore snapshots on <code>/businesses</code> and <code>/checkins</code> collections.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF9F43] font-bold">3. Google Maps SDK:</span>
                    <span>Replace <code>MockMapCanvas</code> with <code>com.google.maps.android.compose.GoogleMap</code> and <code>MarkerComposable</code>.</span>
                  </li>
                </ul>
              </div>

              {/* Android Studio Import Steps */}
              <div className="bg-neutral-800 p-5 rounded-2xl border border-neutral-700 space-y-2 text-xs">
                <h4 className="text-sm font-bold text-white">How to Run in Android Studio:</h4>
                <ol className="list-decimal list-inside space-y-1 text-neutral-300">
                  <li>Open Android Studio (Ladybug / Koala / Hedgehog).</li>
                  <li>Click <strong>Open</strong> and choose the <code>android/</code> folder generated in this repository.</li>
                  <li>Gradle will automatically sync with Kotlin 1.9+ and Android API 35.</li>
                  <li>Launch on a Pixel emulator or connected device.</li>
                </ol>
              </div>
            </div>
          ) : (
            currentSnippet && (
              <div className="relative">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
                  <span className="text-emerald-400 font-bold">{currentSnippet.filename}</span>
                  <button
                    onClick={() => copyToClipboard(currentSnippet.content)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-sans text-xs transition-colors cursor-pointer border border-neutral-700"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-neutral-300">
                  <code>{currentSnippet.content}</code>
                </pre>
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between shrink-0 text-xs">
          <div className="text-neutral-500 font-medium">
            Files location: <code className="text-[#16834A] font-bold">android/app/src/main/java/com/nearme/app/</code>
          </div>
          <button
            onClick={() => setIsCodeInspectorOpen(false)}
            className="px-4 py-2 rounded-xl bg-[#16834A] text-white font-bold hover:bg-[#0E5E34] transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
