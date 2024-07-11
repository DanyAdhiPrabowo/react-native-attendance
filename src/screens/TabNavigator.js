import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import BerandaScreen from './BerandaScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Beranda">
      <Tab.Screen
        name="Beranda"
        component={BerandaScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Beranda',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          tabBarActiveBackgroundColor: '#2196F3',
          tabBarActiveTintColor: '#f8f9fa',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          tabBarActiveBackgroundColor: '#2196F3',
          tabBarActiveTintColor: '#f8f9fa',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
