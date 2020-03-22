import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import { Badge } from "react-native-elements";
import logoImage from "../assets/logo.jpg";
import { Ionicons } from "@expo/vector-icons";

export default function UnpaidDetailScreen(props) {
  const userData = [
    {
      transactionId: "87567842jbnjda217yt",
      User: {
        username: "Dila",
        name: "Fadhilah Rayafi",
        email: "fadhilahrayafi@gmail.com",
        image_profile:
          "https://i.pinimg.com/originals/b6/41/94/b6419495ba9b25efd222512d7e276fc6.gif",
        accounts: [
          {
            type: "Gopay",
            detail: "082116912705"
          },
          {
            type: "Dana",
            detail: "082116912705"
          }
        ]
      },
      items: [
        {
          name: "Nasi Goreng",
          qty: 1,
          price: 15000
        },
        {
          name: "Es Jeruk",
          qty: 1,
          price: 5000
        },
        {
          name: "Es Jeruk",
          qty: 1,
          price: 5000
        },
        {
          name: "Es Jeruk",
          qty: 1,
          price: 5000
        }
      ],
      status: false,
      total: 20000,
      Event: {
        name: "Makan Padang",
        participants: [1, 2, 3],
        accounts: [
          {
            name: "Dila",
            instance: "Gopay",
            accountNumber: "082345678"
          }
        ],
        created_at: "02/03/2020"
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxLogo}>
        <Image style={styles.imageLogo} source={logoImage} />
        <Text style={styles.textLogo}>Split The Bill</Text>
      </View>

      <View style={styles.boxUnpaid}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textUnpaid}>Unpaid</Text>
          <Badge
            status="error"
            containerStyle={{ top: -4, right: -4 }}
            value={userData.length}
          />
        </View>
        <ScrollView>
          {userData.map(unpaid => {
            return (
              <TouchableOpacity
                style={styles.boxInner}
                onPress={() =>
                  props.navigation.navigate("UnpaidDetail", {
                    unpaid: unpaid
                  })
                }
              >
                <Image
                  style={styles.imageInner}
                  source={unpaid.User.image_profile}
                />
                <View style={styles.textInner}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontStyle: "italic",
                      marginBottom: 5
                    }}
                  >
                    {unpaid.Event.name}
                  </Text>
                  <Text>{unpaid.Event.created_at}</Text>
                </View>
                <Ionicons
                  name="ios-arrow-forward"
                  style={styles.icon}
                  size={50}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#6597A0",
    flex: 1
  },
  textLogo: {
    color: "white",
    fontSize: 30,
    zIndex: 0
  },
  imageLogo: {
    width: 200,
    height: 200,
    justifyContent: "flex-end"
  },
  boxLogo: {
    backgroundColor: "#6597A0",
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
    marginBottom: "10%"
  },
  boxUnpaid: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    height: height * 0.7,
    marginHorizontal: "auto",
    zIndex: 5,
    // marginTop: "10%",
    alignItems: "center"
  },
  boxInner: {
    borderRadius: 25,
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    marginTop: 20,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row"
  },
  textInner: {
    textAlign: "center",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  imageInner: {
    width: 70,
    height: 70,
    borderRadius: 99,
    borderColor: "#6597A0",
    borderWidth: 2
  },
  textUnpaid: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  icon: {
    fontSize: 80,
    color: "#6597A0",
    marginLeft: 10,
    opacity: 0.5
  }
});
