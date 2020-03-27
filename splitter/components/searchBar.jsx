import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SearchBar({search}) {

  return (
    <View style={styles.search}>
      <TextInput 
        placeholder="Search friend" 
        placeholderTextColor="white" 
        style={styles.input}
        onChangeText={search}
      />
      <Ionicons name="md-search" size={28} color="white" style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#0b8457',
    height: 50,
    width: "85%",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    opacity: 0.8
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontFamily: 'ProximaNova-Regular'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})