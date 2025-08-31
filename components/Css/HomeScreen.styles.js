import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
  welcomeCard: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 22,
  },
  welcomeIcon: {
    fontSize: 48,
    marginLeft: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  table: {
    padding: 16,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    marginBottom: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  evenRow: {
    backgroundColor: '#F9FAFB',
  },
  partyName: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  amount: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dueDate: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  showButton: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
  },
  quickActionsContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
  // Loading and Error States
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
