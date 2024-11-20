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
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="tray.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addProduct"
        options={{
          title: 'Add Product',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.app.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="manageProducts"
        options={{
          title: 'Manage Products',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="pencil.and.outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
