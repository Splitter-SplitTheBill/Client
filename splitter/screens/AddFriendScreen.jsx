import React from 'react'
import { View, Text, StyleSheet, Alert, Image } from 'react-native'
import boyImage from '../assets/images/boy.png'
import { BackButton } from '../components'
import { TouchableOpacity } from 'react-native-gesture-handler'


function AddFriend({route, navigation}) {
  let friend = route.params.data

  console.log(friend, '< friend')
  const back = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <BackButton methods={back} />
      <View style={styles.box}>
        <View style={styles.backgroundImage}>
          <Image source={boyImage} style={styles.image}/>
        </View>
        <TouchableOpacity style={styles.add} >
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
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 2,
    elevation: 2
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