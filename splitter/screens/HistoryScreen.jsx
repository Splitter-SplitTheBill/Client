import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Constants from 'expo-constants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import payment from '../assets/images/payment.jpg'

import { CustomCard, BackButton } from '../components'

function HistoryScreen() {
  return (
    <View style={styles.container} >
      <View style={styles.head}>
        <BackButton />
        <View>
          <Image source={payment} style={styles.image}/>
        </View>
        <View style={styles.title}>
          <Text style={styles.totalBill}>Split The Bill</Text>
          <View style={styles.boxAmount}>
            <Text style={styles.amount}>Rp 1.253.000,00</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <Text style= {styles.titleTransaction}>RECENT TRANSACTIONS</Text>
        <ScrollView>
          <CustomCard />
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(101, 151, 160)',
    flex: 1,
  },
  head: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
  },
  image: {
    marginTop: Constants.statusBarHeight,
    height: 150,
    width: 150,
  },
  totalBill: {
    marginTop: 20,
    color: 'white',
    fontSize: 30,
  },
  boxAmount: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    shadowRadius: 2,
    elevation: 2
  },
  amount: {
    color: 'rgb(101, 151, 160)',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  box: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowRadius: 15,
    elevation: 10,
  },
  titleTransaction: {
    fontSize: 14
  },
  next: {
    height: 20,
  }
});


export default HistoryScreen