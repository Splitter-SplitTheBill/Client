import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import logoImage from "../assets/logo.jpg";

export default function RegistAddScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.boxLogo}>
        <Image style={styles.imageLogo} source={logoImage} />
        <Text style={styles.textLogo}>Splitter</Text>
      </View>
      <View style={styles.boxLogin}>
        <Text style={styles.loginText}>Register</Text>
        <Text style={styles.textInput}>Username</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => setUsername(text)}
          value={username}
          style={styles.inputLogin}
        ></TextInput>
        <Text style={styles.textInput}>Name</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => setName(text)}
          value={username}
          style={styles.inputLogin}
        ></TextInput>
        <Text style={styles.textInput}>Password</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          style={styles.inputLogin}
        ></TextInput>
        <Text style={styles.textInput}>Email</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.inputLogin}
        ></TextInput>
        <View style={styles.buttonLogin}>
          <Button
            title="Next"
            onPress={() => props.navigation.navigate("RegistAdd")}
            color="#6597A0"
          />
        </View>
      </View>
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
    zIndex: 1,
    marginTop: 30,
    paddingBottom: 30
  },
  inputLogin: {
    borderBottomColor: "#6597A0",
    borderBottomWidth: 2,
    marginBottom: 15,
    width: 150
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
    marginTop: 30,
    zIndex: 3
  }
});
