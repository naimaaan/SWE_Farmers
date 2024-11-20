import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import type { ExternalPathString, RelativePathString } from 'expo-router';


export default function LoginScreen() {
  const router = useRouter();

  // Function to handle login and set the role
  const handleLogin = async (role: 'buyer' | 'farmer') => {
    try {
      // Save the selected role in AsyncStorage
      await AsyncStorage.setItem('userRole', role);
      // Redirect to the respective layout
      router.replace(`\${role}` as ExternalPathString);
    } catch (error) {
      console.error('Error saving user role:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Button   
        title="Login as Buyer"
        onPress={() => handleLogin('buyer')}
        color="#4CAF50" // Green button for Buyer
      />
      <View style={styles.spacer} />
      <Button
        title="Login as Farmer"
        onPress={() => handleLogin('farmer')}
        color="#2196F3" // Blue button for Farmer
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  spacer: {
    height: 16, // Add space between buttons
  },
});
