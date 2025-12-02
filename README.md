# Event Tracker

A simple, modern mobile application to track events and counts. Built with **React Native** and **Expo**.

## Features

-   **Track Events**: Create custom events (e.g., "Drank Water", "Exercise") and track how many times you do them.
-   **Persistent Data**: Data is saved locally on your device and persists across restarts.
-   **Modern UI**: Clean interface with smooth animations and haptic feedback.
-   **Dark Mode**: Toggle between Light and Dark themes.
-   **Offline First**: Works entirely offline without any backend.

## Tech Stack

-   **Framework**: React Native (Expo)
-   **Navigation**: Expo Router
-   **State Management**: React Context + Hooks
-   **Persistence**: AsyncStorage
-   **Animations**: React Native Reanimated
-   **Icons**: Lucide React Native

## Getting Started

### Prerequisites

-   Node.js installed
-   Expo Go app on your physical device (Android/iOS) OR an Emulator/Simulator

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd event-tracker
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Start the app:
    ```bash
    pnpm start
    ```

4.  **Run on Device**:
    -   Scan the QR code with the **Expo Go** app (Android) or Camera (iOS).
    -   Press `i` to run on iOS Simulator.
    -   Press `a` to run on Android Emulator.

## Building for Production (Android)

To build a standalone APK for Android:

1.  Install EAS CLI:
    ```bash
    pnpm add -g eas-cli
    ```

2.  Login to Expo:
    ```bash
    eas login
    ```

3.  Configure and Build:
    ```bash
    eas build:configure
    eas build -p android --profile preview
    ```

## Project Structure

-   `app/`: Screens and navigation (Expo Router).
-   `components/`: Reusable UI components.
-   `store/`: State management and data persistence logic.
