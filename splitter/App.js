import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux'
import store from './store'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  RegistAddScreen,
  ProfileScreen,
  EditProfileScreen,
  UnpaidScreen,
  UnpaidDetailScreen,
  HistoryScreen,
  DetailHistoryScreen, 
  AddFriendScreen,
  SearchFriendScreen,
  CreateEventScreen,
  CameraScreen
} from "./screens";
import TabNavigation from './screens/TabNavigation'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          unmountInactiveRoutes: true
        }}
      >
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RegistAdd" component={RegistAddScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Unpaid" component={UnpaidScreen} />
        <Stack.Screen name="UnpaidDetail" component={UnpaidDetailScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="DetailHistoryScreen" component={DetailHistoryScreen} />
        <Stack.Screen name="SearchFriendScreen" component={SearchFriendScreen} />
        <Stack.Screen name="AddFriendScreen" component={AddFriendScreen} />
        <Stack.Screen name="Create" component={CreateEventScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}
