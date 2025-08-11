import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  transactionLeft: {
    flex: 1,
    marginRight: 12,
  },
  transactionCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  transactionBody: {
    marginBottom: 12,
  },
  paymentModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentModeText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  remarksText: {
    fontSize: 13,
    color: '#4B5563',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerLeft: {
    flex: 1,
  },
  transactionId: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proofButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  proofButtonText: {
    fontSize: 12,
    color: '#6366F1',
    marginLeft: 4,
    fontWeight: '500',
  },
  addProofButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  addProofButtonText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  editButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
  },
});

export default styles;
