import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Constants from 'expo-constants';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import payment from '../assets/images/payment.jpg'
import receipt from '../assets/images/receipt.png'
import right from '../assets/images/right.png'

function HistoryScreen() {
  return (
    <View style={styles.container} >
      {/* <Text style={styles.title}>MY WALLET</Text> */}
      <View style={styles.total}>
        <View>
          <Image source={payment} style={styles.image}/>
        </View>
        <View>
          <Text style={styles.totalBill}>Split The Bill</Text>
          <View style={styles.boxAmount}>
            <Text style={styles.amount}>Rp 1.253.000,00</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.box}>
          <Text style= {styles.titleTransaction}>RECENT TRANSACTIONS</Text>
          <ScrollView>
          <TouchableOpacity style={styles.event}>
            <View style = {styles.circle} >
              <Image source = {receipt} style={styles.icon}/>
            </View>
            <View style={styles.detail}>
              <Text style={styles.eventName}>17 Agustusan</Text>
              <Text>- Rp 500.000,00</Text>
            </View>
            <View>
              <Image source = {right} style={styles.next}/>
            </View>
          </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(101, 151, 160)',
    flex: 1
  },
  title: {
    marginTop: Constants.statusBarHeight,
    color: 'white',
    fontSize: 15,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: 10
  },
  image: {
    height: 150,
    width: 150,
  },
  total: {
    flexDirection: 'row'
  },
  totalBill: {
    marginTop: 20,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Lato-Regular'
  },
  boxAmount: {
    backgroundColor: '#bfc6cc',
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
    fontFamily: 'Lato-Regular',
    fontStyle: 'italic'
  },
  box: {
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowRadius: 15,
    elevation: 10,
  },
  titleTransaction: {
    fontFamily: 'Lato-Regular',
    fontSize: 14
  },
  event: {
    backgroundColor: '#bfc6cc',
    height: 100,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowRadius: 2,
    elevation: 3,
  },
  circle: {
    backgroundColor: 'white',
    width: 50,
    padding: 10,
    borderRadius: 90
  },
  icon: {
    width: 30,
    height: 30
  },
  detail: {
    marginLeft: 10
  },
  eventName: {
    fontWeight: 'bold',
    color: 'rgb(101, 151, 160)',
    fontFamily: 'Lato-Regular'
  },
  next: {
    height: 20,
  }
});


export default HistoryScreen