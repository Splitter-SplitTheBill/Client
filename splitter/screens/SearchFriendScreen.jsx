import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BackButton, SearchBar } from '../components'
import searchFriend from '../assets/images/searchFriend.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

function SearchFriend({navigation}) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const back = () => {
    navigation.goBack()
  }

  const searchInput = (username) => {
    console.log(username)
    setInput(username)
    setError('')
  }

  const findFriend = () => {
    // axios
    console.log(input, '< input')
    // setError('Username not found!')
    let dummy = {
      id: 1,
      name : "Ajeng 1",
      username: "ajengrf1",
      photo: "https://img.okeinfo.net/content/2019/04/13/196/2043095/sifat-tersembunyi-orang-yang-lahir-di-bulan-april-ada-sifatmu-DAxp6rDzP8.jpg"
    }
    navigation.navigate('AddFriendScreen', {data: dummy})
  }

  return (
    <View style={styles.container}>
      <BackButton methods={back} />
      <KeyboardAvoidingView style={{ flex: 1 }}
          behavior="height"
          keyboardVerticalOffset={10}
          windowSoftInputMode="adjustResize">
        <View style={styles.search}>
          <Image source={searchFriend} style={styles.image} />
          <SearchBar search={searchInput}/>
          {error ?
            <Text style={styles.error}>{error}</Text>
            : null
          }
        </View>
        <View style={styles.add}>
          <TouchableOpacity style={styles.next} onPress={findFriend}>
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
    height: 150,
    width: 150,
    margin: 10,
  },
  error: {
    color: '#900'
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

export default SearchFriend