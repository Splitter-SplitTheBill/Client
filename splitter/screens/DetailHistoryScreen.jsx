import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Constants from 'expo-constants';
import { BackButton } from '../components'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

function DetailHistory() {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <BackButton />
        <Text style={styles.headline}>Detail Transaction</Text>
      </View>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Total Bill</Text>
        <Text style={styles.amount}>Rp 578.000,00</Text>
      </View>
      <View style={styles.detail}>
        <Text>Halo</Text>
      </View>
    </View>
  )
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6597A0'
  },
  back: {
    padding: 5,
    flexDirection: 'row',
  },
  headline: {
    marginTop: Constants.statusBarHeight,
    alignSelf:'center',
    marginLeft: 20,
    color: 'white'
  },
  boxTitle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowRadius: 3,
    elevation: 2,
    margin: 20
  },
  title: {
    fontSize: 15
  },
  amount: {
    fontSize: 25
  },
  detail: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 'auto',
    height: height * 0.68
  }
})

export default DetailHistory