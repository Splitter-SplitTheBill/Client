import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import { BackButton } from "../components";
import axios from "axios";

export default function ProfileScreen(props) {
  const back = () => {
    props.navigation.goBack();
  };

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
  return (
    <>
      <View style={{ marginLeft: 5 }}>
        <BackButton methods={back} />
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View>
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
            <View>
              <Text style={styles.textTitleAcc}>Account List</Text>
              {userData.accounts.map(acc => {
                return (
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%"
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
    fontFamily: "ProximaNova-Regular"
  },
  AccDetailType: {
    borderColor: "#0B8457",
    borderWidth: 1,
    padding: 5,
    width: 80,
    fontFamily: "ProximaNova-Regular"
  },
  AccDetailNumber: {
    borderColor: "#0b8457",
    borderWidth: 1,
    padding: 5,
    width: 120,
    textAlign: "center",
    fontFamily: "ProximaNova-Regular"
  },
  buttonManage: {
    borderRadius: 6,
    marginTop: 40,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 60
  }
});
