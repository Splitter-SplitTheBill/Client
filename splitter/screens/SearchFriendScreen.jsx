import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BackButton, SearchBar } from '../components'
import searchFriend from '../assets/images/searchFriend.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'

function SearchFriend({navigation, route}) {
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

  const token = route.params.token

  const findFriend = () => {
    axios({
      method: 'GET',
      url: `http://192.168.1.5:3000/users/username/${input}`,
      headers: { token }
    })
      .then(res => {
        const friend = res.data
        navigation.navigate('AddFriendScreen', {data: friend})
      })
      .catch(err => {
        const error = err.response.data.message
        setError(error)
      })
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
