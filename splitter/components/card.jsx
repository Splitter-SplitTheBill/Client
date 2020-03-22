import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import receipt from '../assets/images/receipt.png'

export default function Card() {

  return (
    <View>
      <TouchableOpacity style={styles.event}>
        <View style = {styles.circle} >
          <Image source = {receipt} style={styles.icon}/>
        </View>
        <View style={styles.detail}>
          <Text style={styles.eventName}>17 Agustusan</Text>
          <Text>- Rp 500.000,00</Text>
        </View>
        <View>
          {/* <Image source = {right} style={styles.next}/> */}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  next: {
    height: 20,
  }
});
