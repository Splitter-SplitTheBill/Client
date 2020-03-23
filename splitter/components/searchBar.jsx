import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image, StyleSheet, Text, TextInput, View } from 'react-native'

import searchIcon from '../assets/images/search.png'

export default function SearchBar() {
  return (
    <View style={styles.search}>
      <TextInput placeholder="Search friend"/>
      <Image source={searchIcon} style={styles.searchIcon}/>
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#6597a0',
    height: 40,
    width: 320,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: 'space-between',
    opacity: 0.8
  },
  searchIcon: {
    height: 20,
    width: 20
  }
})