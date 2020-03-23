import React from 'react'
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen, ProfileScreen, FriendListScreen } from './index'

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" >
      <Tab.Screen name="FriendListScreen" component={FriendListScreen} options={{title: "Friends"}}/>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{title: "Home"}}/>
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile"}}/>
    </Tab.Navigator>
  )
}

export default TabNavigation