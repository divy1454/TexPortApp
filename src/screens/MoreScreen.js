import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import DemoBanner from '../../components/DemoBanner';
import ToolCard from '../../components/ToolCard';
import { useDemoMode } from '../context/DemoContext';
import styles from '../../components/Css/MoreScreen.styles';

const { width } = Dimensions.get('window');

// Local FeatureItem component (consolidated from MoreFeatureItem)
const FeatureItem = ({ title, subtitle, buttonText, buttonColor, onPress }) => (
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

const MoreScreen = ({ navigation }) => {
  const { demoMode, showDemoAlert, disableDemoMode } = useDemoMode();

  const handleExitDemo = () => {
    disableDemoMode();
    navigation.navigate('Welcome');
  };

  const handleNavigateWithDemoCheck = (screenName) => {
    if (demoMode) {
      showDemoAlert();
      return;
    }
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <DemoBanner navigation={navigation} />
      
      <ScrollView style={styles.content}>
        {demoMode && (
          <View style={styles.demoCard}>
            <Text style={styles.demoCardTitle}>🎯 Demo Mode Active</Text>
            <Text style={styles.demoCardText}>
              You're exploring the app with sample data. Features are limited in demo mode.
            </Text>
            <TouchableOpacity style={styles.exitDemoButton} onPress={handleExitDemo}>
              <Text style={styles.exitDemoButtonText}>Exit Demo Mode</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <Text style={styles.sectionTitle}>⚡ Additional Features</Text>
        
        {/* Yaan & Transportation */}
        <View style={styles.moreCard}>
          <Text style={styles.moreCardTitle}>🚛 Yaan & Transportation</Text>
          <View style={styles.moreCardContent}>
            <FeatureItem
              title="Purchase Reminders"
              subtitle="5 pending reminders"
              buttonText="View"
              buttonColor="#F59E0B"
            />
            <FeatureItem
              title="Book Transporter"
              subtitle="Truck booking plugin"
              buttonText="Book"
              buttonColor="#10B981"
              onPress={() => handleNavigateWithDemoCheck('TransporterBooking')}
            />
            <FeatureItem
              title="Other Costs"
              subtitle="Monthly expenses"
              buttonText="₹45,600"
              buttonColor="#3B82F6"
            />
          </View>
        </View>

        {/* Quick Tools Grid */}
        <View style={styles.toolsGrid}>
          <ToolCard 
            icon="📊" 
            title="Bill Sorting" 
            subtitle="Asc/Desc Order" 
            onPress={() => handleNavigateWithDemoCheck('BillSorting')} 
          />
          <ToolCard 
            icon="🧮" 
            title="Calculator" 
            subtitle="Quick Math" 
            onPress={() => demoMode && showDemoAlert()}
          />
          <ToolCard 
            icon="📈" 
            title="Analytics" 
            subtitle="Business Reports" 
            onPress={() => demoMode && showDemoAlert()}
          />
          <ToolCard 
            icon="⚙️" 
            title="Settings" 
            subtitle="App Config" 
            onPress={() => demoMode && showDemoAlert()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreScreen;



// =================================================================================================
// ❌❌❌❌❌❌❌ This code is use for the feature don't remove this code ❌❌❌❌❌❌❌
// =================================================================================================
// import React, { useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import { useForm, Controller, useFieldArray } from 'react-hook-form';
// import { Picker } from '@react-native-picker/picker';

// export default function CreateOrderScreen() {
//   const { control, handleSubmit, watch, setValue } = useForm({
//     defaultValues: {
//       partyName: '',
//       items: [{ productName: '', qty: '', price: '' }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'items',
//   });

//   // Example product list
//   const products = [
//     { name: 'Cotton', price: 50 },
//     { name: 'Silk', price: 100 },
//     { name: 'Wool', price: 80 },
//   ];

//   const items = watch('items');

//   // Calculate subtotal
//   const subtotal = useMemo(() => {
//     return items.reduce((sum, item) => {
//       const qty = parseFloat(item.qty) || 0;
//       const price = parseFloat(item.price) || 0;
//       return sum + qty * price;
//     }, 0);
//   }, [items]);

//   const onSubmit = data => {
//     console.log('Final Order:', data);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create Order</Text>

//       {/* Party Name */}
//       <Text style={styles.label}>Party Name</Text>
//       <Controller
//         control={control}
//         name="partyName"
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Party Name"
//             value={value}
//             onChangeText={onChange}
//           />
//         )}
//       />

//       <Text style={styles.subHeader}>Order Items</Text>
//       <FlatList
//         data={fields}
//         keyExtractor={item => item.id}
//         renderItem={({ item, index }) => (
//           <View style={styles.itemRow}>
//             {/* Product Dropdown */}
//             <Controller
//               control={control}
//               name={`items.${index}.productName`}
//               render={({ field: { value } }) => (
//                 <Picker
//                   selectedValue={value}
//                   style={[styles.input, { flex: 1 }]}
//                   onValueChange={selected => {
//                     const product = products.find(p => p.name === selected);
//                     setValue(`items.${index}.productName`, selected);
//                     if (product) {
//                       setValue(`items.${index}.price`, String(product.price));
//                       setValue(`items.${index}.qty`, '1');
//                     }
//                   }}
//                 >
//                   <Picker.Item label="Select Product" value="" />
//                   {products.map((p, i) => (
//                     <Picker.Item key={i} label={p.name} value={p.name} />
//                   ))}
//                 </Picker>
//               )}
//             />

//             {/* Qty */}
//             <Controller
//               control={control}
//               name={`items.${index}.qty`}
//               render={({ field: { onChange, value } }) => (
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Qty"
//                   keyboardType="numeric"
//                   value={value}
//                   onChangeText={onChange}
//                 />
//               )}
//             />

//             {/* Price */}
//             <Controller
//               control={control}
//               name={`items.${index}.price`}
//               render={({ field: { onChange, value } }) => (
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Price"
//                   keyboardType="numeric"
//                   value={value}
//                   onChangeText={onChange}
//                 />
//               )}
//             />

//             <Button title="❌" onPress={() => remove(index)} />
//           </View>
//         )}
//       />

//       <Button
//         title="➕ Add Item"
//         onPress={() => append({ productName: '', qty: '', price: '' })}
//       />

//       {/* Subtotal */}
//       <Text style={styles.subtotal}>Subtotal: ₹{subtotal.toFixed(2)}</Text>

//       {/* Submit */}
//       <Button title="Save Order" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
//   subHeader: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
//   label: { fontSize: 16, fontWeight: '500' },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginVertical: 5,
//     borderRadius: 6,
//   },
//   itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   subtotal: { fontSize: 18, fontWeight: 'bold', marginVertical: 12 },
// });
