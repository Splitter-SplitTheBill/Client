import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { BackButton, SearchBar } from '../components'
import addIcon from '../assets/images/add.png'

function FriendListScreen() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Friends</Text>
      <View style={styles.search}>
        <SearchBar />
        <Image source={addIcon} style={styles.addIcon} />
      </View>
      <Text style={styles.name}>John Doe</Text>
      <Divider />
      <Text style={styles.name}>John Doe</Text>
      <Divider />
      <Text style={styles.name}>John Doe</Text>
      <Divider />
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
    justifyContent: 'center',
    marginBottom: 10
  },
  addIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
    marginTop: 5
  },
  name: {
    fontSize: 18,
    margin: 10
  }
})

export default FriendListScreen