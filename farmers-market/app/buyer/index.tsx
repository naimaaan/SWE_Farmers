import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BuyerHome() {
  return (
    <View style={styles.container}>
      <Text>Welcome, Buyer!</Text>
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
