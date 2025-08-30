import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useDemoMode } from '../src/context/DemoContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import API from '../config/apiConfig';
import styles from './Css/PartyCard.styles';

const ProductCard = ({ product, navigation }) => {
  const { demoMode, showDemoAlert } = useDemoMode();

  // Handle different data structures (API vs static data)
  const productData = {
    id: product.id,
    name: product.name,
    qty: product.qty,
    price: product.price,
  };

  // handle button clicked
  const handleEdit = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      // Navigate to edit screen with party data
      navigation.navigate('EditProduct', { product: productData });
    }
  };

  const handleDelete = () => {
    if (demoMode) {
      showDemoAlert();
    } else {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this product?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                const response = await fetch(
                  `${API}products/${productData.id}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                  },
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                Alert.alert('Success', 'Product deleted successfully');
              } catch (error) {
                console.error('Error deleting product:', error);
                Alert.alert('Error', 'Failed to delete product');
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
          <Text style={styles.partyName}>{productData.name}</Text>
          <Text style={styles.partyId}>ID: {productData.id}</Text>
        </View>

        {/* name */}
        <View style={styles.partyRight}>
          <Text style={styles.partyOutstanding}>{productData.name}</Text>
          <Text style={styles.partyOutstandingLabel}>Name</Text>
        </View>
        <View style={styles.partyRight}>
          {/* <View style={[styles.statusBadge, { backgroundColor: getStatusColor(partyData.status) + '20' }]}>
            <Text style={[styles.statusBadgeText, { color: getStatusColor(partyData.status) }]}>
              {getStatusIcon(partyData.status)} {partyData.status}
            </Text>
          </View> */}
          <Text style={styles.partyOutstanding}>
            ₹{productData.price.toLocaleString()}
          </Text>
          <Text style={styles.partyOutstandingLabel}>Price</Text>
        </View>
        <View style={styles.partyRight}>
          <Text style={styles.partyOutstanding}>
            {productData.qty.toLocaleString()}
          </Text>
          <Text style={styles.partyOutstandingLabel}>Qty</Text>
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

export default ProductCard;
