// HomeScreen.js
// Home / Welcome Screen for LokalPH - Philippine Artisan Marketplace

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { globalStyles, COLORS } from './globalStyles';
import { PRODUCTS, CATEGORIES } from './productsData';

export default function HomeScreen({ navigation }) {
  // Grab top 3 featured products for the spotlight section
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.scrollContent}
      >
        {/* Brand Header Banner */}
        <View style={styles.heroSection}>
          <View style={styles.badgeRow}>
            <View style={styles.phBadge}>
              <Text style={styles.phBadgeText}>🇵🇭 TANGKILIKIN ANG SARILING ATIN</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>LokalPH</Text>
          <Text style={styles.heroSubtitle}>
            Handcrafted treasures, heirloom textiles, and indigenous delicacies from across the
            7,641 Philippine islands.
          </Text>

          {/* Forward Navigation 1: Go to full catalog */}
          <TouchableOpacity
            style={styles.heroCtaButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={styles.heroCtaText}>Explore All Products →</Text>
          </TouchableOpacity>
        </View>

        {/* Value Proposition Strip */}
        <View style={styles.perksContainer}>
          <View style={styles.perkItem}>
            <Text style={styles.perkEmoji}>🇵🇭</Text>
            <Text style={styles.perkTitle}>100% Lokal</Text>
            <Text style={styles.perkDesc}>Pure Filipino craftsmanship</Text>
          </View>
          <View style={styles.perkDivider} />
          <View style={styles.perkItem}>
            <Text style={styles.perkEmoji}>🧵</Text>
            <Text style={styles.perkTitle}>Fair Trade</Text>
            <Text style={styles.perkDesc}>Direct to indigenous weavers</Text>
          </View>
          <View style={styles.perkDivider} />
          <View style={styles.perkItem}>
            <Text style={styles.perkEmoji}>📦</Text>
            <Text style={styles.perkTitle}>Nationwide</Text>
            <Text style={styles.perkDesc}>Ships across Luzon, Visayas & Mindanao</Text>
          </View>
        </View>

        {/* Category Shortcuts - Passes parameter to ProductList */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Craft</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
              <Text style={styles.seeAllText}>View All ({PRODUCTS.length})</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Tap a category below to filter the catalog automatically
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {CATEGORIES.map((cat, index) => {
              const icons = {
                All: '🛍️',
                Wearables: '🪡',
                'Food & Beverage': '☕',
                'Home & Living': '🛋️',
                Handicrafts: '🪵',
                Jewelry: '✨',
              };

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryCard}
                  activeOpacity={0.7}
                  onPress={() => {
                    // Forward Navigation with route.params: sends selectedCategory
                    navigation.navigate('ProductList', {
                      selectedCategory: cat === 'All' ? null : cat,
                    });
                  }}
                >
                  <Text style={styles.categoryIcon}>{icons[cat] || '🏷️'}</Text>
                  <Text style={styles.categoryCardText}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Products Spotlight */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Heritage Picks</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
              <Text style={styles.seeAllText}>See Catalog →</Text>
            </TouchableOpacity>
          </View>

          {featuredProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[globalStyles.card, styles.featuredCard]}
              activeOpacity={0.88}
              onPress={() => {
                // Forward Navigation with route.params: sends full product object
                navigation.navigate('ProductDetails', { product: item });
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.featuredImage}
                resizeMode="cover"
              />

              <View style={styles.featuredContent}>
                <View style={globalStyles.regionBadge}>
                  <Text style={globalStyles.regionBadgeText}>📍 {item.region}</Text>
                </View>

                <Text style={styles.productTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productArtisan} numberOfLines={1}>
                  Crafted by {item.artisan}
                </Text>

                <View style={styles.priceRow}>
                  <View>
                    <Text style={globalStyles.priceTag}>₱{item.price.toLocaleString()}</Text>
                    {item.originalPrice && (
                      <Text style={styles.originalPrice}>₱{item.originalPrice.toLocaleString()}</Text>
                    )}
                  </View>

                  <View style={styles.ratingBadge}>
                    <Text style={styles.starIcon}>★</Text>
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                  </View>
                </View>

                <View style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsText}>View Details & Story →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cultural Advocacy Footer Card */}
        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>Bawat Bili, May Kwento</Text>
          <Text style={styles.missionText}>
            Every purchase through LokalPH directly sustains regional cultural heritage, protects
            ancestral weaving traditions, and provides sustainable livelihood to rural artisans.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: COLORS.primaryDark,
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  badgeRow: {
    marginBottom: 12,
  },
  phBadge: {
    backgroundColor: '#92400E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#B45309',
  },
  phBadgeText: {
    color: '#FEF3C7',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#FDE68A',
    lineHeight: 22,
    marginBottom: 20,
  },
  heroCtaButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  heroCtaText: {
    color: '#451A03',
    fontSize: 15,
    fontWeight: '800',
  },
  perksContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  perkItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  perkDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  perkEmoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  perkTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  perkDesc: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  categoryScroll: {
    paddingVertical: 4,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 90,
  },
  categoryIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  categoryCardText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  featuredCard: {
    padding: 0,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  featuredContent: {
    padding: 16,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 8,
    marginBottom: 2,
  },
  productArtisan: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  starIcon: {
    color: '#D97706',
    fontSize: 13,
    fontWeight: '800',
    marginRight: 3,
  },
  ratingText: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '700',
  },
  viewDetailsButton: {
    backgroundColor: '#FAF7F2',
    borderWidth: 1,
    borderColor: '#E7DEC8',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: COLORS.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  missionCard: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 4,
  },
  missionText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 19,
  },
});
