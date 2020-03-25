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
  Alert,
  Dimensions,
  TouchableOpacity,
  Clipboard
} from "react-native";

import axios from "axios";
import { BackButton } from "../components";
import Constant from "expo-constants";

export default function detail(props) {
  const dispatch = useDispatch();
  const [userPay, setUserPay] = useState({});
  const [copied, setCopied] = useState(false)
  const [copiedInstance, setCopiedInstance] = useState(false)

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
      url: `http://192.168.1.5:3000/transactions/${dataUnpaid.eventId._id}/${userlogin._id}`,
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

  const copyAccNumber = async (accNumber, instance) => {
    await Clipboard.setString(accNumber)
    setCopiedInstance(instance)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const getUser = id => {
    axios
      .get(`http://192.168.1.5:3000/users/${id}`, {
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
        // backgroundColor: "#0b8457",
        flex: 1
      }}
    >
      <View style={styles.backButtonContainer}>
          <BackButton methods={back} />
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "#0b8457",
              paddingLeft: 100,
              alignItems: 'center',
              width: Dimensions.get('screen').width,
              justifyContent: 'center',
              transform: [{
                translateX: 3
              }]
            }}
          >
            <Image
              style={styles.imageProfile}
              source={{
                uri: dataUnpaid.eventId.photo
              }}
            />
            <View
              style={styles.unpaidOverview}
            >
              <Text style={styles.from}>From {userPay.username}</Text>
              <Text style={styles.eventName}>{dataUnpaid.eventId.name}</Text>
              <Text style={{ fontSize: 18 }}>
                {new Date(dataUnpaid.createdAt).toDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.boxDetail}>
            <Text style={styles.boxRed}>Details</Text>
            <ScrollView nestedScrollEnabled={true}>
              <View
                style={{
                  padding: 10,
                  alignItems: "center",
                  margin: 5,
                  marginBottom: 10,
                  // borderRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  overflow: 'hidden',
                  height: 470,
                  backgroundColor: 'white'
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
                        <TouchableOpacity
                          onLongPress={() => copyAccNumber(payment.accountNumber, payment.instance)}
                          style={{
                            flexDirection: "row",
                            borderColor: "black",
                            marginVertical: 5,
                            // paddingVertical: 5,
                            height: 70,
                            width: 280
                          }}
                        >
                          <View style={styles.textPaymentInstanceContainer}>
                            <Text style={styles.textPaymentInstance}>
                              {payment.instance}
                            </Text>
                          </View>
                          <View style={styles.methodDetails}>
                          <Text style={styles.textPayment}>{payment.name}</Text>
                          <Text style={styles.textPayment}>
                            {payment.accountNumber}
                          </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.buttonPay}>
            <Button
              title="Pay"
              color="#0B8457"
              onPress={() => pay(dataUnpaid.eventId._id, userlogin._id)}
            />
          </View>
        </View>
        {
          copied
          && <View style={styles.copiedToClipBoardAlert}>
                <Text style={styles.copiedToClipBoardText}>{copiedInstance} number Copied to Clipboard!</Text>
            </View>
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight+50,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "white",
    height: Dimensions.get('screen').height
  },
  imageProfile: {
    width: 105,
    height: 105,
    borderRadius: 20,
    justifyContent: "center",
    borderWidth: 3,
    borderColor: 'white',
    transform: [{
      translateX: -13
    }]
  },
  from: {
    fontSize: 20,
    marginBottom: 5,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white"
  },
  eventName: { fontSize: 18, fontStyle: "italic" },
  boxDetail: {
    marginTop: 10,
    padding: 5,
    alignItems: "center",
    width: "90%",
    backgroundColor: '#0b8457',
    borderRadius: 20,
    height: 550
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
    width: '45%',
    textAlign: "center",
    textAlignVertical: 'center',
    padding: 2,
    fontSize: 15,
    // fontWeight: 'bold',
    color: 'white'
  },
  textPaymentInstanceContainer: {
    width: '25%',
    height: '100%',
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textPaymentInstance: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderRadius: 999,
    borderColor: '#00b894',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold'
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
    color: "black",
    width: "90%",
    textAlign: "center",
    marginTop: 10,
    fontSize: 30,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10.
    // borderRadius: 20
  },
  buttonPay: {
    borderRadius: 6,
    marginTop: 20,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
    width: 150,
    color: "#BE3030"
  },
  unpaidOverview: {
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: '#0b8457',
    borderRadius: 20,
    width: 305,
    transform: [{
      translateX: -90
    }],
    zIndex: -1,
    height: 130,
    // paddingLeft: 20,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  // backButtonContainer: {
  //   width: Dimensions.get('screen').width,
  //   alignItems: 'flex-start',
  //   position: 'absolute',
  //   marginTop: Constant.statusBarHeight,
  // }
  backButtonContainer: {
    width: Dimensions.get('screen').width-20,
    height: 120,
    alignItems: 'flex-start',
    position: 'absolute',
    // zIndex: 10,
    marginTop: Constant.statusBarHeight,
    backgroundColor: '#0b8457',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingLeft: 20,
    transform: [{
      translateX: 10
    }]
  },
  methodDetails: {
    width: '87%',
    height: '100%',
    flexDirection: 'row',
    // borderWidth: 1,
    zIndex: -1,
    backgroundColor: '#00b894',
    transform: [{
      translateX: -35
    }],
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  copiedToClipBoardAlert: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: 'rgba(0, 0, 0, 0.49)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  copiedToClipBoardText: {
    padding: 10,
    backgroundColor: '#636e72',
    color: 'white'
  }
});
