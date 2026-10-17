# Activity 4: App Navigation - LokalPH (Philippine Heritage E-Commerce Mobile App)

A multi-screen mobile application built using **React Native** and **React Navigation** (`createNativeStackNavigator`), celebrating authentic Philippine craftsmanship, indigenous weaves, regional delicacies, and handmade cultural treasures.

---

## 🇵🇭 Project Overview: LokalPH

**LokalPH** is an e-commerce mobile application dedicated to *"Tangkilikin ang Sariling Atin"* (supporting local Filipino artisans). The app showcases authentic products from various regions across Luzon, Visayas, and Mindanao—ranging from Lumban Barong Tagalog and Benguet Arabica Coffee to Palawan South Sea Pearls and T'boli T'nalak weave totes.

---

## 📋 Required Features Checklist

| Requirement | Implementation Detail in LokalPH | Status |
| :--- | :--- | :---: |
| **1. `<NavigationContainer>` & `createNativeStackNavigator`** | Configured in `App.js` with header themes and registered screens. | ✅ Complete |
| **2. Minimum of 3 Distinct Screens** | App provides **4 distinct screens**: `HomeScreen`, `ProductList`, `ProductDetails`, and `OrderSummary`. | ✅ Exceeded (4 screens) |
| **3. Forward Navigation (`navigation.navigate`)** | • `HomeScreen` → `ProductList` (via *Explore Products* CTA & Category chips)<br>• `HomeScreen` → `ProductDetails` (via Featured Items)<br>• `ProductList` → `ProductDetails` (tapping any product card)<br>• `ProductDetails` → `OrderSummary` (tapping *Bumili Na / Order Now*) | ✅ Complete |
| **4. Manual Reverse Navigation (`navigation.goBack`)** | Custom back buttons explicitly demonstrating `navigation.goBack()` in:<br>• `ProductList.js` (`← Back to Home`)<br>• `ProductDetails.js` (`← Back to Catalog` & `← Return to Product Catalog`)<br>• `OrderSummary.js` (`← Edit Quantity / Back`) | ✅ Complete |
| **5. Passing Data Objects via `route.params`** | • `HomeScreen` passes `{ selectedCategory }` to `ProductList`<br>• `ProductList` passes full `{ product }` object (id, name, price, region, artisan, rating, description, highlights) to `ProductDetails`<br>• `ProductDetails` passes `{ product, quantity, totalPrice }` to `OrderSummary` | ✅ Complete |
| **6. Submission Compliance** | Only necessary source files included; no `node_modules` or bulky system files. | ✅ Complete |

---

## 🗂️ Project File Structure

```text
Activity-4-App-Navigation/
├── App.js               # Root component: NavigationContainer & Stack.Navigator configuration
├── HomeScreen.js        # Screen 1: Welcome hero banner, Philippine artisan mission & category shortcuts
├── ProductList.js       # Screen 2: Catalog list with search, category filtering & item selection
├── ProductDetails.js    # Screen 3: Item details, specs, quantity counter & custom goBack() button
├── OrderSummary.js      # Screen 4: Checkout preview, Philippine payment options & order confirmation
├── productsData.js      # Mock data array with 8 authentic Philippine artisan products & categories
├── globalStyles.js      # Shared design system (colors, buttons, badges, card elevations)
├── package.json         # Project metadata and dependencies (@react-navigation/native-stack, etc.)
└── README.md            # Complete project documentation and navigation guide
```

---

## 🧭 Navigation & Screen Flow Diagram

```
                 ┌────────────────────────────┐
                 │       HomeScreen.js        │
                 │   (🇵🇭 Welcome & Mission)   │
                 └─────────────┬──────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            │ navigation.navigate('ProductList',  │ navigation.navigate('ProductDetails',
            │   { selectedCategory })             │   { product })
            ▼                                     ▼
┌────────────────────────────┐         ┌────────────────────────────┐
│       ProductList.js       │         │     ProductDetails.js      │
│   (Artisan Catalog List)   │────────▶│ (Detailed Cultural Specs)  │
└─────────────▲──────────────┘         └──────────────┬─────────────┘
              │ navigation.goBack()                   │ navigation.navigate('OrderSummary',
              │                                       │   { product, quantity, totalPrice })
              │                                       ▼
              │                        ┌────────────────────────────┐
              │                        │      OrderSummary.js       │
              │                        │ (Checkout, GCash/COD, PH)  │
              │                        └──────────────┬─────────────┘
              │                                       │
              └───────── navigation.goBack() ─────────┘ (or navigation.navigate('Home'))
```

