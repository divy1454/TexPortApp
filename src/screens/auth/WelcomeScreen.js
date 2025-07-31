import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions, 
  ScrollView,
  Animated,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const logoAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Logo floating animation
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Fade in animation
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    // Slide up animation
    const slideUpAnimation = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    });

    floatAnimation.start();
    fadeInAnimation.start();
    slideUpAnimation.start();
  }, []);

  const logoTranslateY = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const features = [
    { 
      icon: '💰', 
      title: 'Smart Payments', 
      subtitle: 'Track every rupee with AI-powered insights',
      color: '#10B981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    { 
      icon: '🏢', 
      title: 'Party Hub', 
      subtitle: 'Manage 1000+ customers effortlessly',
      color: '#6366F1',
      bgColor: 'rgba(99, 102, 241, 0.1)'
    },
    { 
      icon: '📊', 
      title: 'GST Autopilot', 
      subtitle: 'Never miss a filing deadline again',
      color: '#F59E0B',
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    { 
      icon: '👥', 
      title: 'Team Control', 
      subtitle: 'Attendance, payroll & productivity',
      color: '#8B5CF6',
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    { 
      icon: '🤖', 
      title: 'AI Predictions', 
      subtitle: 'Market trends & demand forecasting',
      color: '#EF4444',
      bgColor: 'rgba(239, 68, 68, 0.1)'
    },
    { 
      icon: '🚛', 
      title: 'Logistics Pro', 
      subtitle: 'Book transporters in 30 seconds',
      color: '#06B6D4',
      bgColor: 'rgba(6, 182, 212, 0.1)'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Businesses' },
    { number: '₹50Cr+', label: 'Transactions Managed' },
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Support Available' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Mumbai Silk House',
      avatar: 'R',
      rating: 5,
      text: 'Increased my business efficiency by 300%! Best investment ever.'
    },
    {
      name: 'Priya Sharma',
      business: 'Delhi Fashion Hub',
      avatar: 'P',
      rating: 5,
      text: 'GST filing is now completely automated. Saves me 10 hours weekly!'
    },
    {
      name: 'Amit Patel',
      business: 'Gujarat Textiles',
      avatar: 'A',
      rating: 5,
      text: 'Customer management has never been this easy. Highly recommended!'
    }
  ];

  const handleStartFreeTrial = () => {
    Alert.alert(
      '🎉 Start Free Trial',
      'Get 30 days of premium features absolutely free!\n\n✅ No credit card required\n✅ Full feature access\n✅ Cancel anytime',
      [
        { text: 'Maybe Later', style: 'cancel' },
        { 
          text: 'Start Now', 
          onPress: () => navigation.navigate('Register'),
          style: 'default'
        }
      ]
    );
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleDemo = () => {
    Alert.alert(
      '🎯 Demo Mode',
      'Explore all features with sample data!\n\n• No registration required\n• Full feature preview\n• Sample business data',
      [
        { text: 'Back', style: 'cancel' },
        { 
          text: 'Explore Demo', 
          onPress: () => navigation.replace('Main'),
          style: 'default'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section */}
        <LinearGradient colors={['#1E1B4B', '#3730A3', '#6366F1']} style={styles.heroSection}>
          <Animated.View 
            style={[
              styles.logoContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: logoTranslateY }]
              }
            ]}
          >
            <LinearGradient 
              colors={['#FBBF24', '#F59E0B']} 
              style={styles.logoGradient}
            >
              <Text style={styles.appIcon}>🏭</Text>
            </LinearGradient>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.appName}>TextilePro</Text>
            <Text style={styles.appVersion}>v2.0 - Professional Edition</Text>
            <Text style={styles.appTagline}>
              Transform Your Textile Business with{'\n'}
              <Text style={styles.highlightText}>AI-Powered Management</Text>
            </Text>
          </Animated.View>

          {/* Stats Section */}
          <Animated.View 
            style={[
              styles.statsSection,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.statsTitle}>Trusted by Industry Leaders</Text>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🚀 Powerful Features</Text>
            <Text style={styles.sectionSubtitle}>Everything you need to scale your textile business</Text>
          </View>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Animated.View 
                key={index} 
                style={[
                  styles.featureCard,
                  { 
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                <View style={[styles.featureIconContainer, { backgroundColor: feature.bgColor }]}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                <View style={[styles.featureAccent, { backgroundColor: feature.color }]} />
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💬 What Our Users Say</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialsScroll}
          >
            {testimonials.map((testimonial, index) => (
              <View key={index} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <LinearGradient 
                    colors={['#6366F1', '#8B5CF6']} 
                    style={styles.testimonialAvatar}
                  >
                    <Text style={styles.testimonialAvatarText}>{testimonial.avatar}</Text>
                  </LinearGradient>
                  <View style={styles.testimonialInfo}>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialBusiness}>{testimonial.business}</Text>
                    <View style={styles.testimonialRating}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Text key={i} style={styles.star}>⭐</Text>
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleStartFreeTrial}
            activeOpacity={0.8}
          >
            <LinearGradient colors={['#10B981', '#059669']} style={styles.primaryButtonGradient}>
              <Text style={styles.primaryButtonText}>🚀 Start Free Trial</Text>
              <Text style={styles.primaryButtonSubtext}>No credit card required</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Icon name="login" size={18} color="#6366F1" />
            <Text style={styles.secondaryButtonText}>Sign In to Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.demoButton}
            onPress={handleDemo}
            activeOpacity={0.8}
          >
            <Icon name="play-circle-outline" size={18} color="#8B5CF6" />
            <Text style={styles.demoButtonText}>Explore Demo</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerBadges}>
            <View style={styles.badge}>
              <Icon name="security" size={16} color="#10B981" />
              <Text style={styles.badgeText}>Bank-Grade Security</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="cloud-done" size={16} color="#6366F1" />
              <Text style={styles.badgeText}>Cloud Backup</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="support-agent" size={16} color="#F59E0B" />
              <Text style={styles.badgeText}>24/7 Support</Text>
            </View>
          </View>
          <Text style={styles.footerText}>
            🇮🇳 Made in India for Indian Textile Businesses{'\n'}
            Join the digital textile revolution today!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  appIcon: {
    fontSize: 48,
  },
  appName: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  appVersion: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  appTagline: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
  },
  highlightText: {
    color: '#FBBF24',
    fontWeight: 'bold',
  },
  statsSection: {
    paddingTop: 30,
    width: '100%',
  },
  statsTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: (width - 64) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    textAlign: 'center',
  },
  featuresSection: {
    backgroundColor: 'white',
    padding: 20,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#6B7280',
    fontSize: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: (width - 56) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    position: 'relative',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  featureAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  testimonialsSection: {
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  testimonialsScroll: {
    paddingHorizontal: 10,
    gap: 16,
  },
  testimonialCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  testimonialAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontWeight: 'bold',
    color: '#1F2937',
    fontSize: 14,
  },
  testimonialBusiness: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  testimonialRating: {
    flexDirection: 'row',
    marginTop: 4,
  },
  star: {
    fontSize: 12,
  },
  testimonialText: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  primaryButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  demoButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  demoButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    alignItems: 'center',
  },
  footerBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WelcomeScreen;