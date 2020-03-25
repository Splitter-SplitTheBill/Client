import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransaction } from "../actions/userAction";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";

import axios from "axios";
import { BackButton } from "../components";
import Constant from "expo-constants";

export default function detail(props) {
  const dispatch = useDispatch();
  const [userPay, setUserPay] = useState({});

  const dataUnpaid = props.route.params.unpaid;
  console.log(dataUnpaid, "INI DATAAA");

  const userlogin = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  console.log(userlogin, "ini userlogin");

  console.log(userPay, "<<<user pay");

  useEffect(() => {
    getUser(dataUnpaid.eventId.createdUserId);
  }, []);

  function pay() {
    console.log(dataUnpaid.eventId._id, "event id");
    console.log(userlogin._id, "user id");
    axios({
      method: "patch",
      url: `http://localhost:3000/transactions/${dataUnpaid.eventId._id}/${userlogin._id}`,
      headers: {
        token: userlogin.token
      },
      data: {
        status: "settling"
      }
    })
      .then(response => {
        console.log(response.data, "<<<< response data");
        setUserPay(response.data);
        dispatch(getTransaction(userlogin._id, userlogin.token));
        props.route.params.reFetch();
        props.navigation.navigate("Unpaid");
        Alert.alert(
          "Success asigning to this transaction!",
          "Plese wait for your confirmation payment",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      })
      .catch(err => {
        console.log(err, "<<<< ini error");
      });
  }

  const getUser = id => {
    axios
      .get(`http://localhost:3000/users/${id}`, {
        headers: {
          token: userlogin.token
        }
      })
      .then(response => {
        console.log(response.data, "<<<< response data");
        setUserPay(response.data);
      })
      .catch(err => {
        console.log(err.response, "<<<< ini error");
      });
  };

  const formatMoney = money => {
    let str = String(money);
    return "Rp. " + str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const back = () => {
    props.navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
<<<<<<< HEAD
        backgroundColor: "#0b8457",
        flex: 1
=======
        flex: 1,
        backgroundColor: "white"
>>>>>>> fixing display
      }}
    >
      <View style={{ marginLeft: 5 }}>
        <BackButton methods={back} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
<<<<<<< HEAD
              backgroundColor: "#0b8457"
=======
              marginBottom: 20
>>>>>>> fixing display
            }}
          >
            <Image
              style={styles.imageProfile}
              source={{
                uri: userPay.image_url
              }}
            />
            <View
              style={{
                alignItems: "center",
                marginLeft: 20
              }}
            >
              <Text style={styles.from}>From {userPay.username}</Text>
              <Text style={styles.eventName}>{dataUnpaid.eventId.name}</Text>
              <Text style={{ fontSize: 18 }}>
                {dataUnpaid.createdAt.slice(0, 10)}
              </Text>
            </View>
          </View>
          <View style={styles.boxDetail}>
            <Text style={styles.boxRed}>Detail</Text>
            <ImageBackground
              source={{
                uri:
                  "https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              }}
              style={{
                padding: 10,
                alignItems: "center",
                margin: 10,
                borderRadius: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text style={styles.titleDetail}>Item</Text>
                <Text style={styles.titleDetail}>Price</Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                {dataUnpaid.items.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Text style={styles.textDetail}>{item.name}</Text>
                      <Text style={styles.textDetail}>
                        {formatMoney(item.price)}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.textTitle}>Total</Text>
                <Text style={styles.textData}>
                  {formatMoney(dataUnpaid.total)}
                </Text>
              </View>
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.textTitle}>Payment Methods</Text>
                <View>
                  {dataUnpaid.paymentSelection.map(payment => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          borderColor: "black",
                          borderWidth: 1,
                          marginVertical: 10,
                          paddingVertical: 5
                        }}
                      >
                        <Text style={styles.textPayment}>
                          {payment.instance}
                        </Text>
                        <Text style={styles.textPayment}>{payment.name}</Text>
                        <Text style={styles.textPayment}>
                          {payment.accountNumber}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.buttonPay}>
            <Button
              title="Pay"
              color="#0B8457"
              onPress={() => pay(dataUnpaid.eventId._id, userlogin._id)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    marginTop: "20%",
    backgroundColor: "#0b8457"
=======
    marginTop: Constant.statusBarHeight,
    backgroundColor: "white"
>>>>>>> fixing display
  },
  imageProfile: {
    width: 130,
    height: 130,
    borderRadius: 99,
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2
  },
  from: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#BE3030",
    marginTop: 10
  },
  eventName: { fontSize: 18, fontStyle: "italic" },
  boxDetail: {
    padding: 10,
    alignItems: "center",
    width: "90%"
  },
  titleDetail: {
    fontSize: 18,
    fontWeight: "bold",
    width: 150,
    padding: 5,
    textAlign: "center"
  },
  icon: {
    fontSize: 10,
    color: "white",
    marginRight: 5
  },
  textDetail: {
    width: 150,
    textAlign: "center",
    padding: 5,
    fontSize: 15
  },
  textData: {
    textAlign: "center",
    fontSize: 15
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  textPayment: {
    width: 100,
    textAlign: "center",
    padding: 2
  },
  boxTotal: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 130,
    paddingVertical: 10,
    backgroundColor: "white",
    width: "100%"
  },
  boxParticipant: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 140,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center"
  },
  boxPayment: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center"
  },
  boxRed: {
    color: "#BE3030",
    width: "30%",
    textAlign: "center",
    marginTop: 10,
    fontSize: 30
  },
  buttonPay: {
    borderRadius: 6,
    marginTop: 20,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
    width: 150,
    color: "#BE3030"
  }
});
