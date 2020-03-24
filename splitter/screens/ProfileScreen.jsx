import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import logoImage from "../assets/logo.jpg";

export default function ProfileScreen(props) {
  const test = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  console.log(test, "<<<<<inininin");
  const userData = useSelector(state => {
    return state.userReducer.UserLogin;
  });
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%"
  },
  titlePage: {
    color: "#6597A0",
    fontSize: 50,
    marginBottom: 15,
    textAlign: "center"
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
    fontSize: 17
  },
  textUsername: {
    fontSize: 20,
    color: "#6597A0",
    textAlign: "center",
    fontWeight: "bold"
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
  buttonManage: {
    borderRadius: 6,
    marginTop: 40,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 60
  }
});
