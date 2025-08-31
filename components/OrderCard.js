import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDemoMode } from '../src/context/DemoContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../config/apiConfig';
import styles from './Css/PartyCard.styles';

const OrderCard = ({ order, navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

  // Handle different data structures (API vs static data)
  const orderData = {
    id: order.id,
    partyName: order.party?.name || order.partyName,
    totalAmount: order.total_amount,
    status: order.status,
    items: order.orderItems || order.items || [],
  };

  // Function to get badge colors based on status
  const getStatusBadgeColors = status => {
    switch (status) {
      case 'paid':
        return { backgroundColor: '#28a745', textColor: 'white' };
      case 'unpaid':
        return { backgroundColor: '#dc3545', textColor: 'white' };
      case 'partially_paid':
        return { backgroundColor: '#ffc107', textColor: 'black' };
      default:
        return { backgroundColor: '#6c757d', textColor: 'white' };
    }
  };

  // Function to get display text for status
  const getStatusDisplayText = status => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'unpaid':
        return 'Unpaid';
      case 'partially_paid':
        return 'Partial';
      default:
        return status;
    }
  };

  // handle button clicked
  const handleEdit = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      // Navigate to edit screen with party data
      navigation.navigate('EditOrder', { order: orderData });
    }
  };

  const handleDelete = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this order?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                const response = await fetch(`${API}orders/${orderData.id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                Alert.alert('Success', 'Order deleted successfully');
              } catch (error) {
                console.error('Error deleting order:', error);
                Alert.alert('Error', 'Failed to delete order');
              }
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.partyCard}>
      <View style={styles.partyHeader}>
        <View>
          <Text style={styles.partyName}>{orderData.partyName}</Text>
          <Text style={styles.partyId}>ID: ORD-{orderData.id}</Text>
        </View>
        <View style={styles.partyRight}>
          <Text
            style={[
              styles.partyOutstanding,
              {
                color:
                  orderData.status === 'unpaid'
                    ? '#EF4444'
                    : orderData.status === 'paid'
                    ? '#28a745'
                    : '#6c757d',
              },
            ]}
          >
            ₹{orderData.totalAmount}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: getStatusBadgeColors(orderData.status)
                  .backgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                { color: getStatusBadgeColors(orderData.status).textColor },
              ]}
            >
              {getStatusDisplayText(orderData.status)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.partyFooter}>
        <View style={styles.partyActions}>
          <TouchableOpacity
            style={styles.partyActionButton}
            onPress={handleEdit}
          >
            <Text style={styles.partyActionButtonText}>
              <Icon name="edit" size={16} color="#6366F1" /> Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.partyActionButton}
            onPress={handleDelete}
          >
            <Text style={styles.partyActionButtonText}>
              <Icon name="delete" size={16} color="#EF4444" /> Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
