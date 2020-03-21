import React from 'react'
import { View, Text } from 'react-native'
import { BackButton, SearchBar } from '../components'

function AddFriend({navigation}) {
  console.log(navigation, '< navigation')
  const back = () => {
    navigation.goBack()
  }

  return (
    <View>
      <BackButton methods={back} />
    </View>
  )
}

export default AddFriend