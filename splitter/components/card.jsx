import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'

import receipt from '../assets/images/receipt.png'

export default function Card({methods, data}) {
  return (
    <TouchableOpacity style={styles.event} onPress={() => methods(data)} >
      <View style = {styles.circle} >
        <Image source = {receipt} style={styles.icon}/>
      </View>
      {data.status 
      ?
      <View style={styles.detail}>
        <Text style={styles.eventName}>{data.name}</Text>
        <Text style={{ fontFamily: 'ProximaNova-Regular'}}>You and {data.participants.length - 1} other people</Text>
        <Text style={{color: '#900', fontFamily: 'ProximaNova-Regular'}}>UNCOMPLETE</Text>
      </View>
      :
      <View style={styles.detail}>
        <Text style={styles.eventName}>{data.name}</Text>
        <Text>You and {data.participants.length - 1} other people</Text>
        <Text style={{color: '#0b8457', fontFamily: 'ProximaNova-Regular'}}>COMPLETE</Text>
      </View>
      }
      <View style={styles.nextIcon}>
        <Ionicons name="ios-arrow-forward" style={styles.next} size={30} />
      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  event: {
    backgroundColor: '#e5e5e5',
    height: 100,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowRadius: 1,
    elevation: 2,
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
    color: '#0b8457',
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular'
  },
  nextIcon: {
    marginLeft: 'auto'
  },
  nextIcon: {
    marginLeft: 'auto'
  },
  next: {
    color: 'white'
  },
});
