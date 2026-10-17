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
├── App.js                   # Root entry point forwarding to src/App.js
├── package.json             # Project metadata and dependencies (@react-navigation/native-stack, etc.)
├── README.md                # Complete project documentation and navigation guide
└── src/                     # Editable Application Source Files
    ├── App.js               # NavigationContainer & Stack.Navigator configuration
    ├── HomeScreen.js        # Screen 1: Welcome hero banner, Philippine artisan mission & category shortcuts
    ├── ProductList.js       # Screen 2: Catalog list with search, category filtering & item selection
    ├── ProductDetails.js    # Screen 3: Item details, specs, quantity counter & custom goBack() button
    ├── OrderSummary.js      # Screen 4: Checkout preview, Philippine payment options & order confirmation
    ├── productsData.js      # Mock data array with 8 authentic Philippine artisan products & categories
    └── globalStyles.js      # Shared design system (colors, buttons, badges, card elevations)
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

## 📦 Philippine Products Dataset from Likhaan.com (`src/productsData.js`)

1. **Rosa Bomber Barong Jacket** by *Happy Andrada* (Quezon City) - ₱15,000
2. **Leonor Heels (Beige)** by *Zapateria* (Marikina City) - ₱12,500
3. **Tadhana Handbag** by *Ding Perez / Etniko Pilipino* (Cordillera) - ₱2,375
4. **Roby's Pick Bamboo Tumbler** by *Robelyn Gurang* (Rizal) - ₱1,350
5. **Isla Hand Embroidered Earrings** by *Ruby Thursday More* (Iloilo) - ₱1,799
6. **Lucine Embroidered Necklace (Salmon)** by *Ruby Thursday More* (Iloilo) - ₱1,999
7. **Sengkaling Door Chime** by *Sesotunawa / T'boli Tribe* (Lake Sebu) - ₱1,600
8. **Brigitte Soluk Rattan Handbag** by *Racionamento* (Albay, Bicol) - ₱6,700
9. **Hive Moss Art Living Frame** by *Marvin Conti* (Batangas) - ₱3,899
10. **Denim Katsa Romper Washington** by *Cris Lyca Faustino* (Bulacan) - ₱1,800

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