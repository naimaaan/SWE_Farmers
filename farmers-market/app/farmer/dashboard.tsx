import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FarmerDashboard() {
  return (
    <View style={styles.container}>
      <Text>Farmer Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
