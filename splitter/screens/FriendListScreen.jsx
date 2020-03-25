import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Divider } from 'react-native-elements'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { SearchBar } from '../components'
import {useSelector, useDispatch} from 'react-redux'
import { ALLFRIENDS, DELETEFRIEND } from '../actions/friendAction'

function FriendListScreen({navigation}) {
  const [searchFriends, setFriend] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.userReducer.UserLogin;
  })

  const userId = user._id
  const token = user.token

  useEffect(() => {
    dispatch(ALLFRIENDS(userId, token))
  }, [])

  const friends = useSelector(state => state.friendsReducer.friends)

  const addFriend = () => {
    navigation.navigate('SearchFriendScreen', {token})
  }

  // const confirmDelete = (id) => {
  //   Alert.alert(
  //     'Delete Friend',
  //     'Are you sure you want to delete this friend ?',
  //     [
  //       {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
  //       {text: 'YES', onPress: () => deleteFriend(id)}
  //     ],
  //     { cancelable: false }
  //   )
  // }

  const searchInput = (input) => {
    const filtered = friends.filter(friend => friend.userId.name.toLowerCase().includes(input.toLowerCase()))
    setFriend(filtered)
  }

  const deleteFriend = (friendId) => {
    dispatch(DELETEFRIEND(userId, friendId, token))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <View style={styles.search}>
        <SearchBar search={searchInput}/>
        <Ionicons name="md-person-add" style={styles.addIcon} size={32} onPress={addFriend}/>
      </View>
      {searchFriends
      ?
      searchFriends.map(friend => {
        return (
          <View key={friend.userId._id}>
            <View style={styles.friend}>
              <Text style={styles.name}>{friend.userId.name}</Text>
              <MaterialIcons name="delete" size={25} color="#900" style={styles.deleteIcon} onPress={() => deleteFriend(friend.userId._id)} />
            </View>
            <Divider />
          </View>
        )
      })
      : 
      friends.map(friend => {
        return (
          <View key={friend.userId._id}>
            <View style={styles.friend}>
              <Text style={styles.name}>{friend.userId.name}</Text>
              <MaterialIcons name="delete" size={25} color="#900" style={styles.deleteIcon} onPress={() => deleteFriend(friend.userId._id)} />
            </View>
            <Divider />
          </View>
        )
      })
    }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
    height: '100%'
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