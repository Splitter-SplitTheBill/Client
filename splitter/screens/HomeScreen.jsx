import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button
} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import peopleMoney from "../assets/images/peopleMoney.png";
import recentEvent from "../assets/images/recentEvent.png";
import history from "../assets/images/bill.png";
import add from "../assets/images/add.png";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.headline}>
          <Text style={styles.title}>Splitter</Text>
          <Text style={styles.desc}>Split The Bill</Text>
        </View>
        <Image source={peopleMoney} style={styles.image} />
      </View>
      <View style={styles.box}>
        <ScrollView>
          <View style={styles.horBox}>
            <TouchableOpacity
              style={styles.boxes}
              onPress={() => navigation.navigate("Unpaid")}
            >
              <Image source={recentEvent} style={styles.logo} />
              <Text style={styles.textBox}>Recent Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxes}
              onPress={() => navigation.navigate("HistoryScreen")}
            >
              <Image source={history} style={styles.logo} />
              <Text style={styles.textBox}>History</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Create")}
          >
            <Image source={add} style={styles.logo} />
            <Text style={styles.textBox}>Add Bill</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  background: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10
  },
  headline: {
    marginLeft: 10,
  },
  title: {
    color: "#0b8457",
    fontSize: 40,
    fontFamily: 'Hotham'
  },
  desc: {
    color: "#0b8457",
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular'
  },
  image: {
    width: height * 0.32,
    height: height * 0.257,
    marginTop: "auto",
    marginBottom: 10
  },
  textBox: {
    fontFamily: 'ProximaNova-Regular'
  },
  box: {
    backgroundColor: "#0b8457",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 4,
    elevation: 2,
    height: height * 0.55
  },
  horBox: {
    flexDirection: "row"
  },
  boxes: {
    backgroundColor: "#eeeeee",
    padding: 10,
    borderRadius: 10,
    shadowRadius: 4,
    shadowColor: "gray",
    elevation: 2,
    margin: 8,
    height: height * 0.3,
    width: width * 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 60,
    height: 60,
    margin: 5
  },
  button: {
    backgroundColor: "#eeeeee",
    padding: 10,
    borderRadius: 10,
    shadowRadius: 4,
    shadowColor: "gray",
    elevation: 2,
    margin: 8,
    height: height * 0.17,
    width: width * 0.85,
    justifyContent: "center",
    alignItems: "center"
  }
});
