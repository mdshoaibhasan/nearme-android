# NearMe – Local Business & Street Vendor Discovery

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-1.9+-7F52FF?logo=kotlin&logoColor=white)
![Jetpack Compose](https://img.shields.io/badge/Jetpack_Compose-Material_3-4285F4?logo=android&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-16834A)

**NearMe** is a Material 3 Android discovery application designed to connect local consumers with neighborhood grocery stores (*mudir dokan*), street food stalls, tea *tongs*, pharmacies, and mobile street vendors in **Bangladesh** (priced in **৳ BDT**).

This repository contains both:
1. **Interactive Web Prototype (`src/`)** – A high-fidelity React + TypeScript + Tailwind CSS Material 3 Android simulator complete with a Pixel device frame toggle, instant Customer/Owner role switcher, and an in-app Android Studio Kotlin Code Inspector.
2. **Native Android Project (`android/`)** – A Jetpack Compose + Material 3 Kotlin codebase structured with MVVM, Navigation Compose, and reactive `StateFlow`.

---

## Features

### Customer Experience
- **Dynamic Radius Discovery:** Filter nearby shops and vendors within `500m`, `1km`, `3km`, or `5km`.
- **Category & Keyword Search:** Browse 9 local categories (*Grocery, Street Food, Tea Stall & Tong, Bakery & Snacks, Fresh Fruits, Vegetables, Meat & Fish, Pharmacy, Mobile Vendor*) or search by shop name, neighborhood area, or product name.
- **Interactive Map View:** Visual pin-based map canvas featuring customer location radar, business markers, and live street vendor badges.
- **Business Details & Product Catalog:** View opening hours, contact numbers, ratings, stock availability, and real-world Bangladesh product pricing in **৳ BDT** across 12 curated Dhaka businesses.
- **Saved Bookmarks:** Save and manage favorite neighborhood shops and stalls.

### Business Owner & Street Vendor Experience
- **Live Street Vendor Check-In (*"I'm Selling Here Today"*):** Mobile pushcart and stall vendors can broadcast their current location, custom note, and session expiry timer directly to nearby customers.
- **Owner Dashboard:** Monitor store status, active check-ins, and catalog counts at a glance.
- **Business Profile Management:** Add new businesses, edit store metadata and operating hours, and preview how the listing appears to customers.
- **Product Inventory CRUD:** Add, edit, delete, and toggle real-time **In Stock / Out of Stock** status for products.

### Prototype & Developer Tools
- **One-Click Role Switcher:** Instantly toggle between **Customer** and **Business Owner** flows from the top bar.
- **Device Frame Toggle:** Switch between a Pixel 8 Pro phone bezel and an expanded tablet/desktop view.
- **Android Studio Code Inspector:** Inspect the native Kotlin/Jetpack Compose architecture directly inside the web prototype.

---

## Screens Overview (25 Screens)

| Module | Screens |
| :--- | :--- |
| **Auth & Onboarding** | Splash, Welcome, Role Selection, Login, Register |
| **Customer** | Home, Search Businesses, Category Selection, Nearby List, Map View, Business Details, Product List, Customer Profile, Customer Settings |
| **Business Owner** | Owner Dashboard, Business Profile, Add Business, Edit Business, Business Preview, Manage Products, Add Product, Edit Product, Vendor Live Check-In, Owner Profile, Owner Settings |

---

## Tech Stack

### Interactive Web Prototype
- **Framework:** React 19 + Vite 8
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (Material 3 design tokens)
- **Icons & Motion:** `lucide-react`, `motion`
- **State Management:** React Context (`NearMeContext`)

### Native Android App (`android/`)
- **Language:** Kotlin (JVM 17, Min SDK 26 / Target SDK 35)
- **UI Toolkit:** Jetpack Compose + Material Design 3
- **Architecture:** MVVM (`NearMeViewModel`) + Repository Pattern (`NearMeRepository`)
- **Navigation:** Jetpack Navigation Compose (`NavHost`)
- **Async & State:** Kotlin Coroutines & `StateFlow`
- **Image Loading:** Coil Compose

---

## Project Structure

```text
.
├── android/                                   # Native Android Studio (Kotlin + Compose) project
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   ├── README.md
│   └── app/
│       ├── build.gradle.kts
│       └── src/main/
│           ├── AndroidManifest.xml
│           └── java/com/nearme/app/
│               ├── MainActivity.kt
│               ├── data/MockData.kt
│               ├── model/Models.kt
│               ├── navigation/NearMeNavigation.kt
│               ├── repository/NearMeRepository.kt
│               ├── viewmodel/NearMeViewModel.kt
│               └── ui/theme/                  # Color.kt, Theme.kt, Type.kt
├── src/                                       # Web-based Android Material 3 simulator
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/                            # Status bar, Nav bar, TopAppBar, Map canvas, Code Inspector
│   ├── context/NearMeContext.tsx              # App navigation, filters, CRUD & Check-In state
│   ├── data/mockData.ts                       # 12 Dhaka businesses & BDT product catalog
│   ├── types/nearme.ts                        # Domain models & ScreenId definitions
│   └── screens/
│       ├── customer/                          # Auth, Home, Search, Map, Details, Products, Profile
│       └── owner/                             # Dashboard, Business Forms, Products, Vendor Check-In
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### 1. Run the Interactive Web Prototype

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone the repository
git clone https://github.com/mdshoaibhasan/near_me.git
cd near_me

# Install dependencies
npm install

# Start the development server (runs on http://localhost:3000)
npm run dev
```

#### Available npm Scripts
- `npm run dev` – Start the Vite dev server on port `3000`
- `npm run build` – Create a production build in `dist/`
- `npm run preview` – Preview the production build locally
- `npm run lint` – Run TypeScript type checking (`tsc --noEmit`)

### 2. Run the Native Android Project

1. Open **Android Studio** (Koala / Ladybug or newer recommended) with **JDK 17**.
2. Click **Open** and select the `android/` folder inside this repository.
3. Wait for Gradle sync to finish.
4. Run the `app` configuration on an Android Emulator (API 26–35, Pixel 8 recommended) or a physical Android device.

---

## Design System (Material 3 Palette)

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Primary (Forest Green)** | `#16834A` | Top bars, primary actions, active indicators |
| **Secondary Container** | `#E8F5EC` | Chips, tinted surfaces, badges |
| **Accent (Warm Orange)** | `#FF9F43` | Live street vendor check-ins, highlights |
| **Surface** | `#F8FAF9` | Cards and elevated containers |
| **Text Primary / Secondary** | `#202124` / `#5F6368` | Typography hierarchy (`Roboto` & `JetBrains Mono`) |

---

## Phase 2 Roadmap

- [ ] **Firebase Authentication:** Phone OTP verification for customers and local merchants
- [ ] **Cloud Firestore:** Real-time synchronized business listings, stock updates, and live vendor check-ins
- [ ] **Google Maps Platform SDK:** Real GPS tracking, marker clustering, and turn-by-turn directions
- [ ] **Bangla & English Localization:** Full bilingual (`bn` / `en`) UI support

---

## Author

**Md Shoaib Hasan** – [@mdshoaibhasan](https://github.com/mdshoaibhasan)

---

## License

This project is licensed under the **Apache License 2.0**. See the SPDX headers in the source files for details.
