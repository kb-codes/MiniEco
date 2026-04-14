# MiniEco

MiniEco is a modern e-commerce React Native application built with Expo. It implements a robust MVVM pattern using Redux for state management, SQLite for offline persistence, and the DummyJSON API.

## 🚀 Project Setup Steps

1. **Clone the repository** (if applicable) and navigate to the root directory:
   ```bash
   cd MiniEco
   ```

2. **Install dependencies**:
   Make sure you have Node installed, then run:
   ```bash
   npm install
   ```
   *(Note: The app relies on packages like `expo-sqlite`, `@react-native-community/netinfo`, `expo-linear-gradient`, `@reduxjs/toolkit`, and `react-redux`. These should install automatically via the command above.)*

3. **Start the Expo server**:
   ```bash
   npx expo start
   ```

4. **Run the App**:
   - Press `a` to open on an Android emulator.
   - Press `i` to open on an iOS simulator.
   - Or scan the QR code using the Expo Go app on your physical device.

---

## 📁 Folder Structure

```
d:\MiniEco
├── App.tsx                     # Entry point (initializes Redux Provider & SQLite DB)
├── src/
│   ├── components/             # Reusable UI components (SuperText, Spacer, Button, etc.)
│   ├── constants/              # App-wide constants (e.g., responsive screen dimensions wp/hp)
│   ├── res/                    # Shared resources (colors, typography, global strings)
│   ├── routes/                 # React Navigation setup (RootNavigation)
│   ├── screens/                # UI Layer (Screens like ProductList & ProductDetails)
│   │   ├── productList/        # List view logic and styles
│   │   └── productDetails/     # Detail view logic and styles
│   ├── services/               # Core business/data logic (API, SQLite, Network)
│   ├── store/                  # Redux Toolkit configuration and slices (State Layer)
│   └── viewModels/             # Custom Hooks separating UI from State logic (MVVM)
```

---

## 🏗 Architectural Approach

### 1. API Handling
- Data is fetched from **[DummyJSON](https://dummyjson.com/)**.
- **Service Layer**: API calls are strictly decoupled from UI views. Network requests exist in `src/services/api.ts`.
- **Pagination**: The Product List relies on DummyJSON's built-in `skip` and `limit` query parameters, scaling properly via infinite scroll (`onEndReached` inside `FlatList`).

### 2. State Management (Redux + MVVM)
- **Store**: Built with `@reduxjs/toolkit` (`src/store/slices/productSlice.ts`).
- **Thunks**: Complex async events (fetching, reloading, pagination) are tracked via Redux Thunks, giving precise `loading`, `refreshing`, and `loadingMore` flags.
- **MVVM Pattern**: Screens do not manipulate state directly. They subscribe to Redux and dispatch actions strictly through **ViewModels** (e.g. `useProductListViewModel.ts`). This heavily cleans up the `.tsx` components, making them solely responsible for rendering visuals.

### 3. Error Handling
- Evaluated uniformly across the `createAsyncThunk` flow. Failures throw `rejectWithValue`, which captures the error message in the Redux store.
- **Visual Feedback**:
  - Empty Data states automatically trigger comprehensive `ListEmptyComponent` views.
  - Critical errors render a fallback screen with a **"Try Again"** button allowing the user to seamlessly retry the fetch logic natively.

### 4. Offline Support
- **Connectivity Listening**: Handled tightly by `@react-native-community/netinfo` natively observing network statuses.
- **SQLite Persistence**: `expo-sqlite` actively syncs fetched payloads straight into a local `.db` table row by row on successful API calls.
- **Failover**: If the app loads without internet (`isConnected === false`), the database Service (`src/services/database.ts`) is queried, rendering perfectly cached products.
- **UI Warning**: Users gracefully receive a red "You're offline. Viewing cached data." banner instantly driving clarity.
