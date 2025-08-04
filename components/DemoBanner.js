import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDemoMode } from '../src/context/DemoContext';

const DemoBanner = ({ navigation }) => {
  const { demoMode, disableDemoMode } = useDemoMode();

  if (!demoMode) return null;

  const handleExitDemo = () => {
    disableDemoMode();
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.demoBanner}>
      <View style={styles.bannerContent}>
        <Icon name="info" size={16} color="#F59E0B" />
        <Text style={styles.bannerText}>
          You are using demo mode – data is for display only
        </Text>
      </View>
      <TouchableOpacity style={styles.exitButton} onPress={handleExitDemo}>
        <Text style={styles.exitButtonText}>Exit Demo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  demoBanner: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F59E0B',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bannerText: {
    marginLeft: 8,
    color: '#92400E',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  exitButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DemoBanner;
