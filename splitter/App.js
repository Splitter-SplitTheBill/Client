import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { Provider } from 'react-redux'
// import store from './store'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  RegistAddScreen
} from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          unmountInactiveRoutes: true
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegistAdd" component={RegistAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}
