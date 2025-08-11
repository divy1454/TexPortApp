import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  partyCard: {
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
  partyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  partyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  partyId: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  partyLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  partyRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  partyOutstanding: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  partyOutstandingLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  partyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partyGst: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  partyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  partyActionButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  partyActionButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
