import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons'

import receipt from '../assets/images/receipt.png'

export default function Card({methods}) {
  return (
    <TouchableOpacity style={styles.event} onPress={methods} >
      <View style = {styles.circle} >
        <Image source = {receipt} style={styles.icon}/>
      </View>
      <View style={styles.detail}>
        <Text style={styles.eventName}>17 Agustusan</Text>
        <Text>You and 4 other people</Text>
      </View>
      <View style={styles.nextIcon}>
        <Ionicons name="ios-arrow-forward" style={styles.next} size={30} />
      </View>
    </TouchableOpacity>
=======

import receipt from '../assets/images/receipt.png'
import right from '../assets/images/right.png'

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
          <Image source = {right} style={styles.next}/>
        </View>
      </TouchableOpacity>
    </View>
>>>>>>> create custom back button
  )
}

const styles = StyleSheet.create({
  event: {
<<<<<<< HEAD
    backgroundColor: '#e5e5e5',
=======
    backgroundColor: '#bfc6cc',
>>>>>>> create custom back button
    height: 100,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
    shadowRadius: 1,
    elevation: 2,
=======
    justifyContent: 'space-between',
    shadowRadius: 2,
    elevation: 3,
>>>>>>> create custom back button
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
<<<<<<< HEAD
    fontSize: 18
  },
  nextIcon: {
    marginLeft: 'auto'
  },
  next: {
    color: 'white'
=======
  },
  next: {
    height: 20,
>>>>>>> create custom back button
  }
});
