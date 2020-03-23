import React from 'react'
import { View, Text } from 'react-native'
import { BackButton, SearchBar } from '../components'

function FriendListScreen() {
  return (
    <View>
      <BackButton />
      <Text>Friends</Text>
      <SearchBar />
    </View>
  )
}

export default FriendListScreen