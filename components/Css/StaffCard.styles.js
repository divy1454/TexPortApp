import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  staffCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  staffHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  staffName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  staffId: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  staffRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  staffMachine: {
    fontSize: 12,
    color: '#6366F1',
    marginTop: 2,
  },
  staffContact: {
    fontSize: 12,
    color: '#6366F1',
    marginTop: 2,
  },
  staffRight: {
    alignItems: 'flex-end',
  },
  staffStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  staffStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  staffEarnings: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10B981',
  },
  staffEarningsLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  staffSalary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  staffSalaryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  staffDetails: {
    marginBottom: 12,
  },
  staffEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  staffStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 12,
  },
  staffStat: {
    alignItems: 'center',
  },
  staffStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  staffStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  staffFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staffStatus: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  staffActions: {
    flexDirection: 'row',
    gap: 8,
  },
  staffActionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  staffActionButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
