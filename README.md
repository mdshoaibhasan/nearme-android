nearme-android
├── README.md                 # Main project documentation (already created & updated)
├── LICENSE                   # Apache-2.0 license file
├── .gitignore                # Ignores node_modules, dist, .env, Android build/ & .gradle/
├── .env.example              # Environment variable template (no secrets)
├── docs/                     # (Optional) Screenshots & demo GIFs for README
│   ├── customer-home.png
│   ├── map-view.png
│   └── vendor-checkin.png
├── android/                  # Native Android Studio project (Kotlin + Jetpack Compose)
│   ├── README.md
│   ├── build.gradle.kts
│   ├── settings.gradle.kts
│   └── app/
├── src/                      # Interactive Material 3 Web Prototype (React + TS)
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── screens/
│   └── types/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
