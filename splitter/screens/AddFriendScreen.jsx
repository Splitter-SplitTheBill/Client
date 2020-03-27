import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import boyImage from '../assets/images/boy.png'
import { BackButton } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ADDFRIEND } from '../actions/friendAction'

function AddFriend({ route, navigation }) {
  const dispatch = useDispatch();

  let friend = route.params.data;
  console.log(friend, '< friend')

  const back = () => {
    navigation.goBack();
  };
  const user = useSelector(state => {
    return state.userReducer.UserLogin;
  });

  const userId = user._id;
  const token = user.token;

  console.log(user, '< user login')

  const addFriend = () => {
    dispatch(ADDFRIEND(userId, friend._id, token));
    navigation.navigate("FriendListScreen");
  };

  const checkFriend = () => {
    const check = user.friendList.find(person => person.userId._id == friend._id)
    if (check) {
      return (
        <Text style={{color: '#900'}}>Already in your friend list.</Text>
      )
    } else if (friend._id === userId) {
      return (
        <Text style={{color: '#900'}}>You can't add yourself as a friend.</Text>
      )
    } else {
      return (
        <TouchableOpacity style={styles.add} onPress={addFriend}>
          <Text style={styles.text}>ADD FRIEND</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <BackButton methods={back} />
      <View style={styles.box}>
        <View style={styles.backgroundImage}>
          {friend.image_url ? (
            <Image
              source={{ uri: friend.image_url }}
              style={styles.photo}
              resizeMode="cover"
            />
          ) : (
            <Image source={boyImage} style={styles.image} />
          )}
        </View>
        <Text style={{fontSize: 16, margin:10, fontFamily: 'ProximaNova-Regular'}}>{friend.name}</Text>
        {checkFriend()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff'
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.8
  },
  backgroundImage: {
    backgroundColor: "#E1E1E1",
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
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
    width: 100
  },
  add: {
    backgroundColor: "#0b8457",
    padding: 10,
    width: 180,
    borderRadius: 40,
    margin: 10,
    shadowRadius: 2,
    elevation: 2
  },
  text: {
    color: "white",
    textAlign: "center"
  },
  error: {
    color: "#900"
  }
});

export default AddFriend;
