import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Divider } from 'react-native-elements'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { BackButton, SearchBar } from '../components'
import {useSelector, useDispatch} from 'react-redux'
import { ALLFRIENDS } from '../action/index'
import axios from 'axios'

function FriendListScreen({navigation}) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(ALLFRIENDS())
  }, [dispatch])

  const friends = useSelector(state => state.friendsReducer.friends)
  
  const addFriend = () => {
    navigation.navigate('AddFriendScreen')
  }

  const confirmDelete = (id) => {
    Alert.alert(
      'Delete Friend',
      'Are you sure you want to delete this friend ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'YES', onPress: () => deleteFriend(id)}
      ],
      { cancelable: false }
    )
  }

  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
    .then(result => {
      console.log(result, '<result')
    })
    .catch(err => {
      console.log(err, '< err')
    })
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Friends</Text>
      <View style={styles.search}>
        <SearchBar />
        <Ionicons name="md-person-add" style={styles.addIcon} size={32} onPress={addFriend}/>
      </View>
      {friends.map(friend => {
        return (
          <View key={friend.id}>
            <View style={styles.friend}>
              <Text style={styles.name}>{friend.name}</Text>
              <MaterialIcons name="delete" size={25} color="#900" style={styles.deleteIcon} onPress={() => confirmDelete(friend.id)} />
            </View>
            <Divider />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    margin: 5
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10
  },
  addIcon: {
    color: '#6597a0',
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    margin: 10
  },
  deleteIcon: {
    marginLeft: 'auto',
  }
})

export default FriendListScreen