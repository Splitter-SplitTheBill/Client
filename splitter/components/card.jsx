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
        <Text>You and {data.participants.length - 1} other people</Text>
        <Text style={{color: '#900'}}>UNCOMPLETE</Text>
      </View>
      :
      <View style={styles.detail}>
        <Text style={styles.eventName}>{data.name}</Text>
        <Text>You and {data.participants.length - 1} other people</Text>
        <Text style={{color: '#6597a0'}}>COMPLETE</Text>
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
    padding: 10,
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
    color: 'rgb(101, 151, 160)',
    fontSize: 18
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
