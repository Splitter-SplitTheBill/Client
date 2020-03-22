import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Ke Login"
        onPress={() => props.navigation.navigate("Login")}
        color="rgb(150,9,77)"
      />
      <Button
        title="Ke Register"
        onPress={() => props.navigation.navigate("Register")}
        color="rgb(150,9,77)"
      />
      <Button
        title="Ke Register Add"
        onPress={() => props.navigation.navigate("RegistAdd")}
        color="rgb(150,9,77)"
      />
      <Button
        title="Ke Profile"
        onPress={() => props.navigation.navigate("Profile")}
        color="rgb(150,9,77)"
      />
      <Button
        title="Ke Unpaid"
        onPress={() => props.navigation.navigate("Unpaid")}
        color="rgb(150,9,77)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
