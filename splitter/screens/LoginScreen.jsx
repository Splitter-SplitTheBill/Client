import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserLogin } from "../actions/userAction";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import logoImage from "../assets/logo.jpg";
import axios from "axios";

export default function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = "http://192.168.1.5:3000";

  const dispatch = useDispatch();

  const login = () => {
    if (!username || !password) {
      alert(
        "Oopss..",
        "You must filled username and password to login",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      axios({
        method: "POST",
        url: baseUrl + "/users/login",
        data: {
          username,
          password
        }
      })
        .then(response => {
          dispatch(UserLogin(response.data));
          console.log(response.data);
          props.navigation.navigate("TabNavigation");
        })
        .catch(err => {
          console.log(err.response);
          alert(
            "Oopss..",
            "Your username or password did not match",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        });
    }
  };
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
          <Button title="Login" onPress={() => login()} color="#6597A0" />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Register")}
        style={styles.textRegister}
      >
        <Text>Register Here</Text>
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
    zIndex: 1,
    marginTop: 30,
    paddingBottom: 50
  },
  inputLogin: {
    borderBottomColor: "#6597A0",
    borderBottomWidth: 2,
    marginBottom: 30,
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
  },
  textRegister: {
    marginTop: 30,
    fontSize: 25
  }
});
