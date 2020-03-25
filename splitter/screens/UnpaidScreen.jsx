import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";

export default function UnpaidDetailScreen(props) {
  const userLogin = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  const [userData, setUserData] = useState([]);

  const baseUrl = "http://localhost:3000";

  const test = () => {
    console.log(userLogin._id, "<<<<<<user loginn");
    axios({
      method: "GET",
      url: baseUrl + "/transactions/user/" + userLogin._id,
      headers: {
        token: userLogin.token
      }
    })
      .then(response => {
        console.log(response.data, "<<<<< ini transaction ");
        setUserData(response.data);
        // props.navigation.navigate("Login");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  // const userData = [
  //   {
  //     _id: "5e78b57527668fabf8f4862a",
  //     userId: {
  //       _id: "5e78b2baab98c8a9c5cb94d7",
  //       name: "Okka2",
  //       email: "okka2@mail.com",
  //       username: "okka12",
  //       accounts: [],
  //       friendList: [],
  //       __v: 0
  //     },
  //     items: [
  //       {
  //         _id: "5e78b57527668fabf8f4862b",
  //         name: " TU Rice Org nik",
  //         price: 454
  //       },
  //       {
  //         _id: "5e78b57527668fabf8f4862c",
  //         name: " TU Rice Org nik",
  //         price: 454
  //       }
  //     ],
  //     total: 908,
  //     status: false,
  //     paymentSelection: [
  //       {
  //         _id: "5e78b57527668fabf8f48622",
  //         name: "Okka Linardi",
  //         instance: "Ovo"
  //       },
  //       {
  //         _id: "5e78b57527668fabf8f48623",
  //         name: "Okka Linardi",
  //         instance: "BCA"
  //       }
  //     ],
  //     eventId: {
  //       _id: "5e78b57527668fabf8f48621",
  //       name: "Test eventsssss",
  //       photo:
  //         "https://jsprojectdev37.s3.ap-southeast-1.amazonaws.com/1584969059895-test.jpg",
  //       status: "false",
  //       participants: [
  //         {
  //           _id: "5e78b57527668fabf8f4862f",
  //           participantId: "5e78b2a9ab98c8a9c5cb94d6",
  //           transactionId: "5e78b57527668fabf8f48624",
  //           username: "ajenggila"
  //         },
  //         {
  //           _id: "5e78b57527668fabf8f48630",
  //           participantId: "5e78b2baab98c8a9c5cb94d7",
  //           transactionId: "5e78b57527668fabf8f4862a",
  //           username: "ajenggila"
  //         }
  //       ],
  //       accounts: [
  //         {
  //           _id: "5e78b57527668fabf8f48622",
  //           name: "Okka Linardi",
  //           instance: "Ovo"
  //         },
  //         {
  //           _id: "5e78b57527668fabf8f48623",
  //           name: "Okka Linardi",
  //           instance: "BCA"
  //         }
  //       ],
  //       createdUserId: "5e78b2e7ab98c8a9c5cb94d8",
  //       __v: 0
  //     },
  //     createdAt: "2020-03-23T13:11:17.441Z",
  //     updatedAt: "2020-03-23T13:11:17.441Z",
  //     __v: 0
  //   }
  // ];

  // function getUserPay(id) {
  //   axios({
  //     method: "GET",
  //     url: baseUrl + "/users/" + id
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       setUserPay(response.data);
  //       return userPay;
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //     });
  // }

  useEffect(() => {
    test();
  }, []);

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
                  props.navigation.navigate("DetailUnpaid", {
                    unpaid: unpaid
                  })
                }
              >
                <Image
                  style={styles.imageInner}
                  source="https://cdn.imgbin.com/17/8/4/imgbin-banknote-united-states-one-dollar-bill-logo-united-states-dollar-banknote-bGqSrTb5vTadEgMcxEJwcQNcK.jpg"
                />
                <View style={styles.textInner}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontStyle: "italic",
                      fontFamily: 'ProximaNova-Regular',
                      marginBottom: 5
                    }}
                  >
                    {unpaid.eventId.name}
                  </Text>
                  <Text>{unpaid.createdAt.slice(0, 10)}</Text>
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
    backgroundColor: "#0b8457",
    flex: 1
  },
  textLogo: {
    color: "white",
    fontSize: 30,
    zIndex: 0,
    fontFamily: 'Hotham'
  },
  imageLogo: {
    width: 200,
    height: 200,
    justifyContent: "flex-end"
  },
  boxLogo: {
    backgroundColor: "#0b8457",
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
    marginTop: "auto",
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
    fontSize: 20,
    fontFamily: 'ProximaNova-Regular'
  },
  imageInner: {
    width: 70,
    height: 70,
    borderRadius: 99,
    borderColor: "#0b8457",
    borderWidth: 2
  },
  textUnpaid: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: 'ProximaNova-Regular'
  },
  icon: {
    fontSize: 80,
    color: "#0b8457",
    marginLeft: 10,
    opacity: 0.5,
    fontFamily: 'ProximaNova-Regular'
  }
});
