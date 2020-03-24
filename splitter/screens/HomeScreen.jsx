import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import peopleMoney from '../assets/images/peopleMoney.png'
import recentEvent from '../assets/images/recentEvent.png'
import history from '../assets/images/bill.png'
import add from '../assets/images/add.png'

export default function HomeScreen ({navigation}) {
    return (
        <View style={styles.container}>
          <View style={styles.background}>
            <View>
              <Text style={styles.title}>Splitter</Text>
              <Text style={styles.desc}>Split The Bill</Text>
            </View>
            <Image source={peopleMoney} style={styles.image}/>
          </View>
          <View style={styles.box}>
            <ScrollView>
              <View style={styles.horBox}>
                <TouchableOpacity style={styles.boxes} onPress={() => navigation.navigate('Unpaid')}>
                  <Image source={recentEvent} style={styles.logo}/>
                  <Text>Recent Event</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes} onPress={() => navigation.navigate('HistoryScreen')}>
                  <Image source={history} style={styles.logo}/>
                  <Text>History</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} >
                <Image source={add} style={styles.logo}/>
                <Text>Add Bill</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <TouchableOpacity style={styles.button}>
            <Image source={add} style={styles.logo} />
            <Text>Add Bill</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HistoryScreen")}
        >
          <Text>History</Text>
        </TouchableOpacity>
        <Button
          title="Ke Login"
          onPress={() => navigation.navigate("Login")}
          color="rgb(150,9,77)"
        />
        <Button
          title="Ke Register"
          onPress={() => navigation.navigate("Register")}
          color="rgb(150,9,77)"
        />
        <Button
          title="Ke Register Add"
          onPress={() => navigation.navigate("RegistAdd")}
          color="rgb(150,9,77)"
        />
        <Button
          title="Ke Profile"
          onPress={() => navigation.navigate("Profile")}
          color="rgb(150,9,77)"
        />
        <Button
          title="Ke Unpaid"
          onPress={() => navigation.navigate("Unpaid")}
          color="rgb(150,9,77)"
        />
        <Button title="Create" onPress={() => navigation.navigate("Create")} />
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
  title: {
    color: "#6597a0",
    fontSize: 30
  },
  desc: {
    color: "#6597a0",
    fontSize: 18,
    fontStyle: "italic"
  },
  image: {
    width: height * 0.32,
    height: height * 0.257,
    marginTop: "auto",
    marginBottom: 10
  },
  box: {
    backgroundColor: "#6597a0",
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowRadius: 2,
    shadowColor: "white",
    elevation: 2,
    margin: 8,
    opacity: 0.8,
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowRadius: 2,
    shadowColor: "white",
    elevation: 2,
    margin: 8,
    opacity: 0.8,
    height: height * 0.17,
    width: width * 0.85,
    justifyContent: "center",
    alignItems: "center"
  }
});
