import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import { Badge } from "react-native-elements";
import logoImage from "../assets/images/pay.png";
import unpaidImage from "../assets/images/unpaid.gif";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BackButton } from "../components";
import { getTransaction } from "../actions/userAction";
import Constant from "expo-constants";

export default function UnpaidDetailScreen(props) {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => {
    return state.userReducer.UserLogin;
  });
  const token = userLogin.token;
  const userData = useSelector(state => {
    return state.userReducer.dataTransaction;
  });

  // console.log(userData, '<<<<<<TRANSACTIONS')

  const back = () => {
    props.navigation.goBack();
  };

  // const [userData, setUserData] = useState([]);

  // const baseUrl = "http://localhost:3000";
  const baseUrl = "http://192.168.43.186:3000";

  useEffect(() => {
    dispatch(getTransaction(userLogin._id, token));
  }, []);

  function reFetch() {
    dispatch(getTransaction(userLogin._id, token));
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.boxLogo}>
        <View style={{ position: "absolute", width: "100%", height: '100%'}}>
          <BackButton methods={back} />
        </View>
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
            {userData.length < 1 ? (
              <>
                <Text
                  style={{
                    fontSize: 25,
                    marginTop: "30%",
                    fontStyle: "italic",
                    color: "lightgrey"
                  }}
                >
                  Nothing Here
                </Text>
                <Image
                  style={{ width: 150, height: 150 }}
                  source="https://thumbs.gfycat.com/ComfortableSmartGrosbeak-max-1mb.gif"
                />
              </>
            ) : (
              <>
                {userData.map(unpaid => {
                  return (
                    <View key={unpaid._id}>
                      <TouchableOpacity
                        style={styles.boxInner}
                        onPress={() =>
                          props.navigation.navigate("DetailUnpaid", {
                            unpaid: unpaid,
                            reFetch: reFetch
                          })
                        }
                      >
                        <View style={styles.imageInnerContainer}>
                          <Image style={styles.imageInner} source={unpaidImage} />
                        </View>
                        <View style={styles.textInner}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontStyle: "italic",
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
                    </View>
                  );
                })}
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B8457",
    flex: 1,
    width: width,
    paddingTop: Constant.statusBarHeight-23
  },
  textLogo: {
    color: "white",
    fontSize: 30,
    margin: 10
  },
  imageLogo: {
    width: 100,
    height: 150,
    justifyContent: "flex-end",
    resizeMode: "contain"
  },
  boxLogo: {
    backgroundColor: "#0b8457",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constant.statusBarHeight,
    marginHorizontal: 5
  },
  boxUnpaid: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    height: height * 0.9,
    marginHorizontal: "auto",
    alignItems: "center"
  },
  boxInner: {
    borderRadius: 25,
    backgroundColor: "white",
    padding: 10,
    width: width * 0.8,
    marginTop: 20,
    // shadowRadius: 3,
    // elevation: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "lightgrey",
    alignItems: "center"
  },
  textInner: {
    width: 150,
    textAlign: "center",
    // marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "ProximaNova-Regular",
    alignItems: 'center'
  },
  imageInnerContainer: {
    width: 70,
    height: 70,
    borderRadius: 999,
    overflow: 'hidden'
  },
  imageInner: {
    width: 70,
    height: 70,
    borderRadius: 999,
    justifyContent: "center",
    // marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    overflow: 'hidden'
  },
  textUnpaid: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    fontFamily: "ProximaNova-Regular"
  },
  icon: {
    fontSize: 60,
    color: "#0B8457",
    marginLeft: 10,
    opacity: 0.5,
    fontFamily: "ProximaNova-Regular"
  }
});
