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
import { BackButton } from "../components";

export default function UnpaidDetailScreen(props) {
  const userLogin = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  const back = () => {
    props.navigation.goBack();
  };

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
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ marginLeft: 5 }}>
          <BackButton methods={back} />
        </View>
        <View style={styles.boxLogo}>
          <Image
            style={styles.imageLogo}
            source="https://files.slack.com/files-pri/T1UKZ9NBV-F010QJJLJHW/page_4__2_.png"
          />
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
                        source="https://designproficient.com/blog/wp-content/uploads/2018/07/tumblr_p8oxbeKDdZ1x47mxqo1_1280.gif"
                      />
                      <View style={styles.textInner}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontStyle: "italic",
                            marginBottom: 5,
                            fontFamily: "ProximaNova-Regular"
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
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b8457",
    flex: 1
  },
  textLogo: {
    color: "white",
    fontSize: 30,
    zIndex: 0,
    fontFamily: "Hotham"
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
    fontFamily: "ProximaNova-Regular"
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
    fontFamily: "ProximaNova-Regular"
  },
  icon: {
    fontSize: 80,
    color: "#0b8457",
    marginLeft: 10,
    opacity: 0.5,
    fontFamily: "ProximaNova-Regular"
  }
});
