import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TransporterBookingScreen = ({ navigation }) => {
  const [bookingData, setBookingData] = useState({
    fromLocation: 'Mumbai, Maharashtra',
    toLocation: '',
    loadWeight: '',
    pickupDate: '',
    materialType: '',
    specialInstructions: ''
  });

  const [selectedWeight, setSelectedWeight] = useState('');
  const [estimatedCost, setEstimatedCost] = useState({ min: 8500, max: 12000 });

  const weightOptions = [
    { label: '1-5 Tons', value: '1-5', cost: { min: 3500, max: 5000 } },
    { label: '5-10 Tons', value: '5-10', cost: { min: 6500, max: 8500 } },
    { label: '10-15 Tons', value: '10-15', cost: { min: 8500, max: 12000 } },
    { label: '15-20 Tons', value: '15-20', cost: { min: 12000, max: 16000 } },
    { label: '20+ Tons', value: '20+', cost: { min: 16000, max: 22000 } }
  ];

  const handleWeightSelection = (weight) => {
    setSelectedWeight(weight.value);
    setBookingData(prev => ({ ...prev, loadWeight: weight.label }));
    setEstimatedCost(weight.cost);
  };

  const handleBooking = () => {
    if (!bookingData.toLocation || !bookingData.loadWeight || !bookingData.pickupDate) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    Alert.alert(
      'Booking Confirmed!',
      `Your transporter booking has been confirmed.\n\nBooking ID: TB-2024-001\nRoute: ${bookingData.fromLocation} → ${bookingData.toLocation}\nEstimated Cost: ₹${estimatedCost.min.toLocaleString()} - ₹${estimatedCost.max.toLocaleString()}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="close" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🚛 Book Transporter</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>From Location</Text>
          <TextInput
            style={styles.formInputDisabled}
            value={bookingData.fromLocation}
            editable={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>To Location *</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Enter destination city"
            placeholderTextColor="#9CA3AF"
            value={bookingData.toLocation}
            onChangeText={(value) => setBookingData(prev => ({ ...prev, toLocation: value }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Load Weight *</Text>
          <Text style={styles.formSubLabel}>Select weight range:</Text>
          <View style={styles.weightOptions}>
            {weightOptions.map((weight) => (
              <TouchableOpacity
                key={weight.value}
                style={[
                  styles.weightOption,
                  selectedWeight === weight.value && styles.weightOptionSelected
                ]}
                onPress={() => handleWeightSelection(weight)}
              >
                <Text style={[
                  styles.weightOptionText,
                  selectedWeight === weight.value && styles.weightOptionTextSelected
                ]}>
                  {weight.label}
                </Text>
                <Text style={[
                  styles.weightOptionCost,
                  selectedWeight === weight.value && styles.weightOptionCostSelected
                ]}>
                  ₹{weight.cost.min.toLocaleString()} - ₹{weight.cost.max.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Pickup Date *</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Select pickup date (DD/MM/YYYY)"
            placeholderTextColor="#9CA3AF"
            value={bookingData.pickupDate}
            onChangeText={(value) => setBookingData(prev => ({ ...prev, pickupDate: value }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Material Type</Text>
          <TextInput
            style={styles.formInput}
            placeholder="e.g., Cotton, Silk, Polyester"
            placeholderTextColor="#9CA3AF"
            value={bookingData.materialType}
            onChangeText={(value) => setBookingData(prev => ({ ...prev, materialType: value }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Special Instructions</Text>
          <TextInput
            style={[styles.formInput, styles.textArea]}
            placeholder="Any special handling requirements..."
            placeholderTextColor="#9CA3AF"
            value={bookingData.specialInstructions}
            onChangeText={(value) => setBookingData(prev => ({ ...prev, specialInstructions: value }))}
            multiline={true}
            numberOfLines={3}
          />
        </View>

        {selectedWeight && (
          <LinearGradient colors={['#3B82F6', '#6366F1']} style={styles.costEstimate}>
            <Text style={styles.costEstimateLabel}>💰 Estimated Cost</Text>
            <Text style={styles.costEstimateAmount}>
              ₹{estimatedCost.min.toLocaleString()} - ₹{estimatedCost.max.toLocaleString()}
            </Text>
            <Text style={styles.costEstimateDetails}>Based on distance and load weight</Text>
            <Text style={styles.costEstimateNote}>*Final cost may vary based on actual distance and market rates</Text>
          </LinearGradient>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBookingButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelBookingButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookNowButton} onPress={handleBooking}>
          <Text style={styles.bookNowButtonText}>🚛 Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  formSubLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: 'white',
  },
  formInputDisabled: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#6B7280',
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  weightOptions: {
    gap: 8,
  },
  weightOption: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weightOptionSelected: {
    borderColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  weightOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  weightOptionTextSelected: {
    color: '#6366F1',
  },
  weightOptionCost: {
    fontSize: 14,
    color: '#6B7280',
  },
  weightOptionCostSelected: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
  costEstimate: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  costEstimateLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  costEstimateAmount: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  costEstimateDetails: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginBottom: 4,
  },
  costEstimateNote: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelBookingButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelBookingButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookNowButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  bookNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransporterBookingScreen;