import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import boyImage from '../assets/images/boy.png'
import { BackButton } from '../components'
import { useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ADDFRIEND } from '../actions/friendAction'


function AddFriend({route, navigation}) {
  const dispatch = useDispatch()

  let friend = route.params.data

  const back = () => {
    navigation.goBack()
  }
  const user = useSelector(state => {
    return state.userReducer.UserLogin;
  })

  const userId = user._id
  const token = user.token

  const addFriend = () => {
    dispatch(ADDFRIEND(userId, friend._id, token))
    navigation.navigate('FriendListScreen')
  } 

  return (
    <View style={styles.container}>
      <BackButton methods={back} />
      <View style={styles.box}>
        <View style={styles.backgroundImage}>
          {friend.image_url
            ?
            <Image source={{uri: friend.image_url}} style={styles.photo} resizeMode="cover" />
            :
            <Image source={boyImage} style={styles.image}/>
          }
        </View>
        <Text>{friend.name}</Text>
        <TouchableOpacity style={styles.add} onPress={addFriend}>
          <Text style={styles.text}>ADD FRIEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8
  },
  backgroundImage: {
    backgroundColor: '#E1E1E1',
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    elevation: 2
  },
  photo: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  image: {
    height: 100,
    width: 100,
  },
  add: {
    backgroundColor: '#6597a0',
    padding: 10,
    width: 180,
    borderRadius: 40,
    margin: 10,
    shadowRadius: 2,
    elevation: 2
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  error: {
    color: '#900'
  },
})

export default AddFriend