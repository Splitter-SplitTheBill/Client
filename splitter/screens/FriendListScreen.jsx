import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { BackButton, SearchBar } from '../components'

function FriendListScreen() {
  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Friends</Text>
      <View style={styles.search}>
        <SearchBar />
        <Ionicons name="md-person-add" style={styles.addIcon} size={32} />
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
    marginLeft: 10,
    marginTop: 3,
    color: '#6597a0',
  },
  name: {
    fontSize: 18,
    margin: 10
  }
})

export default FriendListScreen