---

## 🔍 Detailed Screen Descriptions & Code Highlights

### 1. `App.js` (Routing Setup)
- Wraps the application inside `<NavigationContainer>`.
- Creates native stack routing using `createNativeStackNavigator()`.
- Establishes a warm, Philippine artisan aesthetic (Mahogany/Terracotta header `#78350F` and white text).

```javascript
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 2. `HomeScreen.js` (Landing / Discovery)
- Introduces the advocacy: *Tangkilikin ang Sariling Atin*.
- Allows tapping category chips (`Wearables`, `Food & Beverage`, `Home & Living`, `Handicrafts`, `Jewelry`) which pass parameters forward:
  ```javascript
  navigation.navigate('ProductList', { selectedCategory: 'Wearables' });
  ```
- Features spotlight cards linking directly to item details:
  ```javascript
  navigation.navigate('ProductDetails', { product: item });
  ```

### 3. `ProductList.js` (Catalog / List Screen)
- Receives optional category filter via `route.params?.selectedCategory`.
- Includes live search filtering by title, artisan, region, or craft.
- Features custom manual reverse navigation button:
  ```javascript
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text>← Back to Home</Text>
  </TouchableOpacity>
  ```
- Passes full product object on item tap:
  ```javascript
  navigation.navigate('ProductDetails', { product: item });
  ```

### 4. `ProductDetails.js` (Item Details Screen)
- Consumes the passed `route.params.product`:
  ```javascript
  const { product } = route.params || {};
  ```
- Displays rich details: artisan name, regional origin (`📍 Lumban, Laguna`), specifications, price in Philippine Peso (`₱`), and user quantity selector (`+` / `-`).
- Features a prominent **custom back button** demonstrating manual reverse navigation:
  ```javascript
  <TouchableOpacity style={styles.customBackButton} onPress={() => navigation.goBack()}>
    <Text>← Back to Catalog</Text>
  </TouchableOpacity>
  ```
- Forward navigation to checkout:
  ```javascript
  navigation.navigate('OrderSummary', { product, quantity, totalPrice });
  ```

### 5. `OrderSummary.js` (Checkout & Order Receipt)
- Consumes `{ product, quantity, totalPrice }` passed from `ProductDetails`.
- Displays local Philippine shipping calculation and payment options (`GCash`, `Maya`, `Cash on Delivery`).
- Features `navigation.goBack()` to allow returning to the details screen to edit quantity.
- Simulates order placement and allows returning to root home via `navigation.navigate('Home')`.

---

## 📦 Mock Philippine Products Dataset (`productsData.js`)

1. **Lumban Heritage Barong Tagalog** (Lumban, Laguna) - ₱4,200
2. **Benguet Highland Arabica Beans (500g)** (Atok, Benguet) - ₱480
3. **Ilocos Inabel Handwoven Blanket** (Vigan, Ilocos Sur) - ₱1,750
4. **Cebu Solid Mango Wood Ukulele** (Lapu-Lapu City, Cebu) - ₱2,950
5. **Palawan Golden South Sea Pearl Pendant** (Coron, Palawan) - ₱6,800
6. **Bicol Mayon Pili Nut Treats (Set of 3)** (Naga City, Camarines Sur) - ₱380
7. **T'boli T'nalak & Abaca Everyday Tote** (Lake Sebu, South Cotabato) - ₱1,350
8. **Guimaras Sun-Ripened Mango Spread (300g)** (Jordan, Guimaras) - ₱260

---

## 🚀 How to Run

### Option A: Using Expo Go (Quickest)
1. Ensure Node.js is installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the project:
   ```bash
   npx expo start
   ```
4. Scan the QR code using the **Expo Go** app on your iOS or Android device.

### Option B: Expo Snack (Web Preview)
You can directly paste `App.js`, `HomeScreen.js`, `ProductList.js`, `ProductDetails.js`, `OrderSummary.js`, `productsData.js`, and `globalStyles.js` into [snack.expo.dev](https://snack.expo.dev) to preview in your web browser.