import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Css/TransactionCard.styles';
import { useDemoMode } from '../src/context/DemoContext';

const TransactionCard = ({ transaction, navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();
  
  const getPaymentTypeColor = (paymentType) => {
    return paymentType === 'received' ? '#10B981' : '#EF4444';
  };

  const getPaymentModeIcon = (paymentMode) => {
    switch (paymentMode) {
      case 'cash': return 'money';
      case 'cheque': return 'receipt';
      case 'online': return 'payment';
      default: return 'payment';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={[styles.transactionCard, { 
      borderLeftColor: getPaymentTypeColor(transaction.payment_type) 
    }]}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionCompany}>{transaction.party_name}</Text>
          <Text style={styles.transactionDetails}>
            {formatDate(transaction.payment_date)} • ID: #{transaction.id}
          </Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={[styles.transactionAmount, { 
            color: getPaymentTypeColor(transaction.payment_type) 
          }]}>
            {transaction.payment_type === 'given' ? '-' : '+'}{formatAmount(transaction.amount)}
          </Text>
          <View style={[styles.statusBadge, { 
            backgroundColor: getPaymentTypeColor(transaction.payment_type) + '20' 
          }]}>
            <Text style={[styles.statusBadgeText, { 
              color: getPaymentTypeColor(transaction.payment_type) 
            }]}>
              {transaction.payment_type === 'received' ? '↓ Received' : '↑ Given'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.transactionBody}>
        <View style={styles.paymentModeContainer}>
          <Icon 
            name={getPaymentModeIcon(transaction.payment_mode)} 
            size={16} 
            color="#6B7280" 
          />
          <Text style={styles.paymentModeText}>
            {transaction.payment_mode.charAt(0).toUpperCase() + transaction.payment_mode.slice(1)}
          </Text>
        </View>
        
        {transaction.remarks && (
          <Text style={styles.remarksText} numberOfLines={2}>
            {transaction.remarks}
          </Text>
        )}
      </View>
      
      <View style={styles.transactionFooter}>
        <View style={styles.footerLeft}>
          <Text style={styles.transactionId}>Party ID: {transaction.party_id}</Text>
        </View>
        <View style={styles.footerRight}>
          {transaction.proof_url ? (
            <TouchableOpacity 
              style={styles.proofButton}
              onPress={() => demoMode && showDemoAlert()}
            >
              <Icon name="attach-file" size={16} color="#6366F1" />
              <Text style={styles.proofButtonText}>View Proof</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.addProofButton}
              onPress={() => demoMode && showDemoAlert()}
            >
              <Icon name="add-photo-alternate" size={16} color="#9CA3AF" />
              <Text style={styles.addProofButtonText}>Add Proof</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => demoMode && showDemoAlert()}
          >
            <Icon name="edit" size={16} color="#6366F1" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;