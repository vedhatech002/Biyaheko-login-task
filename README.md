# 📱 Biyaheko Task – React Native App

## 📌 Overview

This project is a **cross-platform mobile application** built using **React Native with Expo**.  
It demonstrates key app development concepts such as:

- **Authentication with validation** (Login & Signup)
- **Drawer navigation** with a reusable custom header
- **Reusable form components** (Text, Password, Date, Dropdown)
- **Form validation** (client-side + API-level errors)
- **Context API integration** for authentication state management
- **EAS Build setup** for generating Android & iOS builds

✅ Built to be scalable, modular, and production-ready.

---

## 🛠️ Tech Stack

- **React Native (Expo SDK)** → Core app framework
- **React Navigation** → Drawer & Stack navigation
- **React Hook Form** → Form management
- **Zod Validation Schema** → Validation logic (`formSchema.js`)
- **Expo Vector Icons (Ionicons)** → Icons across the app
- **DateTimePicker** → Date of birth selection
- **React Native Picker** → Dropdown for country/state selection
- **Context API** → Handles authentication logic (login, signup, user state)
- **Expo EAS Build** → Cloud builds for Android & iOS

---

## 📂 Project Structure

```
/Biyaheko-task
├── /assets
│   └── Logo, background images
├── /src
│   ├── /components
│   │   ├── AppHeader.js
│   │   ├── ControlledInput.js
│   │   ├── CustomDrawerContent.js
│   ├── /screens
│   │   ├── HomeScreen.js
│   │   ├── MyAccountScreen.js
│   │   ├── LoginScreen.js
│   │   └── RegisterScreen.js
│   ├── /navigation
│   │   ├── AppStack.js
│   │   └── AuthStack.js
│   ├── /layout
│   │   └── AuthLayout.js
│   ├── /context
│   │   └── AuthContext.js
│   └── /utils
│       └── formSchema.js
├── App.js
├── app.json
└── eas.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/<your-username>/Biyaheko-task.git
cd Biyaheko-task
```

### 2. Install dependencies

```
npm install
# or
yarn install
```

### 3. Run in development with Expo Go

```
npx expo start
```

- Scan the QR code using **Expo Go** app on Android or iOS.
- The app reloads automatically when you make changes.

---

## 📱 Running on Emulator

### Android Emulator

```
npx expo run:android
```

### iOS Simulator (Mac Required)

```
npx expo run:ios
```

⚠️ Note: iOS builds **cannot be generated on Windows**.  
They require **macOS + Xcode** or Expo Cloud builds.

---

## 📦 Building the App (EAS Build)

We use **EAS (Expo Application Services)** for generating builds.

### `eas.json` configuration:

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "ios": { "simulator": false }
    },
    "production": {
      "distribution": "store",
      "android": { "buildType": "app-bundle" },
      "ios": { "simulator": false }
    }
  }
}
```

### Commands:

- **Preview Build (APK for internal testing)**
  ```
  eas build --profile preview --platform android
  ```
- **Production Build (Google Play AAB)**
  ```
  eas build --profile production --platform android
  ```
- **iOS Build (Expo Cloud – requires Apple ID & Developer Account)**
  ```
  eas build --profile production --platform ios
  ```

⚠️ On **Windows**, only **Android APKs** are directly testable.  
For iOS, Expo Cloud handles builds but requires Apple Developer credentials.

---

## ✅ Form Validations

- **Login Form**
  - Required field validation
  - API errors → _User not found_
- **Register Form**
  - Email format validation
  - Password & Confirm Password match
  - Date of Birth validation
  - Country & State required
  - API errors → _Email already exists_

All validation logic lives in:  
📌 `src/utils/formSchema.js` integrated with **React Hook Form**.

---

## 📸 Screenshots

## 🎥 Demo Video

[Download Demo Video](https://github.com/<username>/<repo>/assets/12345678/demo.mp4)

## 📥 Download APK

👉 [Download Latest APK](https://github.com/<your-username>/<your-repo>/releases/download/v1.0.0/app-release.apk)

## 📜 License

This project is provided for **demo and interview assessment purposes only**.
