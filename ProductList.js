// ProductList.js
// Catalog Screen displaying all Philippine Artisan Products with Filtering and Parameter Passing

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { globalStyles, COLORS } from './globalStyles';
import { PRODUCTS, CATEGORIES } from './productsData';

export default function ProductList({ route, navigation }) {
  // Read category passed from HomeScreen if available
  const passedCategory = route?.params?.selectedCategory;

  const [selectedCategory, setSelectedCategory] = useState(passedCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  // Update selected category if route params change
  useEffect(() => {
    if (passedCategory) {
      setSelectedCategory(passedCategory);
    }
  }, [passedCategory]);

  // Filter products by category and search keyword
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artisan.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.85}
      onPress={() => {
        // Forward Navigation: Passing the selected product object to ProductDetails
        navigation.navigate('ProductDetails', { product: item });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />

      <View style={styles.cardInfo}>
        <View style={styles.metaRow}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{item.category}</Text>
          </View>
          <View style={styles.stockBadge}>
            <Text style={styles.stockBadgeText}>
              {item.inStock > 0 ? `${item.inStock} left` : 'Sold out'}
            </Text>
          </View>
        </View>

        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.regionRow}>
          <Text style={styles.regionText}>📍 {item.region}</Text>
        </View>

        <Text style={styles.artisanText} numberOfLines={1}>
          By {item.artisan}
        </Text>

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceText}>₱{item.price.toLocaleString()}</Text>
            {item.originalPrice && (
              <Text style={styles.strikePrice}>₱{item.originalPrice.toLocaleString()}</Text>
            )}
          </View>

          <View style={styles.ratingBadge}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingNumber}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Inspect Product →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Top Header Navigation Strip */}
      <View style={styles.topBar}>
        {/* Manual reverse navigation button */}
        <TouchableOpacity
          style={globalStyles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={globalStyles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.topBarCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by product, region (e.g. Laguna, Cebu), or craft..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoryFilterWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoryFilterList}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
                onPress={() => setSelectedCategory(item)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isSelected && styles.filterPillTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Walang Nakitang Produkto</Text>
            <Text style={styles.emptyDesc}>
              No items match &quot;{searchQuery}&quot; in the &quot;{selectedCategory}&quot; category.
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.resetButtonText}>Reset All Filters</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  topBarCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },
  clearSearch: {
    fontSize: 16,
    color: COLORS.textMuted,
    paddingHorizontal: 6,
  },
  categoryFilterWrapper: {
    marginBottom: 8,
  },
  categoryFilterList: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  filterPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 28,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEAE2',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  cardInfo: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryPillText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '700',
  },
  stockBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockBadgeText: {
    fontSize: 11,
    color: '#15803D',
    fontWeight: '700',
  },
  productName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  regionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  artisanText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primaryDark,
  },
  strikePrice: {
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
  ratingStar: {
    color: '#D97706',
    fontSize: 13,
    fontWeight: '800',
    marginRight: 4,
  },
  ratingNumber: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '800',
  },
  viewButton: {
    backgroundColor: '#F8F6F0',
    borderWidth: 1,
    borderColor: '#E7DFC6',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    color: COLORS.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
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
    textAlign: 'center',
    marginBottom: 18,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
