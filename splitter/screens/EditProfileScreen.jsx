import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableHighlight
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { useSelector } from "react-redux";

import axios from "axios";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default function EditProfileScreen(props) {
  // const userData = props.route.params.userData;
  const userData = useSelector(state => {
    return state.userReducer.UserLogin;
  });
  console.log(userData, "<<<<<<<userdata");

  const [image_url, setImange] = useState(userData.image_url);
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

  const [modalVisible, setModal] = useState(false);

  function setModalVisible(visible) {
    console.log(visible);
    setModal(visible);
  }

  function editProfile() {
    const userId = userData._id;
    console.log(userData.token, "<<<<< token nih");
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}`,
      headers: {
        token: userData.token
      },
      data: {
        name,
        accounts,
        friendList: userData.friendList,
        image_url
      }
    })
      .then(response => {
        console.log(response.data);
        console.log("berhasul bung");
        props.navigation.navigate("Profile");
        // let tempAcc = accounts.filter(
        //   acc => acc._id !== response.data.successRemove._id
        // );
        // setAccount(tempAcc);
        console.log(accounts);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  function onChangeTextPress(value) {
    const userId = userData._id;
    console.log(userData.token, "<<<<< token nih");
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}/accounts`,
      headers: {
        token: userData.token
      },
      data: {
        name: value,
        instance: value,
        accountNumber: "12345"
      }
    })
      .then(response => {
        console.log(response.data);
        console.log("berhasul bung");
        // let tempAcc = accounts.filter(
        //   acc => acc._id !== response.data.successRemove._id
        // );
        // setAccount(tempAcc);
        console.log(accounts);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  function deleteAcc(accId) {
    const userId = userData._id;
    console.log(userData.token, "<<<<< token nih");
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}/accounts/${accId}`,
      headers: {
        token: userData.token
      }
    })
      .then(response => {
        console.log(response.data);
        console.log("berhasul bung");
        let tempAcc = accounts.filter(
          acc => acc._id !== response.data.successRemove._id
        );
        setAccount(tempAcc);
        console.log(accounts);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImange(result.uri);
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  // useEffect(() => {
  //   useSelector(state => {
  //     return state.userReducer.UserLogin;
  //   });
  // }, [accounts]);

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
                uri: image_url
              }}
            />
            <TouchableOpacity
              style={styles.textChangeImage}
              onPress={() => _pickImage()}
            >
              <Text
                style={{ color: "black", opacity: 0.5, textAlign: "center", fontFamily: 'ProximaNova-Regular' }}
              >
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
          <View>
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
                  <Text style={styles.AccDetailType}>{acc.name}</Text>
                  <View style={styles.AccDetailNumber}>
                    <Text>{acc.accountNumber}</Text>
                    <TouchableOpacity onPress={() => deleteAcc(acc._id)}>
                      <Image
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                        source={{
                          uri:
                            "https://pngimage.net/wp-content/uploads/2018/05/delete-icon-png-red-2.png"
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.textInput}>Add Account</Text>
            <View style={{ marginTop: 10 }}>
              <Dropdown
                dropdownOffset={{ top: 5 }}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: "lightgrey",
                  borderRadius: 50,
                  width: 250,
                  paddingLeft: 3,
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
            <View style={styles.buttonManage}>
              <Button
                title="Submit"
                onPress={() => editProfile()}
                color="#BE3030"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%"
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
    marginBottom: 10,
    width: 150
  },
  inputLogin: {
    borderBottomColor: "#0b8457",
    borderBottomWidth: 2,
    marginBottom: 30,
    fontFamily: 'ProximaNova-Regular'
  },
  textInput: {
    color: "#0b8457",
    marginBottom: 5,
    marginTop: 20,
    marginRight: "auto",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: 'ProximaNova-Regular'
  },
  textTitleAcc: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "#0b8457",
    color: "white",
    paddingBottom: 7,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: 'ProximaNova-Regular'
  },
  AccDetailType: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    width: 80,
    fontFamily: 'ProximaNova-Regular',
    width: '40%'
  },
  AccDetailNumber: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    width: 150,
    textAlign: "center",
    flexDirection: "row",
    fontFamily: 'ProximaNova-Regular',
    width: '50%'
  },
  textChangeImage: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    margin: 20
  }
});
