import React from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BackButton, SearchBar } from '../components'
import searchFriend from '../assets/images/searchFriend.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

function AddFriend({navigation}) {
  console.log(navigation, '< navigation')
  const back = () => {
    navigation.goBack()
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
          <SearchBar />
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
    paddingTop: 5,
    paddingLeft: 5
    // marginTop: '50%'
  },
  box: {
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  image: {
    height: 129,
    width: 120,
    margin: 10
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