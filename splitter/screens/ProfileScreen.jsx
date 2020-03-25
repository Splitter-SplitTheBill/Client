import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Constant from 'expo-constants'
import { BackButton } from "../components";
import { SimpleLineIcons } from '@expo/vector-icons'
import { LogOut } from '../actions/userAction'
import axios from "axios";

export default function ProfileScreen(props) {
  const dispatch = useDispatch()
  const back = () => {
    props.navigation.goBack();
  };

  const logoutFromAccount = async () => {
    await props.navigation.navigate('Login')
    dispatch(LogOut())
  }

  const userData = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  // const [userData, setUserData] = useState(getUser);

  // const reGetData = id => {
  //   console.log("kepanggil");
  //   axios
  //     .get(`http://localhost:3000/users/${id}`, {
  //       headers: {
  //         token: getUser.token
  //       }
  //     })
  //     .then(response => {
  //       console.log(response.data, "<<<< response data");
  //       setUserData(response.data);
  //     })
  //     .catch(err => {
  //       console.log(err.response, "<<<< ini error");
  //     });
  // };

  // useEffect(() => {
  //   reGetData(getUser._id);
  // }, []);
  if(userData){
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <TouchableOpacity style={styles.logOutButton} onPress={() => logoutFromAccount()}>
              <SimpleLineIcons name="logout" size={32} color="black" />
              <Text style={{marginLeft: 5, fontSize: 15}}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.titlePage}>Profile</Text>
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.imageProfile}
                source={{
                  uri: userData.image_url
                }}
                resizeMode="cover"
              />
            </View>
            <View>
              <Text style={styles.textUsername}>{userData.username}</Text>
              <Text style={styles.textDetail}>{userData.name}</Text>
              <Text style={styles.textDetail}>{userData.email}</Text>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={styles.textTitleAcc}>Account List</Text>
              {userData.accounts.map(acc => {
                return (
                  <View
                    style={{ flexDirection: "row", justifyContent: "center", width: '90%'}}
                  >
                    <Text style={styles.AccDetailType}>{acc.instance}</Text>
                    <Text style={styles.AccDetailType}>{acc.name}</Text>
                    <Text style={styles.AccDetailNumber}>
                      {acc.accountNumber}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.buttonManage}>
            <Button
              title="Manage Profile"
              onPress={() =>
                props.navigation.navigate("EditProfile", {
                  userData: userData
                })
              }
              color="#BE3030"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
  } else {
    return (
      <></>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    marginTop: Constant.statusBarHeight
  },
  titlePage: {
    color: "#0b8457",
    fontSize: 50,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "ProximaNova-Regular"
  },
  imageProfile: {
    alignSelf: "center",
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 75
  },
  detailProfile: {
    flexDirection: "row"
  },
  textDetail: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "ProximaNova-Regular"
  },
  textUsername: {
    fontSize: 20,
    color: "#0b8457",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "ProximaNova-Regular"
  },
  textTitleAcc: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "#0b8457",
    color: "white",
    paddingBottom: 7,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: "ProximaNova-Regular",
    width: '90%'
  },
  AccDetailType: {
    borderColor: "#0B8457",
    borderWidth: 1,
    padding: 5,
    width: '30%',
    fontFamily: "ProximaNova-Regular",
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  AccDetailNumber: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    width: '40%',
    textAlign: "center",
    fontFamily: "ProximaNova-Regular",
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  buttonManage: {
    borderRadius: 6,
    marginTop: 40,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 60
  },
  logOutButton: {
    marginTop: 5,
    width: 100,
    height: 40,
    backgroundColor: '#ff7675',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
});
