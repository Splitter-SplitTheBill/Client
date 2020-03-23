import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, StyleSheet } from 'react-native'
import Constants from 'expo-constants';

import Back from '../assets/images/back.png'

export default function BackButton() {
  return (
    <TouchableOpacity style={styles.circle}>
      <Image source={Back} style={styles.back} />
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
    marginLeft: 10
  },
  back: {
    height: 20,
    width: 20
  }
})