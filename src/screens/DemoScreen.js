import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DemoApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Static demo data
  const recentOrders = [
    { id: 'ORD001', customer: 'Rajesh Kumar', product: 'Cotton Shirts (50 pcs)', amount: '12,500', date: 'Today', status: 'Completed' },
    { id: 'ORD002', customer: 'Priya Sharma', product: 'Silk Sarees (25 pcs)', amount: '18,200', date: 'Yesterday', status: 'Pending' },
    { id: 'ORD003', customer: 'Amit Patel', product: 'Denim Jeans (30 pcs)', amount: '8,900', date: '2 days ago', status: 'Processing' },
    { id: 'ORD004', customer: 'Sunita Reddy', product: 'Formal Shirts (40 pcs)', amount: '15,600', date: '3 days ago', status: 'Completed' },
    { id: 'ORD005', customer: 'Vikram Singh', product: 'Casual T-shirts (60 pcs)', amount: '9,800', date: '4 days ago', status: 'Completed' }
  ];

  const customers = [
    { id: 1, name: 'Rajesh Kumar', business: 'Mumbai Fashion Store', phone: '+91 98765 43210', orders: 12, totalSpent: '45,200' },
    { id: 2, name: 'Priya Sharma', business: 'Delhi Boutique', phone: '+91 87654 32109', orders: 8, totalSpent: '32,800' },
    { id: 3, name: 'Amit Patel', business: 'Gujarat Textiles', phone: '+91 76543 21098', orders: 15, totalSpent: '67,500' },
    { id: 4, name: 'Sunita Reddy', business: 'Hyderabad Silks', phone: '+91 65432 10987', orders: 6, totalSpent: '28,900' },
    { id: 5, name: 'Vikram Singh', business: 'Punjab Cotton Mills', phone: '+91 54321 09876', orders: 10, totalSpent: '41,200' }
  ];

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout from the demo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => setCurrentScreen('welcome') }
      ]
    );
  };

  const showDemoAlert = () => {
    setShowDemoModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Processing': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  // Welcome Screen Component
  const WelcomeScreen = () => (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.welcomeContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.welcomeContent}>
        <View style={styles.logoContainer}>
          <Icon name="tshirt" size={40} color="#764ba2" />
        </View>
        <Text style={styles.welcomeTitle}>TextilePro</Text>
        <Text style={styles.welcomeSubtitle}>Complete Textile Business Management</Text>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => setCurrentScreen('dashboard')}
        >
          <Icon name="play" size={16} color="#764ba2" style={styles.buttonIcon} />
          <Text style={styles.startButtonText}>Start Demo</Text>
        </TouchableOpacity>
        
        <LinearGradient colors={['#ff6b6b', '#feca57']} style={styles.demoBadge}>
          <Icon name="star" size={12} color="white" style={styles.badgeIcon} />
          <Text style={styles.demoBadgeText}>DEMO VERSION</Text>
        </LinearGradient>
      </View>
    </LinearGradient>
  );

  // Header Component
  const Header = () => (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Icon name="tshirt" size={24} color="white" />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>TextilePro</Text>
            <Text style={styles.headerSubtitle}>Demo Account</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="sign-out-alt" size={16} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  // Demo Badge Component
  const DemoBadge = () => (
    <LinearGradient colors={['#ff6b6b', '#feca57']} style={styles.topDemoBadge}>
      <Icon name="info-circle" size={12} color="white" />
      <Text style={styles.topDemoBadgeText}>This is a demo account - Limited functionality</Text>
    </LinearGradient>
  );

  // Stats Card Component
  const StatsCard = ({ title, value, icon, colors }) => (
    <LinearGradient colors={colors} style={styles.statsCard}>
      <View style={styles.statsContent}>
        <View>
          <Text style={styles.statsLabel}>{title}</Text>
          <Text style={styles.statsValue}>{value}</Text>
        </View>
        <Icon name={icon} size={24} color="rgba(255,255,255,0.7)" />
      </View>
    </LinearGradient>
  );

  // Dashboard Screen Component
  const DashboardScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <StatsCard title="Total Orders" value="247" icon="shopping-cart" colors={['#3B82F6', '#2563EB']} />
        <StatsCard title="Revenue" value="₹1.2L" icon="rupee-sign" colors={['#10B981', '#059669']} />
        <StatsCard title="Customers" value="89" icon="users" colors={['#8B5CF6', '#7C3AED']} />
        <StatsCard title="Products" value="156" icon="box" colors={['#F59E0B', '#D97706']} />
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#EFF6FF' }]} onPress={showDemoAlert}>
            <Icon name="plus" size={24} color="#3B82F6" />
            <Text style={[styles.quickActionText, { color: '#3B82F6' }]}>Add Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#F0FDF4' }]} onPress={showDemoAlert}>
            <Icon name="user-plus" size={24} color="#10B981" />
            <Text style={[styles.quickActionText, { color: '#10B981' }]}>Add Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#FAF5FF' }]} onPress={showDemoAlert}>
            <Icon name="box-open" size={24} color="#8B5CF6" />
            <Text style={[styles.quickActionText, { color: '#8B5CF6' }]}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#FFF7ED' }]} onPress={() => setCurrentScreen('reports')}>
            <Icon name="chart-bar" size={24} color="#F59E0B" />
            <Text style={[styles.quickActionText, { color: '#F59E0B' }]}>View Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Orders */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('orders')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {recentOrders.slice(0, 3).map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <View style={styles.orderLeft}>
              <View style={styles.orderIcon}>
                <Icon name="receipt" size={16} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
                <Text style={styles.orderProduct}>{order.product}</Text>
              </View>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.orderAmount}>₹{order.amount}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Orders Screen Component
  const OrdersScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Orders</Text>
        <TouchableOpacity style={styles.addButton} onPress={showDemoAlert}>
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {recentOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderCardHeader}>
            <View style={styles.orderLeft}>
              <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.customerAvatar}>
                <Text style={styles.avatarText}>{order.customer.charAt(0)}</Text>
              </LinearGradient>
              <View>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
                <Text style={styles.orderId}>Order #{order.id}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={showDemoAlert}>
              <Icon name="trash" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.productInfo}>
            <Text style={styles.productLabel}>Product</Text>
            <Text style={styles.productName}>{order.product}</Text>
          </View>
          
          <View style={styles.orderFooter}>
            <View>
              <Text style={styles.amountLabel}>Amount</Text>
              <Text style={styles.orderAmount}>₹{order.amount}</Text>
            </View>
            <View style={styles.orderRight}>
              <Text style={styles.dateLabel}>Date</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  // Customers Screen Component
  const CustomersScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Customers</Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: '#10B981' }]} onPress={showDemoAlert}>
          <Icon name="plus" size={16} color="white" />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {customers.map((customer) => (
        <View key={customer.id} style={styles.customerCard}>
          <View style={styles.customerHeader}>
            <View style={styles.customerLeft}>
              <LinearGradient colors={['#10B981', '#3B82F6']} style={styles.customerAvatar}>
                <Text style={styles.avatarText}>{customer.name.charAt(0)}</Text>
              </LinearGradient>
              <View>
                <Text style={styles.customerName}>{customer.name}</Text>
                <Text style={styles.customerBusiness}>{customer.business}</Text>
                <Text style={styles.customerPhone}>{customer.phone}</Text>
              </View>
            </View>
            <View style={styles.customerActions}>
              <TouchableOpacity onPress={showDemoAlert} style={styles.actionButton}>
                <Icon name="edit" size={16} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={showDemoAlert} style={styles.actionButton}>
                <Icon name="trash" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.customerStats}>
            <View>
              <Text style={styles.statLabel}>Total Orders</Text>
              <Text style={styles.statValue}>{customer.orders}</Text>
            </View>
            <View style={styles.customerRight}>
              <Text style={styles.statLabel}>Total Spent</Text>
              <Text style={[styles.statValue, { color: '#10B981' }]}>₹{customer.totalSpent}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  // Reports Screen Component
  const ReportsScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.screenTitle}>Reports & Analytics</Text>

      {/* Monthly Stats */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>This Month</Text>
        <View style={styles.monthlyStats}>
          <View style={styles.monthlyStat}>
            <Text style={styles.monthlyValue}>₹45,200</Text>
            <Text style={styles.monthlyLabel}>Revenue</Text>
          </View>
          <View style={styles.monthlyStat}>
            <Text style={[styles.monthlyValue, { color: '#10B981' }]}>67</Text>
            <Text style={styles.monthlyLabel}>Orders</Text>
          </View>
        </View>
      </View>

      {/* Top Products */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Products</Text>
        <View style={styles.productList}>
          <View style={styles.productItem}>
            <Text style={styles.productName}>Cotton Shirts</Text>
            <Text style={styles.productRevenue}>₹12,500</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.productName}>Silk Sarees</Text>
            <Text style={styles.productRevenue}>₹18,200</Text>
          </View>
          <View style={styles.productItem}>
            <Text style={styles.productName}>Denim Jeans</Text>
            <Text style={styles.productRevenue}>₹8,900</Text>
          </View>
        </View>
      </View>

      {/* Growth Chart Placeholder */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sales Growth</Text>
        <LinearGradient colors={['#DBEAFE', '#E0E7FF']} style={styles.chartPlaceholder}>
          <Icon name="chart-line" size={40} color="#3B82F6" />
          <Text style={styles.chartText}>Chart visualization</Text>
          <Text style={styles.chartSubtext}>+23% growth this month</Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );

  // Bottom Navigation Component
  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setCurrentScreen('dashboard')}
      >
        <Icon 
          name="home" 
          size={20} 
          color={currentScreen === 'dashboard' ? '#3B82F6' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, { color: currentScreen === 'dashboard' ? '#3B82F6' : '#9CA3AF' }]}>
          Dashboard
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setCurrentScreen('orders')}
      >
        <Icon 
          name="shopping-cart" 
          size={20} 
          color={currentScreen === 'orders' ? '#3B82F6' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, { color: currentScreen === 'orders' ? '#3B82F6' : '#9CA3AF' }]}>
          Orders
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setCurrentScreen('customers')}
      >
        <Icon 
          name="users" 
          size={20} 
          color={currentScreen === 'customers' ? '#3B82F6' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, { color: currentScreen === 'customers' ? '#3B82F6' : '#9CA3AF' }]}>
          Customers
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setCurrentScreen('reports')}
      >
        <Icon 
          name="chart-bar" 
          size={20} 
          color={currentScreen === 'reports' ? '#3B82F6' : '#9CA3AF'} 
        />
        <Text style={[styles.navText, { color: currentScreen === 'reports' ? '#3B82F6' : '#9CA3AF' }]}>
          Reports
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Demo Alert Modal Component
  const DemoModal = () => (
    <Modal
      visible={showDemoModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDemoModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalIcon}>
            <Icon name="exclamation-triangle" size={24} color="#F59E0B" />
          </View>
          <Text style={styles.modalTitle}>Demo Account</Text>
          <Text style={styles.modalText}>
            This is a demo account. You cannot add, edit, or delete data. Upgrade to a full account to access all features.
          </Text>
          
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setShowDemoModal(false)}
          >
            <Text style={styles.modalButtonText}>Got it!</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.upgradeButton}
            onPress={() => setShowDemoModal(false)}
          >
            <LinearGradient colors={['#10B981', '#3B82F6']} style={styles.upgradeGradient}>
              <Icon name="crown" size={16} color="white" />
              <Text style={styles.upgradeButtonText}>Upgrade Account</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Main render function
  const renderScreen = () => {
    if (currentScreen === 'welcome') {
      return <WelcomeScreen />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header />
        <DemoBadge />
        
        {currentScreen === 'dashboard' && <DashboardScreen />}
        {currentScreen === 'orders' && <OrdersScreen />}
        {currentScreen === 'customers' && <CustomersScreen />}
        {currentScreen === 'reports' && <ReportsScreen />}
        
        <BottomNavigation />
        <DemoModal />
      </SafeAreaView>
    );
  };

  return renderScreen();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // Welcome Screen Styles
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: 96,
    height: 96,
    backgroundColor: 'white',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  startButtonText: {
    color: '#764ba2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  demoBadge: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    marginRight: 4,
  },
  demoBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Header Styles
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },

  // Demo Badge Styles
  topDemoBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topDemoBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },

  // Screen Container
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },

  // Stats Styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  statsValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Card Styles
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },

  // Quick Actions Styles
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },

  // Order Styles
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  orderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  orderProduct: {
    fontSize: 14,
    color: '#6B7280',
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Screen Header Styles
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },

  // Order Card Styles
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 12,
    color: '#6B7280',
  },
  productInfo: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  productLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Customer Styles
  customerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  customerBusiness: {
    fontSize: 14,
    color: '#6B7280',
  },
  customerPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  customerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 8,
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  // Reports Styles
  monthlyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monthlyStat: {
    alignItems: 'center',
  },
  monthlyValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  monthlyLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  productList: {
    space: 12,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  chartPlaceholder: {
    height: 128,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    color: '#6B7280',
    marginTop: 8,
  },
  chartSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Bottom Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#FEF3C7',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  upgradeButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  upgradeGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default DemoApp;