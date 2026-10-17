// globalStyles.js
// Shared theme colors, typography, and reusable layout styles for LokalPH

import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  primary: '#B45309', // Warm Philippine Amber / Terracotta
  primaryDark: '#78350F', // Deep Mahogany
  primaryLight: '#FEF3C7', // Warm Amber Soft Tint
  primaryHover: '#92400E',
  secondary: '#0F766E', // Visayan Emerald / Cordillera Pine
  secondaryLight: '#CCFBF1',
  accent: '#DC2626', // Festive Red Accent
  background: '#FAF7F2', // Philippine Canvas / Warm Ivory
  surface: '#FFFFFF',
  surfaceAlt: '#F1EFEA',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  success: '#15803D',
  successBg: '#DCFCE7',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  danger: '#EF4444',
  shadowColor: '#000000',
};

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEAE2',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  regionBadgeText: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  primaryButtonText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    flexDirection: 'row',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE9DE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: COLORS.primaryDark,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  priceTag: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starText: {
    color: COLORS.warning,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 4,
  },
  ratingCount: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
});
