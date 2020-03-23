import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
<<<<<<< HEAD
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';

export default function BackButton({methods}) {
  // console.log(props, '< props')
  return (
    <TouchableOpacity style={styles.circle} onPress={methods}>
      <Ionicons name="ios-arrow-back" style={styles.back} size={30} />
=======
import { Image, StyleSheet } from 'react-native'
import Constants from 'expo-constants';

import Back from '../assets/images/back.png'

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.circle}>
      <Image source={Back} style={styles.back} />
>>>>>>> create custom back button
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#E1E1E1',
    height: 40,
    width: 40,
    padding: 10,
    borderRadius: 10,
    marginTop: Constants.statusBarHeight,
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center'
  },
  back: {
    color: '#6597a0',
   
=======
    marginLeft: 10
  },
  back: {
    height: 20,
    width: 20
>>>>>>> create custom back button
  }
})