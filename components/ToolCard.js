import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Css/ToolCard.styles';

const ToolCard = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.toolCard} onPress={onPress}>
      <Text style={styles.toolIcon}>{icon}</Text>
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

export default ToolCard;