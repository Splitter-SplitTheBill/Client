import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  CheckBox
} from "react-native";

import axios from "axios";

export default function detail(props) {
  const [userPay, setUserPay] = useState({});

  const dataUnpaid = props.route.params.unpaid;
  console.log(dataUnpaid, "INI DATAAA");

  const userlogin = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  console.log(userlogin, "ini userlogin");

  console.log(userPay, "<<<user pay");

  useEffect(() => {
    getUser("5e78a782b70b3d2944d57174");
  }, []);

  function pay(eventId, userId) {
    axios
      .patch(`http://localhost:3000/transactions/${eventId}/${userId}`)
      .then(response => {
        console.log(response.data, "<<<< berhasil bayar");
        props.navigation.navigate("Home");
      })
      .catch(err => {
        console.log(err.response);
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#6597A0",
        flex: 1
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#6597A0"
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
          <View>
            <Text style={styles.boxRed}>Detail</Text>
            <View style={styles.boxDetail}>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text style={styles.titleDetail}>Item</Text>
                {/* <Text style={styles.titleDetail}>Qty</Text> */}
                <Text style={styles.titleDetail}>Price</Text>
              </View>
              <View>
                {dataUnpaid.items.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <Text style={styles.textDetail}>{item.name}</Text>
                      {/* <Text style={styles.textDetail}>{item.qty}</Text> */}
                      <Text style={styles.textDetail}>
                        {formatMoney(item.price)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.boxRed}>Participants</Text>
            <View style={styles.boxParticipant}>
              {dataUnpaid.eventId.participants.map(user => {
                return <Text>{user.username}</Text>;
              })}
            </View>
          </View>
          <View>
            <Text style={styles.boxRed}>Total</Text>
            <View style={styles.boxTotal}>
              <Text>{formatMoney(dataUnpaid.total)}</Text>
            </View>
          </View>
          <View style={styles.buttonPay}>
            <Button
              title="PAY"
              color="black"
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
    marginTop: "20%",
    backgroundColor: "#6597A0"
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 99,
    justifyContent: "center",
    marginBottom: 10
    // borderColor: "black",
    // borderWidth: 4
  },
  from: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    marginTop: 10
  },
  eventName: { fontSize: 18, fontStyle: "italic" },
  boxDetail: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "white"
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
    padding: 5
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
  boxRed: {
    backgroundColor: "#BE3030",
    color: "white",
    borderRadius: 10,
    width: "30%",
    padding: 8,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 3,
    marginTop: 20,
    marginBottom: 5
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
