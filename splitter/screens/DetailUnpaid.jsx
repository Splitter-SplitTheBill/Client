import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  ImageBackground
} from "react-native";

import axios from "axios";

export default function detail(props) {
  const [userPay, setUserPay] = useState({});
  const [pars, setPars] = useState([]);

  const dataUnpaid = props.route.params.unpaid;
  console.log(dataUnpaid, "INI DATAAA");

  const userlogin = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  const token = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  console.log(userlogin, "ini userlogin");

  console.log(userPay, "<<<user pay");

  useEffect(() => {
    getUser(dataUnpaid.eventId.createdUserId);
  }, []);

  function pay() {
    props.navigation.navigate("Unpaid");
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
  // let partici = dataUnpaid;
  // const getUserPar = id => {
  //   let namePar = null;
  //   axios
  //     .get(`http://localhost:3000/users/${id}`, {
  //       headers: {
  //         token: token
  //       }
  //     })
  //     .then(response => {
  //       console.log(response.data.username, "<<<< response data");
  //       setPars(response.data.username);
  //       console.log(pars, "pars");
  //       // return response.data.username;
  //     })
  //     .catch(err => {
  //       console.log(err.response, "<<<< ini error");
  //     });
  //   console.log(namePar, "nama");
  //   // return namePar;
  // };

  const formatMoney = money => {
    let str = String(money);
    return "Rp. " + str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#0b8457",
        flex: 1
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#0b8457"
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
            <ImageBackground
              source={{
                uri:
                  "https://i.pinimg.com/originals/c1/a3/4d/c1a34df855baf464e71bf0bfc1da40fb.png"
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <View style={styles.boxDetail}>
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
                {/* <View style={{ marginBottom: 15 }}>
                  <Text style={styles.textTitle}>Participants</Text>
                  {dataUnpaid.eventId.participants.map((user, index) => {
                    return (
                      <View key={index}>
                        <Text style={styles.textData}>
                          {getUserPar(user.participantId)}
                        </Text>
                      </View>
                    );
                  })}
                </View> */}
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
                        <View style={{ flexDirection: "row" }}>
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
    marginTop: "20%",
    backgroundColor: "#0b8457"
  },
  imageProfile: {
    width: 100,
    height: 100,
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
    padding: 10
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
    backgroundColor: "#BE3030",
    color: "white",
    width: "30%",
    padding: 8,
    textAlign: "center",
    borderColor: "black",
    borderWidth: 3,
    marginTop: 20,
    marginBottom: 5,
    shadowRadius: 3,
    elevation: 2
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
