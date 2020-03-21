import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BackButton, SearchBar } from '../components'
import searchFriend from '../assets/images/searchFriend.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

function AddFriend({navigation}) {
  const back = () => {
    navigation.goBack()
  }

  const findFriend = (username) => {
    console.log(username)
  }

  return (
    <View style={styles.container}>
      <BackButton methods={back} />
      <KeyboardAvoidingView style={{ flex: 1 }}
          behavior="height"
          keyboardVerticalOffset={20}
          windowSoftInputMode="adjustResize">
        <View style={styles.search}>
          <Image source={searchFriend} style={styles.image} />
          <SearchBar search={findFriend}/>
        </View>
        <View style={styles.add}>
          <TouchableOpacity style={styles.next}>
            <Ionicons name="ios-arrow-forward" style={styles.icon} size={50} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  box: {
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '25%',
    width: '36%',
    margin: 10,
  },
  add: {
    marginTop: "auto",
    marginLeft: 'auto'
  },
  next: {
    height: 60,
    width: 60,
    backgroundColor: '#6597a0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white'
  }
})

export default AddFriend