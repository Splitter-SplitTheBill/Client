import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import logoImage from "../assets/logo.jpg";
import { Dropdown } from "react-native-material-dropdown";

export default function RegistAddScreen(props) {
  const [account, setAccount] = useState([""]);

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
    setAccount(account.concat(value));
    console.log(account);
  }

  console.log(account);

  function regisAddAcc() {
    props.navigation.navigate("Home");
  }
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
            return <Text>{acc}</Text>;
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
          <Button
            title="Register"
            onPress={() => regisAddAcc()}
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
    marginTop: 30,
    zIndex: 3
  }
});
