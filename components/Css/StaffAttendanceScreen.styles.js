import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive breakpoints
const isSmallScreen = screenWidth < 375;
const isMediumScreen = screenWidth >= 375 && screenWidth < 768;
const isLargeScreen = screenWidth >= 768;

// Responsive helper functions
const responsiveSize = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const responsivePadding = () => responsiveSize(12, 16, 20);
const responsiveFontSize = (baseSize) => responsiveSize(baseSize - 2, baseSize, baseSize + 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsiveSize(20, 30, 40),
    paddingHorizontal: responsivePadding(),
    paddingVertical: responsiveSize(16, 18, 20),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  backButton: {
    padding: responsiveSize(6, 8, 10),
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(8, 12, 16),
  },
  dateText: {
    fontSize: responsiveFontSize(12),
    color: '#6366F1',
    fontWeight: '600',
    textAlign: 'right',
    minWidth: responsiveSize(80, 90, 100),
  },
  placeholder: {
    width: responsiveSize(36, 40, 44),
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: responsivePadding(),
    paddingBottom: Platform.OS === 'ios' ? responsiveSize(20, 30, 40) : responsiveSize(10, 15, 20),
    flexGrow: 1,
    minHeight: screenHeight * 0.3,
  },
  staffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveSize(12, 14, 16),
    padding: responsiveSize(12, 16, 20),
    marginBottom: responsiveSize(10, 12, 14),
    justifyContent: 'space-between',
    minHeight: responsiveSize(60, 70, 80),
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
    // Responsive width for larger screens
    ...(isLargeScreen && {
      maxWidth: screenWidth * 0.8,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  staffInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: responsiveSize(8, 12, 16),
  },
  staffName: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: responsiveFontSize(22),
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  staffId: {
    fontSize: responsiveFontSize(12),
    color: '#6B7280',
    marginTop: 2,
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: responsiveSize(6, 8, 10),
  },
  attendanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: responsiveSize(8, 10, 12),
    paddingHorizontal: responsiveSize(8, 10, 12),
    paddingVertical: responsiveSize(6, 8, 10),
    minWidth: responsiveSize(70, 80, 90),
    justifyContent: 'center',
    borderWidth: 1,
  },
  presentButton: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  selectedPresentButton: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  absentButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  selectedAbsentButton: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  presentText: {
    color: '#059669',
    fontWeight: '600',
    marginLeft: responsiveSize(4, 6, 8),
    fontSize: responsiveFontSize(12),
    textAlign: 'center',
  },
  selectedPresentText: {
    color: '#FFFFFF',
  },
  absentText: {
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: responsiveSize(4, 6, 8),
    fontSize: responsiveFontSize(12),
    textAlign: 'center',
  },
  selectedAbsentText: {
    color: '#FFFFFF',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: responsiveSize(8, 10, 12),
    padding: responsiveSize(12, 16, 20),
    marginHorizontal: responsivePadding(),
    marginTop: responsiveSize(8, 12, 16),
  },
  errorText: {
    color: '#DC2626',
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    marginLeft: responsiveSize(8, 10, 12),
    flex: 1,
    lineHeight: responsiveFontSize(20),
  },
  footer: {
    padding: responsivePadding(),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    borderRadius: responsiveSize(12, 14, 16),
    paddingVertical: responsiveSize(14, 16, 18),
    paddingHorizontal: responsiveSize(20, 24, 28),
    minHeight: responsiveSize(50, 56, 60),
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    marginLeft: responsiveSize(6, 8, 10),
  },
  savingButton: {
    backgroundColor: '#9CA3AF',
  },
  // Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: responsiveSize(40, 60, 80),
  },
  loadingText: {
    marginTop: responsiveSize(12, 16, 20),
    fontSize: responsiveFontSize(16),
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsivePadding(),
    paddingVertical: responsiveSize(40, 60, 80),
  },
  emptyText: {
    fontSize: responsiveFontSize(16),
    color: '#6B7280',
    textAlign: 'center',
    marginTop: responsiveSize(12, 16, 20),
    fontWeight: '500',
  },
});

export default styles;
