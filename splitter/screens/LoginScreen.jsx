import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import logoImage from "../assets/logo.jpg";

export default function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.boxLogo}>
        <Image style={styles.imageLogo} source={logoImage} />
        <Text style={styles.textLogo}>Splitter</Text>
      </View>
      <View style={styles.boxLogin}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.textInput}>Username</Text>
        <TextInput
          editable
          maxLength={50}
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.inputLogin}
        ></TextInput>
        <Text style={styles.textInput}>Password</Text>
        <TextInput
          editable
          maxLength={50}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          style={styles.inputLogin}
        ></TextInput>
        <View style={styles.buttonLogin}>
          <Button
            title="Login"
            onPress={() => props.navigation.navigate("Home")}
            color="#6597A0"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Register")}
        style={styles.textRegister}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  textLogo: {
    color: "white",
    fontSize: 50,
    marginLeft: 10,
    zIndex: 0
  },
  imageLogo: {
    width: 100,
    height: 100,
    borderColor: "white",
    borderWidth: 2
  },
  loginText: {
    fontSize: 25,
    fontWeight: "normal",
    textAlign: "center"
  },
  boxLogin: {
    backgroundColor: "white",
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.5,
    width: 300,
    zIndex: 5,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    marginTop: 220,
    paddingBottom: 50
  },
  inputLogin: {
    borderBottomColor: "#6597A0",
    borderBottomWidth: 2,
    marginBottom: 30
  },
  textInput: {
    color: "#6597A0",
    marginBottom: 5,
    marginTop: 5,
    marginRight: "auto",
    fontSize: 17
  },
  boxLogo: {
    paddingTop: 80,
    paddingBottom: 50,
    backgroundColor: "#6597A0",
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonLogin: {
    width: 100,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 150,
    position: "absolute",
    zIndex: 3
  },
  textRegister: {
    marginTop: 400,
    fontSize: 15,
    zIndex: 10,
    position: "absolute"
  }
});
