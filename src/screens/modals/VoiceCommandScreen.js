import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VoiceCommandScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(true);
  const [voiceText, setVoiceText] = useState('🎧 Listening for voice command...');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        setVoiceText('🗣️ "100 meter cotton record kar do"');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isRecording]);

  const processVoiceCommand = () => {
    setIsRecording(false);
    setShowConfirmation(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    navigation.goBack();
  };

  if (showConfirmation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.successIndicator}>
            <Icon name="check-circle" size={80} color="#10B981" />
          </View>
          <Text style={styles.modalTitle}>✅ Voice Order Recorded!</Text>
          <View style={styles.orderDetails}>
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderDetailLabel}>Item:</Text>
              <Text style={styles.orderDetailValue}>Cotton Fabric</Text>
            </View>
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderDetailLabel}>Quantity:</Text>
              <Text style={styles.orderDetailValue}>100 meters</Text>
            </View>
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderDetailLabel}>Order ID:</Text>
              <Text style={styles.orderDetailValueHighlight}>VO-2024-001</Text>
            </View>
            <View style={styles.orderDetailRow}>
              <Text style={styles.orderDetailLabel}>Time:</Text>
              <Text style={styles.orderDetailValue}>{new Date().toLocaleTimeString()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.goBack()}>
            <Text style={styles.confirmButtonText}>Perfect! Order Saved</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.voiceRecordingIndicator}>
          <LinearGradient
            colors={['#EF4444', '#EC4899']}
            style={styles.voiceRecordingCircle}
          >
            <Icon name="mic" size={48} color="white" />
          </LinearGradient>
        </View>
        <Text style={styles.modalTitle}>🎤 Voice Command Active</Text>
        <Text style={styles.modalSubtitle}>
          Say something like:{'\n'}<Text style={styles.boldText}>"100 meter cotton record kar do"</Text>
        </Text>
        <View style={styles.voiceTextContainer}>
          <Text style={styles.voiceText}>{voiceText}</Text>
        </View>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
            <Text style={styles.stopButtonText}>Stop Recording</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.processButton} onPress={processVoiceCommand}>
            <Text style={styles.processButtonText}>Process Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  voiceRecordingIndicator: {
    alignItems: 'center',
    marginBottom: 24,
  },
  voiceRecordingCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  voiceTextContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  voiceText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  stopButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  stopButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  processButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  processButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successIndicator: {
    alignItems: 'center',
    marginBottom: 24,
  },
  orderDetails: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  orderDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDetailLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  orderDetailValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  orderDetailValueHighlight: {
    fontSize: 16,
    color: '#6366F1',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VoiceCommandScreen;