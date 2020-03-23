import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SearchBar() {
  return (
    <View style={styles.search}>
      <TextInput placeholder="Search friend" placeholderTextColor="white"/>
      <Ionicons name="md-search" size={22} color="white" />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#6597a0',
    height: 40,
    width: "85%",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    opacity: 0.8
  }
})