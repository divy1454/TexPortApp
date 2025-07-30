import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MoreFeatureItem = ({ title, subtitle, buttonText, buttonColor, onPress }) => {
  return (
    <View style={styles.moreFeatureItem}>
      <View style={styles.moreFeatureInfo}>
        <Text style={styles.moreFeatureTitle}>{title}</Text>
        <Text style={styles.moreFeatureSubtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.moreFeatureButton, { backgroundColor: buttonColor }]}
        onPress={onPress}
      >
        <Text style={styles.moreFeatureButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  moreFeatureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  moreFeatureInfo: {
    flex: 1,
  },
  moreFeatureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  moreFeatureSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  moreFeatureButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  moreFeatureButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MoreFeatureItem;