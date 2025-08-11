import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDemoMode } from '../src/context/DemoContext';
import styles from './Css/DemoBanner.styles';

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

export default DemoBanner;
