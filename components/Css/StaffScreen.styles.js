import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Responsive breakpoints
const isSmallScreen = screenWidth < 375;
const isMediumScreen = screenWidth >= 375 && screenWidth < 768;

// Responsive helper functions
const responsiveSize = (small, medium, large) => {
  if (isSmallScreen) return small;
  if (isMediumScreen) return medium;
  return large;
};

const responsivePadding = () => responsiveSize(12, 16, 20);
const responsiveFontSize = (baseSize) => responsiveSize(baseSize - 2, baseSize, baseSize + 2);

const styles = StyleSheet.create({
  staffCardWrapper: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    padding: 12,
    flexDirection: 'column',
    gap: 8,
  },
  staffList: {
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  refreshButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  addButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  // Attendance Summary Card Styles
  attendanceSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: responsiveSize(16, 18, 20),
    // marginHorizontal: responsivePadding(),
    marginBottom: responsiveSize(16, 20, 24),
    padding: responsiveSize(16, 20, 24),
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  attendanceSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveSize(16, 20, 24),
  },
  attendanceSummaryTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  attendanceSummaryDate: {
    fontSize: responsiveFontSize(12),
    color: '#6B7280',
    fontWeight: '500',
  },
  markAttendanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    borderRadius: responsiveSize(8, 10, 12),
    paddingHorizontal: responsiveSize(12, 16, 20),
    paddingVertical: responsiveSize(8, 10, 12),
    gap: responsiveSize(4, 6, 8),
  },
  markAttendanceButtonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
  },
  summaryLoadingContainer: {
    paddingVertical: responsiveSize(20, 30, 40),
    alignItems: 'center',
  },
  summaryLoadingText: {
    color: '#6B7280',
    fontSize: responsiveFontSize(14),
    fontStyle: 'italic',
  },
  attendanceStatsContainer: {
    gap: responsiveSize(12, 16, 20),
  },
  attendanceStatsRow: {
    flexDirection: 'row',
    gap: responsiveSize(8, 12, 16),
  },
  attendanceStatCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: responsiveSize(12, 14, 16),
    padding: responsiveSize(12, 16, 20),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  presentStatCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  absentStatCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  attendanceStatNumber: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  presentStatNumber: {
    color: '#059669',
  },
  absentStatNumber: {
    color: '#DC2626',
  },
  attendanceStatLabel: {
    fontSize: responsiveFontSize(12),
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  pendingAttendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: responsiveSize(8, 10, 12),
    padding: responsiveSize(8, 12, 16),
    gap: responsiveSize(6, 8, 10),
  },
  pendingAttendanceText: {
    fontSize: responsiveFontSize(12),
    color: '#92400E',
    fontWeight: '500',
    flex: 1,
  },
  attendanceProgressContainer: {
    gap: responsiveSize(6, 8, 10),
  },
  attendanceProgressBar: {
    height: responsiveSize(6, 8, 10),
    backgroundColor: '#E5E7EB',
    borderRadius: responsiveSize(3, 4, 5),
    overflow: 'hidden',
  },
  attendanceProgressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: responsiveSize(3, 4, 5),
  },
  attendanceProgressText: {
    fontSize: responsiveFontSize(11),
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Legacy styles (keeping for backward compatibility)  
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 40,
    fontSize: 16,
    color: '#1F2937',
  },
  emptyListContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyListText: {
    color: '#6B7280',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 12,
  },
  emptyListSubtext: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  partyEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  partyEditBtnText: {
    color: '#6366F1',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  partyDeleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  partyDeleteBtnText: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  actionBar: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    marginTop: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  actionBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
    gap: 0,
  },
  actionBarBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.35)',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  actionBarBtnText: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  screenHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  attendanceButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  attendanceButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  summaryCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  summaryStatLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  viewAllButton: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  viewAllButtonText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  attendanceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  attendanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  attendanceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  attendanceCard: {
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    marginTop: 0,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  attendanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 10,
  },
  attendanceStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 4,
    gap: 20,
  },
  attendanceStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  attendanceStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 2,
  },
  attendanceStatLabel: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default styles;
