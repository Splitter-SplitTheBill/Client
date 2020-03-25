import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import logoImage from "../assets/logo.jpg";
import { Dropdown } from "react-native-material-dropdown";
import axios from "axios";

export default function RegistAddScreen(props) {
  console.log(props, "<<<<<");
  const [account, setAccount] = useState([]);
  const baseUrl = "http://localhost:3000";

  const Register = () => {
    axios({
      method: "POST",
      url: baseUrl + "/users/register",
      data: {
        name: props.route.params.names,
        email: props.route.params.email,
        username: props.route.params.username,
        password: props.route.params.password,
        image_url:
          "https://lh3.googleusercontent.com/proxy/_bs59aeNbs6XJrlZgC5FEZ3wqDcbzRiVcCuPUyGvp0G_OyxuT8nLOtoHU72_8C7btYk4aORLfSdlV43k7y5Azks",
        friendList: [],
        accounts: account
      }
    })
      .then(response => {
        console.log(response.data);
        props.navigation.navigate("Login");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const data = [
    {
      value: "Gopay"
    },
    {
      value: "OVO"
    },
    {
      value: "Dana"
    }
  ];

  function onChangeTextPress(value) {
    setAccount(
      account.concat({ name: value, instance: value, accountNumber: "83700" })
    );
    console.log(account);
  }

  console.log(account, "ini acccc");

  return (
    <View style={styles.container}>
      <View style={styles.boxLogo}>
        <Image style={styles.imageLogo} source={logoImage} />
        <Text style={styles.textLogo}>Splitter</Text>
      </View>
      <View style={styles.boxLogin}>
        <Text style={styles.loginText}>Register</Text>
        <View>
          {account.map(acc => {
            return (
              <Text>
                {acc.name} {acc.accountNumber}
              </Text>
            );
          })}
        </View>
        <Text style={styles.textInput}>Add Account</Text>
        <View style={{ marginTop: 10 }}>
          <Dropdown
            dropdownOffset={{ top: 5 }}
            containerStyle={{
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 50,
              width: 200,
              paddingLeft: 3
            }}
            rippleCentered={true}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
            label="Payment Account"
            data={data}
            valueExtractor={({ value }) => value}
            onChangeText={value => {
              onChangeTextPress(value);
            }}
          />
        </View>
        <View style={styles.buttonLogin}>
          <Button title="Register" onPress={() => Register()} color="#0b8457" />
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
    zIndex: 0,
    fontFamily: 'Hotham',
  },
  imageLogo: {
    width: 100,
    height: 100,
    borderColor: "white",
    borderWidth: 2
  },
  loginText: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: 'ProximaNova-Regular'
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
    borderBottomColor: "#0b8457",
    borderBottomWidth: 2,
    marginBottom: 30
  },
  textInput: {
    color: "#0b8457",
    marginBottom: 5,
    marginTop: 5,
    marginRight: "auto",
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular'
  },
  boxLogo: {
    paddingTop: 80,
    paddingBottom: 50,
    backgroundColor: "#0b8457",
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
