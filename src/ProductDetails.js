// ProductDetails.js
// Item Details Screen demonstrating parameter reception via route.params and manual reverse navigation via navigation.goBack()

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { globalStyles, COLORS } from './globalStyles';

export default function ProductDetails({ route, navigation }) {
  // 1. Receive data passed from Catalog/HomeScreen via route.params
  const { product } = route.params || {};

  const [quantity, setQuantity] = useState(1);

  // Fallback safety if accessed without parameters
  if (!product) {
    return (
      <View style={[globalStyles.container, styles.fallbackContainer]}>
        <Text style={styles.fallbackIcon}>⚠️</Text>
        <Text style={styles.fallbackTitle}>No Product Selected</Text>
        <Text style={styles.fallbackText}>Please choose an artisan product from the catalog.</Text>
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() => navigation.navigate('ProductList')}
        >
          <Text style={globalStyles.primaryButtonText}>Browse Catalog</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < (product.inStock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Action Row with CUSTOM REVERSE NAVIGATION BUTTON */}
        <View style={styles.topActionRow}>
          {/* Custom Button explicitly demonstrating navigation.goBack() */}
          <TouchableOpacity
            style={styles.customBackButton}
            activeOpacity={0.7}
            onPress={() => {
              // Manual reverse navigation as required
              navigation.goBack();
            }}
          >
            <Text style={styles.customBackButtonText}>← Back to Catalog</Text>
          </TouchableOpacity>

          <View style={styles.originPill}>
            <Text style={styles.originPillText}>🇵🇭 {product.region}</Text>
          </View>
        </View>

        {/* Hero Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                SAVE ₱{(product.originalPrice - product.price).toLocaleString()}
              </Text>
            </View>
          )}
        </View>

        {/* Product Information Card */}
        <View style={styles.detailsBody}>
          {/* Category & Stock Row */}
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{product.category}</Text>
            </View>
            <View style={styles.stockBadge}>
              <Text style={styles.stockBadgeText}>
                ✓ {product.inStock} Available in Stock
              </Text>
            </View>
          </View>

          {/* Product Name & Tagline */}
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productTagline}>{product.tagline}</Text>

          {/* Artisan & Region Info */}
          <View style={styles.artisanCard}>
            <Text style={styles.artisanIcon}>🧵</Text>
            <View style={styles.artisanInfo}>
              <Text style={styles.artisanTitle}>Artisan Guild</Text>
              <Text style={styles.artisanName}>{product.artisan}</Text>
              <Text style={styles.artisanRegion}>📍 {product.region}</Text>
            </View>
          </View>

          {/* Price & Rating Row */}
          <View style={styles.pricingCard}>
            <View>
              <Text style={styles.priceLabel}>Unit Price</Text>
              <View style={styles.priceCluster}>
                <Text style={styles.priceAmount}>₱{product.price.toLocaleString()}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>
                    ₱{product.originalPrice.toLocaleString()}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.ratingBox}>
              <View style={styles.ratingBadge}>
                <Text style={styles.starText}>★</Text>
                <Text style={styles.ratingValue}>{product.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.reviewCount}>({product.reviewsCount} reviews)</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <View>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <Text style={styles.subtotalText}>
                Subtotal: <Text style={styles.subtotalAmount}>₱{totalPrice.toLocaleString()}</Text>
              </Text>
            </View>

            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={[styles.stepperBtn, quantity <= 1 && styles.stepperBtnDisabled]}
                onPress={handleDecrease}
                disabled={quantity <= 1}
              >
                <Text style={styles.stepperBtnText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.quantityNumber}>{quantity}</Text>

              <TouchableOpacity
                style={[
                  styles.stepperBtn,
                  quantity >= product.inStock && styles.stepperBtnDisabled,
                ]}
                onPress={handleIncrease}
                disabled={quantity >= product.inStock}
              >
                <Text style={styles.stepperBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cultural Story & Description */}
          <View style={styles.storySection}>
            <Text style={styles.sectionHeading}>Tungkol sa Likha (Story of Craft)</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Material & Craft Specifications */}
          <View style={styles.specificationsBox}>
            <Text style={styles.sectionHeading}>Product Specifications</Text>

            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Materials:</Text>
              <Text style={styles.specValue}>{product.materials}</Text>
            </View>

            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Lead Time:</Text>
              <Text style={styles.specValue}>{product.leadTime}</Text>
            </View>

            <View style={styles.specRow}>
              <Text style={styles.specLabel}>Regional Origin:</Text>
              <Text style={styles.specValue}>{product.region}</Text>
            </View>
          </View>

          {/* Key Product Highlights */}
          {product.highlights && (
            <View style={styles.highlightsSection}>
              <Text style={styles.sectionHeading}>Artisan Highlights</Text>
              {product.highlights.map((highlight, index) => (
                <View key={index} style={styles.highlightRow}>
                  <Text style={styles.checkIcon}>✓</Text>
                  <Text style={styles.highlightText}>{highlight}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Forward Navigation: Proceed to Order Summary passing product, quantity & total */}
          <TouchableOpacity
            style={[globalStyles.primaryButton, styles.buyButton]}
            activeOpacity={0.88}
            onPress={() => {
              navigation.navigate('OrderSummary', {
                product,
                quantity,
                totalPrice,
              });
            }}
          >
            <Text style={globalStyles.primaryButtonText}>
              Bumili Na (Order Now) • ₱{totalPrice.toLocaleString()}
            </Text>
          </TouchableOpacity>

          {/* Secondary Reverse Navigation Button */}
          <TouchableOpacity
            style={styles.secondaryBackBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryBackBtnText}>← Return to Product Catalog</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fallbackIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  fallbackTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  fallbackText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  topActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
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
  originPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  originPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 270,
    backgroundColor: '#E2E8F0',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  detailsBody: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  stockBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stockBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    lineHeight: 30,
    marginBottom: 4,
  },
  productTagline: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  artisanCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEAE2',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
  },
  artisanIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  artisanInfo: {
    flex: 1,
  },
  artisanTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    color: COLORS.textMuted,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  artisanName: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  artisanRegion: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  pricingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  priceCluster: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  priceAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primaryDark,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  ratingBox: {
    alignItems: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 3,
  },
  starText: {
    color: '#D97706',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 3,
  },
  ratingValue: {
    color: '#92400E',
    fontSize: 13,
    fontWeight: '800',
  },
  reviewCount: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  subtotalText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  subtotalAmount: {
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1EFEA',
    borderRadius: 10,
    padding: 4,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnDisabled: {
    opacity: 0.4,
  },
  stepperBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  quantityNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
  },
  storySection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  specificationsBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  specLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    flex: 1,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1.5,
    textAlign: 'right',
  },
  highlightsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    marginBottom: 24,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 8,
  },
  highlightText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  buyButton: {
    marginTop: 8,
    marginBottom: 12,
  },
  secondaryBackBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  secondaryBackBtnText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
