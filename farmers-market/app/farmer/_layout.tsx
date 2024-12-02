import { Tabs } from 'expo-router'; 
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function FarmerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Dashboard tab: Displays the farmer's dashboard with stock and notifications */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tray.fill" color={color} />,
        }}
      />

      {/* Add Product tab: Farmers can add new products (with fields like name, category, price, etc.) */}
      <Tabs.Screen
        name="addProduct"
        options={{
          title: 'Add Product',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.app.fill" color={color} />,
        }}
      />

      {/* Manage Products tab: Farmers can update, delete, and manage existing products */}
      <Tabs.Screen
        name="manageProducts"
        options={{
          title: 'Manage Products',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil.and.outline" color={color} />,
        }}
      />

      {/* Low Stock Notifications tab: A place for notifications about products that need restocking */}
      <Tabs.Screen
        name="lowStockNotifications"
        options={{
          title: 'Low Stock',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="exclamationmark.triangle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
