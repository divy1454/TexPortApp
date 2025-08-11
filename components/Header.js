import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Css/Header.styles';

const Header = ({ navigation }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userData));
    };
    fetchUser();
  }, []);

  const handleAvatarPress = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Profile');
    } else {
      console.log('Navigation not available');
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.header}
    >
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerTitle}>TexPort</Text>
          <Text style={styles.headerSubtitle}>Welcome, {user ? user.name : 'Guest'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => console.log('Notifications')}>
            <Icon name="notifications" size={24} color="white" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.avatar}
            onPress={handleAvatarPress}
          >
            <Text style={styles.avatarText}>
              {user ? user.name.charAt(0).toUpperCase() : 'T'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Header;
