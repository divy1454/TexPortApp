import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Css/ToolCard.styles';
import Icon from '@react-native-vector-icons/material-design-icons';

const ToolCard = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.toolCard} onPress={onPress}>
      <Icon name={icon} size={24} color="black" />
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

export default ToolCard;