# Student Nest — Mobile Application (React Native / Expo)

**Technology:** React Native 0.81, Expo 54, TypeScript, React Navigation, React Native Paper  
**Target Audience:** University Students & Landlords  
**Academic Thesis:** Bachelor of Science in Software Engineering, Middle East University (MEU)  

---

## 1. Application Overview
The **Student Nest Mobile App** is a cross-platform client (iOS & Android) designed for seamless student housing search, verified landlord interactions, and roommate discovery:

- **University Authentication:** Fast registration with student ID and academic email verification.
- **Interactive Housing Map:** Geolocation apartment browsing powered by `react-native-maps`.
- **Photo Galleries & Document Proofs:** High-resolution apartment walkthroughs with Cloudinary CDN integration.
- **Roommate Matching Questionnaire:** Interactive lifestyle habit sliders and preferences (sleep schedule, smoking, noise tolerance, study hours).
- **Digital Lease Tracking:** Real-time visibility into lease requests, status changes, and payment schedules.

---

## 2. Technical Architecture

```
student-nest/src/
├── api/             # HTTP clients, interceptors & endpoint contracts
├── app/             # Application lifecycle & global state providers
├── assets/          # Icons, branding assets, custom illustrations
├── components/      # Reusable UI component library (inputs, buttons, modals, cards)
├── context/         # React Context stores (AuthContext, ThemeContext)
├── features/        # Feature-driven modular structure:
│   ├── apartments/  # Apartment browsing, search filters, detail screens, map view
│   ├── auth/        # Login, registration, OTP validation, role selection
│   ├── dashboard/   # Landlord/Student personalized dashboards
│   └── lease/       # Lease creation, request approvals, contract views
├── hooks/           # Custom React hooks
├── navigation/      # React Navigation tree (Native Stack + Bottom Tabs)
├── theme/           # Design system tokens (typography, color palettes, spacing)
├── utils/           # Formatters, date helpers, string utilities
└── validation/      # Yup schema validation rules
```

---

## 3. Key Dependencies
- **Expo SDK 54 & React Native 0.81:** Modern runtime and native bridge.
- **`react-navigation/native-stack` & `bottom-tabs`:** Smooth native transitions.
- **`react-native-maps`:** Map clustering and pin markers for campus-adjacent housing.
- **`react-hook-form` & `yup`:** High-performance form state management with strict schema validation.
- **`react-native-paper`:** Material Design component ecosystem.

---

## 4. Running the Mobile App

```bash
cd frontend/mobile/student-nest

# 1. Install dependencies
npm install

# 2. Start Expo development server
npx expo start

# 3. Launch on Android emulator or physical device
npm run android
# Or scan the QR code via the Expo Go app on your mobile phone
```
