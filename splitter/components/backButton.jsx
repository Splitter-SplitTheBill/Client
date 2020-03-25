import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants';

export default function BackButton({methods}) {
  // console.log(props, '< props')
  return (
    <TouchableOpacity style={styles.circle} onPress={methods}>
      <Ionicons name="ios-arrow-back" style={styles.back} size={30} />
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  back: {
    color: '#0b8457',
   
  }
})