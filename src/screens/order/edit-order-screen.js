import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../../config/apiConfig';
import { useDemoMode } from '../../context/DemoContext';

const { width } = Dimensions.get('window');

export default function EditOrderScreen({ route, navigation }) {
  const { order } = route.params;
  console.log('EditOrderScreen - Received order param:', JSON.stringify(order, null, 2));
  
  const { demoMode, showDemoAlert } = useDemoMode();
  console.log('EditOrderScreen - Demo mode:', demoMode);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [parties, setParties] = useState([]);
  const [loadingParties, setLoadingParties] = useState(false);
  const [partiesError, setPartiesError] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [orderError, setOrderError] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      partyName: '',
      totalAmount: '0',
      items: [{ name: '', qty: '1', price: '' }],
    },
  });

  // Function to fetch order details from API
  const fetchOrderDetails = async (orderId) => {
    setLoadingOrder(true);
    try {
      const apiUrl = `${API}orders/${orderId}`;
      console.log('Fetching order details from:', apiUrl);

      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const fetchPromise = fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const data = await response.json();
      console.log('Order details response:', data);

      if (data.success) {
        setOrderData(data.order);
        setOrderError(null);
        console.log('Order data set:', data.order);
        return data.order;
      } else {
        console.error('API returned error:', data.message);
        const errorMsg = data.message || 'Failed to fetch order details';
        setOrderError(errorMsg);
        Alert.alert('Error', errorMsg);
        setOrderData(null);
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      let errorMsg = 'Network error occurred. Please check your connection and try again.';
      if (err.message === 'Request timeout') {
        errorMsg = 'Request timed out. Please check your connection and try again.';
      }
      setOrderError(errorMsg);
      Alert.alert('Error', errorMsg);
      setOrderData(null);
    } finally {
      setLoadingOrder(false);
    }
  };
  const getCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  };

  // Function to fetch all products from API
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setProductsError(null);

    try {
      const apiUrl = `${API}products/creator/${currentUser.id}`;
      console.log('Fetching products from:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        if (!data.products || data.products.length === 0) {
          setProductsError('No products available');
        }
        setProducts(data.products || []);
      } else {
        setProductsError(data.message || 'Failed to fetch products');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProductsError('Network error occurred');
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Function to fetch parties for the current user from API
  const fetchParties = async () => {
    if (!currentUser || !currentUser.id) {
      console.log('No current user found for fetching parties');
      return;
    }

    setLoadingParties(true);
    setPartiesError(null);

    try {
      const apiUrl = `${API}parties/creator/${currentUser.id}`;
      console.log('Fetching parties from:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Parties response status:', response.status);
      const data = await response.json();
      console.log('Parties response data:', data);

      if (data.success) {
        if (!data.parties || data.parties.length === 0) {
          setPartiesError('No parties available');
        }
        setParties(data.parties || []);
      } else {
        setPartiesError(data.message || 'Failed to fetch parties');
        setParties([]);
      }
    } catch (err) {
      console.error('Error fetching parties:', err);
      setPartiesError('Network error occurred');
      setParties([]);
    } finally {
      setLoadingParties(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      // Get current user first
      const user = await getCurrentUser();
      
      // Fetch order details if order ID is provided
      if (order && order.id) {
        console.log('Initializing with order:', order);
        console.log('Demo mode:', demoMode);
        
        // If in demo mode, use the passed data directly
        if (demoMode) {
          console.log('Demo mode: Creating mock order data from passed data');
          // For demo data, create a compatible structure
          const mockOrderData = {
            id: order.id,
            party_id: 1, // Mock party ID for demo
            party: { id: 1, name: order.partyName, partyName: order.partyName },
            total_amount: order.totalAmount,
            status: order.status || 'unpaid',
            order_items: (order.items || []).map(item => ({
              id: item.id,
              productName: item.name,
              qty: item.qty,
              price: item.price,
              total: item.total || (item.qty * item.price),
            })),
          };
          setOrderData(mockOrderData);
          setLoadingOrder(false);
        } else {
          // Always fetch from API for real data
          console.log('Fetching order details from API for order ID:', order.id);
          try {
            await fetchOrderDetails(order.id);
          } catch (error) {
            console.error('Failed to fetch order details:', error);
            setLoadingOrder(false);
          }
        }
      } else {
        console.log('No order data provided');
        setLoadingOrder(false);
        Alert.alert('Error', 'No order data provided');
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.id && !demoMode) {
        await fetchProducts();
        await fetchParties();
      }
    };

    fetchData();
  }, [currentUser, demoMode]);

  // Separate effect to handle form pre-filling after all data is loaded
  useEffect(() => {
    if (orderData && fields && fields.length >= 1) {
      console.log('Pre-filling form with order data');
      console.log('Order data:', orderData);
      
      // Get items from either 'items' or 'order_items' field
      const itemsArray = orderData.items || orderData.order_items || [];
      console.log('Order items:', itemsArray);
      console.log('Current fields length:', fields.length);
      
      // Set party selection
      setValue('partyName', orderData.party_id);
      
      // Replace items array with order items - only if we have items
      if (itemsArray.length > 0) {
        const itemsData = itemsArray.map(item => ({
          name: item.productName || '',
          qty: String(item.qty || 1),
          price: String(item.price || 0),
        }));
        
        console.log('Setting items data:', itemsData);
        console.log('Current watchedItems:', watchedItems);
        
        // Check if we need to replace the data
        const shouldReplace = !watchedItems || 
                             watchedItems.length !== itemsData.length ||
                             watchedItems.some((item, index) => 
                               !item || !itemsData[index] ||
                               item.name !== itemsData[index].name ||
                               item.qty !== itemsData[index].qty ||
                               item.price !== itemsData[index].price
                             );
        
        if (shouldReplace) {
          console.log('Replacing fields with order data');
          replace(itemsData);
        } else {
          console.log('Form already has correct data, skipping replace');
        }
      }
      
      // Set the total amount (this will be recalculated automatically)
      setValue('totalAmount', String(orderData.total_amount || 0));
      
      // Debug: log the fields after replacement
      setTimeout(() => {
        console.log('Fields after processing:', fields?.length || 0);
        console.log('Final form values:', watch());
      }, 200);
    }
  }, [orderData, fields?.length]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');
  const watchAll = watch(); // Watch all form changes
  
  // Debug logging for watched values - with null checks
  console.log('Edit Order - watchedItems count:', watchedItems?.length || 0);
  console.log('Edit Order - watchedItems data:', watchedItems);
  console.log('Edit Order - party_id from watch:', watchAll?.party_id);
  console.log('Edit Order - fields array count:', fields?.length || 0);
  console.log('Edit Order - subtotal:', subtotal);

  // Function to get available products for a specific item index (excluding already selected products)
  const getAvailableProducts = currentIndex => {
    if (!products || !Array.isArray(products) || products.length === 0) return [];

    // Get all selected product names from other items (excluding current item)
    const selectedProducts = (watchedItems || [])
      .map((item, index) => (index !== currentIndex ? item?.name : null))
      .filter(name => name && name !== '');

    // Return products that are not already selected
    return products.filter(product => !selectedProducts.includes(product.name));
  };

  // Calculate subtotal
  const subtotal = useMemo(() => {
    if (!watchedItems || !Array.isArray(watchedItems)) return 0;
    return watchedItems.reduce((sum, item) => {
      if (!item) return sum;
      const qty = parseFloat(item.qty) || 0;
      const price = parseFloat(item.price) || 0;
      return sum + qty * price;
    }, 0);
  }, [watchedItems, watchAll]);

  const onSubmit = async data => {
    // Show demo alert if in demo mode
    if (demoMode) {
      showDemoAlert();
      return;
    }

    // Validation 1: Check if party is selected
    if (!data.partyName || data.partyName === '') {
      Alert.alert('Error', 'Please select party name');
      return;
    }

    // Validation 2: Check if at least one item is selected
    const validItems = data.items.filter(
      item => item.name && item.name !== '' && item.qty && item.price,
    );

    if (validItems.length === 0) {
      Alert.alert('Error', 'Please select item');
      return;
    }

    if (!currentUser || !currentUser.id) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    setIsSubmitting(true);

    // Prepare order data with current user ID
    const updateData = {
      partyName: data.partyName,
      items: validItems,
      userId: currentUser.id,
      createdBy: currentUser.id,
      totalAmount: subtotal,
    };

    console.log('Order data to be updated:', updateData);

    // API call to update order
    try {
      const apiUrl = `${API}orders/${order.id}`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const responseData = await response.json();
      if (!responseData.success) {
        Alert.alert('Error', responseData.message || 'Failed to update order.');
        return;
      }
      Alert.alert('Success', 'Order updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Error updating order:', error);
      Alert.alert('Error', 'Failed to update order. Please try again.');
    }

    setIsSubmitting(false);
  };

  // Direct validation function that bypasses form validation
  const handleSaveOrder = () => {
    console.log('handleSaveOrder called');

    // Get current form values directly
    const currentData = watch();
    
    if (!currentData) {
      Alert.alert('Error', 'Form data not available. Please try again.');
      return;
    }

    // Validation 1: Check if party is selected
    if (!currentData.partyName || currentData.partyName === '') {
      Alert.alert('Error', 'Please select party name');
      return;
    }

    // Validation 2: Check if at least one item is selected
    const validItems = (currentData.items || []).filter(
      item => item && item.name && item.name !== '' && item.qty && item.price,
    );

    if (validItems.length === 0) {
      Alert.alert('Error', 'Please select item');
      return;
    }

    // If validation passes, call the original submit function
    onSubmit(currentData);
  };

  const addNewItem = () => {
    append({ name: '', qty: '1', price: '' });
  };

  const removeItem = index => {
    if (!fields || fields.length <= 1) {
      Alert.alert('Info', 'At least one item is required');
      return;
    }
    
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => remove(index) },
    ]);
  };

  // Show loading screen while fetching order details
  if (loadingOrder) {
    return (
      <View style={styles.loadingScreenContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  // Show error screen if failed to load order details
  if (orderError && !orderData) {
    return (
      <View style={styles.loadingScreenContainer}>
        <Text style={styles.errorText}>⚠️ {orderError}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            if (order && order.id) {
              setOrderError(null);
              fetchOrderDetails(order.id);
            }
          }}
        >
          <Text style={styles.retryButtonText}>🔄 Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Edit Order</Text>
          <Text style={styles.subtitle}>Update order details below</Text>
          {orderData && (
            <Text style={styles.userInfo}>Order ID: ORD-{orderData.id}</Text>
          )}
        </View>

        {/* Party Selection Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Party Information</Text>
          <Text style={styles.label}>Select Party *</Text>
          {loadingParties ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#3498db" />
              <Text style={styles.loadingText}>Loading parties...</Text>
            </View>
          ) : partiesError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{partiesError}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchParties}
                disabled={loadingParties}
              >
                <Text style={styles.retryButtonText}>🔄 Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Controller
              control={control}
              name="partyName"
              rules={{ required: 'Party selection is required' }}
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    style={styles.picker}
                    enabled={!loadingParties && parties.length > 0}
                    onValueChange={onChange}
                  >
                    <Picker.Item
                      label={
                        parties.length === 0
                          ? 'No parties available'
                          : 'Choose a party...'
                      }
                      value=""
                      color="#999"
                    />
                    {parties.map((party, index) => (
                      <Picker.Item
                        key={index}
                        label={party.name || party.partyName}
                        value={party.id}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />
          )}
        </View>

        {/* Items Card */}
        <View style={styles.card}>
          <View style={styles.itemsHeader}>
            <Text style={styles.cardTitle}>🛍️ Order Items</Text>
            <View style={styles.headerButtons}>
              {(productsError || products.length === 0) && (
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={fetchProducts}
                  disabled={loadingProducts}
                >
                  <Text style={styles.refreshButtonText}>
                    {loadingProducts ? '⏳' : '🔄'} Reload Products
                  </Text>
                </TouchableOpacity>
              )}
              {/* Always show Add Item button in edit mode, hide only if no products and not demo mode */}
              {(products.length > 0 || demoMode || loadingProducts) && (
                <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
                  <Text style={styles.addButtonText}>+ Add Item</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {fields && fields.length > 0 ? fields.map((item, index) => {
            const currentItem = watch(`items.${index}`) || {};
            const itemTotal =
              (parseFloat(currentItem.qty) || 0) *
              (parseFloat(currentItem.price) || 0);

            console.log(`Item ${index + 1}:`, currentItem);

            // Get available products for this specific item (excluding already selected ones)
            const availableProducts = getAvailableProducts(index);
            
            // Ensure current item's product is always available in the picker
            const currentProductName = currentItem.name;
            let productsForPicker = [...availableProducts];
            
            if (currentProductName && !availableProducts.find(p => p.name === currentProductName)) {
              // Add current product as a virtual product if it's not in the available list
              productsForPicker.unshift({
                name: currentProductName,
                price: parseFloat(currentItem.price) || 0,
                id: `virtual-${currentProductName}`,
              });
            }

            return (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemNumber}>Item #{index + 1}</Text>
                  {fields.length > 1 && (
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(index)}
                    >
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Product Selection */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Product</Text>
                  {loadingProducts ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#3498db" />
                      <Text style={styles.loadingText}>
                        Loading products...
                      </Text>
                    </View>
                  ) : productsError ? (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>{productsError}</Text>
                      <Text style={styles.infoText}>You can still edit existing items</Text>
                    </View>
                  ) : (
                    <Controller
                      control={control}
                      name={`items.${index}.name`}
                      render={({ field: { value } }) => (
                        <View style={styles.pickerContainer}>
                          <Picker
                            selectedValue={value}
                            style={styles.picker}
                            enabled={
                              !loadingProducts && productsForPicker.length > 0
                            }
                            onValueChange={selected => {
                              const product = productsForPicker.find(
                                p => p.name === selected,
                              );
                              setValue(`items.${index}.name`, selected);
                              if (product) {
                                setValue(
                                  `items.${index}.price`,
                                  String(product.price || 0),
                                );
                                // Don't reset qty to 1 if we're just switching between existing products
                                if (!currentItem?.qty || currentItem.qty === '1') {
                                  setValue(`items.${index}.qty`, '1');
                                }
                              } else {
                                setValue(`items.${index}.price`, '');
                              }
                            }}
                          >
                            <Picker.Item
                              label={
                                productsForPicker.length === 0
                                  ? 'No products available'
                                  : 'Select product...'
                              }
                              value=""
                              color="#999"
                            />
                            {productsForPicker.map((p, i) => (
                              <Picker.Item
                                key={i}
                                label={`${p.name} - ₹${p.price || 0}`}
                                value={p.name}
                              />
                            ))}
                          </Picker>
                        </View>
                      )}
                    />
                  )}
                </View>

                {/* Quantity and Price Row */}
                <View style={styles.row}>
                  <View
                    style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
                  >
                    <Text style={styles.inputLabel}>Quantity</Text>
                    <Controller
                      control={control}
                      name={`items.${index}.qty`}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={styles.textInput}
                          placeholder="1"
                          keyboardType="numeric"
                          value={value}
                          onChangeText={text => {
                            onChange(text);
                          }}
                          placeholderTextColor="#999"
                        />
                      )}
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>Price (₹)</Text>
                    <Controller
                      control={control}
                      name={`items.${index}.price`}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={styles.textInput}
                          placeholder="0.00"
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                          placeholderTextColor="#999"
                        />
                      )}
                    />
                  </View>
                </View>

                {/* Item Total */}
                {itemTotal > 0 && (
                  <View style={styles.itemTotal}>
                    <Text style={styles.itemTotalText}>
                      Total: ₹{itemTotal.toFixed(2)}
                    </Text>
                  </View>
                )}
              </View>
            );
          }) : (
            <View style={styles.noItemsContainer}>
              <Text style={styles.noItemsText}>No items to display</Text>
            </View>
          )}
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Count:</Text>
            <Text style={styles.summaryValue}>{fields?.length || 0}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₹{(subtotal || 0).toFixed(2)}</Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSaveOrder}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? '⏳ Updating Order...' : '💾 Update Order'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  userInfo: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 4,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  refreshButton: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  itemCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6c757d',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#2c3e50',
  },
  row: {
    flexDirection: 'row',
  },
  itemTotal: {
    alignItems: 'flex-end',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  itemTotalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6c757d',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#95a5a6',
    shadowColor: '#95a5a6',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  readonlyInput: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6c757d',
  },
  errorContainer: {
    backgroundColor: '#fee',
    borderWidth: 1,
    borderColor: '#fcc',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: '#c33',
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  loadingScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6c757d',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noItemsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 10,
  },
  noItemsText: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
  },
});
