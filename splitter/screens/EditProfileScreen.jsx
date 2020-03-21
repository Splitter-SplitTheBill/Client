import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";

export default function EditProfileScreen(props) {
  const userData = props.route.params.userData;
  const [image_profile, setImange] = useState(userData.image_profile);
  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [accounts, setAccount] = useState(userData.accounts);

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

  function editProfile() {
    props.navigation.navigate("Home");
  }

  function onChangeTextPress(value) {
    setAccount(accounts.concat({ type: value, detail: "" }));
    console.log(accounts);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: 40
            }}
          >
            <Image
              style={styles.imageProfile}
              source={{
                uri: image_profile
              }}
            />
            <TouchableOpacity style={styles.textChangeImage}>
              <Text style={{ color: "black", opacity: 0.5 }}>
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View>
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
              value={name}
              style={styles.inputLogin}
            ></TextInput>
            <View style={styles.buttonLogin}></View>
          </View>
          <View>
            <Text style={styles.textTitleAcc}>Account List</Text>
            {accounts.map(acc => {
              return (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={styles.AccDetailType}>{acc.type}</Text>
                  <Text style={styles.AccDetailNumber}>{acc.detail}</Text>
                </View>
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
        </View>
        <View style={styles.buttonManage}>
          <Button
            title="Submit"
            onPress={() => editProfile()}
            color="#BE3030"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageProfile: {
    width: 130,
    height: 130,
    borderRadius: 99,
    justifyContent: "center",
    marginBottom: 10
  },
  buttonManage: {
    borderRadius: 6,
    marginTop: 20,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10
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
  textTitleAcc: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "#6597A0",
    color: "white",
    paddingBottom: 7,
    borderRadius: 10,
    textAlign: "center"
  },
  AccDetailType: {
    borderColor: "#6597A0",
    borderWidth: 1,
    padding: 5,
    width: 80
  },
  AccDetailNumber: {
    borderColor: "#6597A0",
    borderWidth: 1,
    padding: 5,
    width: 120,
    textAlign: "center"
  },
  textChangeImage: {
    borderColor: "#6597A0",
    borderWidth: 1,
    width: 100,
    padding: 5,
    textAlign: "center",
    margin: 20
  }
});
