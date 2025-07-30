import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.header}
    >
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerTitle}>TexPort</Text>
          <Text style={styles.headerSubtitle}>Digital Textile Bazaar</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => console.log('Notifications')}>
            <Icon name="notifications" size={24} color="white" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>T</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.voiceButton} 
          onPress={() => navigation.navigate('VoiceCommand')}
        >
          <Icon name="mic" size={32} color="white" />
          <Text style={styles.quickActionText}>Voice Order</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.aiButton} 
          onPress={() => navigation.navigate('AIPredictions')}
        >
          <Text style={styles.aiEmoji}>🤖</Text>
          <Text style={styles.quickActionText}>AI Trends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₹2.4L</Text>
          <Text style={styles.statLabel}>Due Amount</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Total Parties</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>14</Text>
          <Text style={styles.statLabel}>Machines</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  voiceButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  aiButton: {
    flex: 1,
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  aiEmoji: {
    fontSize: 32,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
export default Header;