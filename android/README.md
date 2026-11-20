# NearMe – Local Business & Street Vendor Discovery App
**Final-Semester University Software Engineering Project (Phase 1)**

---

## 1. Project Overview
**NearMe** is a native Android application built with **Kotlin** and **Jetpack Compose** following modern **Material 3** guidelines and **MVVM** architecture. The application bridges the discovery gap between local consumers and neighborhood merchants, corner grocery stores, and mobile street vendors in Bangladesh.

---

## 2. Technology Stack
* **Language:** Kotlin (1.9+)
* **UI Toolkit:** Jetpack Compose (BOM 2024.02+)
* **Design System:** Material Design 3 (M3)
* **Architecture:** MVVM (Model-View-ViewModel) + Repository Pattern
* **Navigation:** Navigation Compose (`NavHost`, `rememberNavController`)
* **State Management:** Reactive `StateFlow` & Coroutines
* **Currency:** Bangladeshi Taka (৳ BDT)

---

## 3. Project Directory Structure
```
android/
├── build.gradle.kts
├── settings.gradle.kts
└── app/
    ├── build.gradle.kts
    └── src/
        └── main/
            ├── AndroidManifest.xml
            └── java/com/nearme/app/
                ├── MainActivity.kt
                ├── data/
                │   └── MockData.kt               // 10+ Bangladesh businesses & products
                ├── model/
                │   └── Models.kt                 // Business, Product, VendorCheckIn, UserRole
                ├── repository/
                │   └── NearMeRepository.kt       // Reactive StateFlow repository
                ├── viewmodel/
                │   └── NearMeViewModel.kt        // Search, filters, check-in state
                ├── navigation/
                │   └── NearMeNavigation.kt       // Jetpack Compose Screen routes
                └── ui/
                    └── theme/
                        ├── Color.kt              // Forest Green, Light Green, Orange
                        ├── Theme.kt              // NearMeTheme Material 3
                        └── Type.kt               // Typography scale
```

---

## 4. Key Features Implemented (Phase 1)
1. **Dual Role Separation:** Dedicated Customer and Business Owner experiences.
2. **Dynamic Radius Discovery:** 500m, 1km, 3km, and 5km walking radius filters.
3. **Street Vendor Live Check-In:** *"I'm Selling Here Today"* broadcasting with custom spots and expiry timers.
4. **Product Catalog:** Real local products (Miniket Rice, Malai Cha, Fuchka, Beef Tehari) priced in ৳ BDT.
5. **Interactive Map Preview:** Vector canvas showing business pins, customer location radar, and live vendor badges.
6. **Owner Management:** Full business profile editing, product inventory CRUD, and stock availability toggles.

---

## 5. How to Run in Android Studio
1. Open **Android Studio** (Koala / Ladybug or newer recommended).
2. Choose **Open Project** and navigate to the `android/` directory.
3. Allow Gradle to sync dependencies (JDK 17 required).
4. Run on an Android Emulator (Pixel 8 / API 34+ recommended) or physical device.

---

## 6. Phase 2 Roadmap
* **Firebase Authentication:** Phone OTP verification for vendors and customers.
* **Cloud Firestore:** Real-time synchronized streams replacing local `MockData`.
* **Google Maps Platform SDK:** Custom marker clustering and turn-by-turn routing.
