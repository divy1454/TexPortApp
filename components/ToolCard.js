import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ToolCard = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.toolCard} onPress={onPress}>
      <Text style={styles.toolIcon}>{icon}</Text>
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toolCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 48) / 2, // Two cards per row with margins
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default ToolCard;