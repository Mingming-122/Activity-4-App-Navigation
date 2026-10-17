// OrderSummary.js
// Order Confirmation & Checkout Screen demonstrating multi-screen parameter passing,
// reverse navigation (navigation.goBack()), and root navigation (navigation.navigate('Home'))

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { globalStyles, COLORS } from './globalStyles';

export default function OrderSummary({ route, navigation }) {
  // Read params passed from ProductDetails
  const { product, quantity = 1, totalPrice } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState('GCash');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // If accessed without params, provide safe fallback
  if (!product) {
    return (
      <View style={[globalStyles.container, styles.emptyContainer]}>
        <Text style={styles.emptyIcon}>🛍️</Text>
        <Text style={styles.emptyTitle}>Walang Aktibong Order</Text>
        <Text style={styles.emptyDesc}>No item has been selected for checkout yet.</Text>
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={globalStyles.primaryButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const shippingFee = 120; // Standard Philippine Archipelago Courier Fee
  const grandTotal = (totalPrice || product.price * quantity) + shippingFee;

  const paymentOptions = [
    { id: 'GCash', label: 'GCash (PH e-Wallet)', icon: '📱' },
    { id: 'Maya', label: 'Maya (PayMaya)', icon: '💳' },
    { id: 'COD', label: 'Cash on Delivery (COD)', icon: '💵' },
  ];

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Navigation Strip */}
        <View style={styles.topActionRow}>
          {/* Manual Reverse Navigation via navigation.goBack() */}
          <TouchableOpacity
            style={styles.customBackButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.customBackButtonText}>← Edit Quantity / Back</Text>
          </TouchableOpacity>

          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>Step 2 of 2: Checkout</Text>
          </View>
        </View>

        {orderPlaced ? (
          /* Success Confirmation View */
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Salamat sa Pag-Order!</Text>
            <Text style={styles.successSubtitle}>
              Your purchase directly empowers the artisans of {product.region}.
            </Text>

            <View style={styles.receiptBox}>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Order Ref:</Text>
                <Text style={styles.receiptValue}>LKL-2026-PH{Math.floor(1000 + Math.random() * 9000)}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Product:</Text>
                <Text style={styles.receiptValue}>{product.name}</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Quantity:</Text>
                <Text style={styles.receiptValue}>{quantity} item(s)</Text>
              </View>
              <View style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>Payment Method:</Text>
                <Text style={styles.receiptValue}>{paymentMethod}</Text>
              </View>
              <View style={[styles.receiptRow, styles.receiptTotalRow]}>
                <Text style={styles.receiptTotalLabel}>Grand Total Paid:</Text>
                <Text style={styles.receiptTotalAmount}>₱{grandTotal.toLocaleString()}</Text>
              </View>
            </View>

            {/* Navigation back to Root Home Screen */}
            <TouchableOpacity
              style={[globalStyles.primaryButton, styles.returnHomeBtn]}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={globalStyles.primaryButtonText}>Return to Home Store</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.browseMoreBtn}
              onPress={() => navigation.navigate('ProductList')}
            >
              <Text style={styles.browseMoreText}>Explore More Local Crafts →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Checkout Breakdown View */
          <View style={styles.bodyWrapper}>
            <Text style={styles.screenHeading}>Order Summary</Text>
            <Text style={styles.screenSubtitle}>
              Review your Philippine artisan item details before placing the order.
            </Text>

            {/* Product Summary Card with passed data */}
            <View style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.thumbImage} resizeMode="cover" />

              <View style={styles.productDetails}>
                <View style={styles.regionTag}>
                  <Text style={styles.regionTagText}>📍 {product.region}</Text>
                </View>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.artisanName}>Maker: {product.artisan}</Text>

                <View style={styles.priceBreakdownRow}>
                  <Text style={styles.unitCalc}>
                    ₱{product.price.toLocaleString()} × {quantity}
                  </Text>
                  <Text style={styles.itemSubtotal}>₱{totalPrice.toLocaleString()}</Text>
                </View>
              </View>
            </View>

            {/* Delivery Address Section (PH Local Context) */}
            <View style={styles.cardSection}>
              <View style={styles.cardSectionHeader}>
                <Text style={styles.sectionTitle}>📍 Delivery Address (Philippines)</Text>
              </View>
              <Text style={styles.addressName}>Juan dela Cruz (+63 917 123 4567)</Text>
              <Text style={styles.addressLine}>Unit 4B, Katipunan Heritage Residences</Text>
              <Text style={styles.addressLine}>Loyola Heights, Quezon City, Metro Manila 1108</Text>
              <Text style={styles.deliveryNote}>Estimated Courier Transit: {product.leadTime}</Text>
            </View>

            {/* Payment Method Selector */}
            <View style={styles.cardSection}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <Text style={styles.sectionHelper}>Select how you wish to pay:</Text>

              {paymentOptions.map((option) => {
                const isSelected = paymentMethod === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.paymentOption,
                      isSelected && styles.paymentOptionSelected,
                    ]}
                    onPress={() => setPaymentMethod(option.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.paymentIcon}>{option.icon}</Text>
                    <Text
                      style={[
                        styles.paymentText,
                        isSelected && styles.paymentTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && styles.radioCircleSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Price Breakdown */}
            <View style={styles.cardSection}>
              <Text style={styles.sectionTitle}>Price Breakdown</Text>

              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Items Subtotal ({quantity} pc):</Text>
                <Text style={styles.costValue}>₱{totalPrice.toLocaleString()}</Text>
              </View>

              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Inter-Island Courier Shipping:</Text>
                <Text style={styles.costValue}>₱{shippingFee.toLocaleString()}</Text>
              </View>

              <View style={styles.costRow}>
                <Text style={styles.costLabel}>Artisan Community Support:</Text>
                <Text style={[styles.costValue, { color: COLORS.secondary }]}>Included (100%)</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total (PHP):</Text>
                <Text style={styles.totalAmount}>₱{grandTotal.toLocaleString()}</Text>
              </View>
            </View>

            {/* Place Order CTA Button */}
            <TouchableOpacity
              style={[globalStyles.primaryButton, styles.placeOrderBtn]}
              activeOpacity={0.88}
              onPress={handlePlaceOrder}
            >
              <Text style={globalStyles.primaryButtonText}>
                Place Order (Ipadala Na) • ₱{grandTotal.toLocaleString()}
              </Text>
            </TouchableOpacity>

            {/* Reverse Navigation Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>← Return to Product Details</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  topActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  customBackButton: {
    backgroundColor: '#EFEAE2',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFD8CC',
  },
  customBackButtonText: {
    color: COLORS.primaryDark,
    fontSize: 13,
    fontWeight: '800',
  },
  stepBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  bodyWrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  screenHeading: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 16,
  },
  thumbImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  regionTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  regionTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },
  productName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  artisanName: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  priceBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  unitCalc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  itemSubtotal: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 16,
  },
  cardSectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  sectionHelper: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  addressName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  addressLine: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  deliveryNote: {
    fontSize: 11,
    color: '#065F46',
    fontWeight: '700',
    marginTop: 6,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#FAF7F2',
  },
  paymentOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FEF3C7',
  },
  paymentIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  paymentText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  paymentTextSelected: {
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  costLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  costValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  placeOrderBtn: {
    marginTop: 4,
    marginBottom: 12,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEAE2',
  },
  successEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primaryDark,
    marginBottom: 6,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  receiptBox: {
    width: '100%',
    backgroundColor: '#FAF7F2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 24,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  receiptLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  receiptValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'right',
  },
  receiptTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 6,
    paddingTop: 10,
  },
  receiptTotalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  receiptTotalAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  returnHomeBtn: {
    width: '100%',
    marginBottom: 12,
  },
  browseMoreBtn: {
    paddingVertical: 8,
  },
  browseMoreText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
});
