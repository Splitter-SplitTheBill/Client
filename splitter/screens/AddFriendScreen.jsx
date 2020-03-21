import React from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import boyImage from '../assets/images/boy.png'
import { BackButton } from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import axios from 'axios'

function AddFriend({route, navigation}) {
  let friend = route.params.data

  console.log(friend, '< friend')
  const back = () => {
    navigation.goBack()
  }

  const addFriend = () => {
    axios({
      method: 'PUT',
      url: 'http://localhost:3000/users/2',
      data: {
        name: 'berubah',
        username: 'berubah',
        friends: [friend]
      }
    })
    .then(result => {
      console.log(result.data, '< result')
      navigation.navigate('FriendListScreen')
    })
    .catch(err => {
      console.log(err, '< error')
    })
  }

  return (
    <View style={styles.container}>
      <BackButton methods={back} />
      <View style={styles.box}>
        <View style={styles.backgroundImage}>
          {friend.photo
            ?
            <Image source={{uri: friend.photo}} style={styles.photo} resizeMode="cover" />
            :
            <Image source={boyImage} style={styles.image}/>
          }
        </View>
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
  }
})

export default AddFriend