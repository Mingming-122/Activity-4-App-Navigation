// App.js
// Root Application with React Navigation NavigationContainer and createNativeStackNavigator

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './HomeScreen';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import OrderSummary from './OrderSummary';

// Theme Styles
import { COLORS } from './globalStyles';

// Initialize the Native Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primaryDark,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '800',
            fontSize: 18,
          },
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        {/* Screen 1: Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '🇵🇭 LokalPH • Likhang Pinoy',
            headerTitleAlign: 'center',
          }}
        />

        {/* Screen 2: Catalog / Product List Screen */}
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{
            title: 'Philippine Artisan Catalog',
            headerTitleAlign: 'center',
          }}
        />

        {/* Screen 3: Product Details Screen */}
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ route }) => ({
            title: route?.params?.product?.name
              ? route.params.product.name.split(' ')[0] + ' Details'
              : 'Product Details',
            headerTitleAlign: 'center',
          })}
        />

        {/* Screen 4: Order Summary / Checkout Screen */}
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
          options={{
            title: 'Checkout & Delivery',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
