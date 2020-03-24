import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Divider } from 'react-native-elements'
import Constants from 'expo-constants';
import { BackButton } from '../components'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

function DetailHistory({navigation, route}) {
  const [bill, setBill] = useState(0)
  // const [status, setStatus] = useState(false)

  const back = () => {
    navigation.goBack()
  }

  const totalBill = (price) => {
    console.log(price, '< price')
    let add = bill + price
    setBill(add)
  }

  const data = route.params.event
  console.log(data, '< ini data ya')

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <BackButton methods={back} />
        <Text style={styles.headline}>Detail Transaction</Text>
      </View>
      {/* <View style={styles.boxTitle}>
        <Text style={styles.title}>Total Bill</Text>
        <Text style={styles.amount}>Rp {bill}</Text> */}
        {/* {status ?
        <Text style={{color: '#6597a0'}}>COMPLETED</Text>
        :
        <Text style={{color: '#900'}}>UNCOMPLETE</Text>
        } */}
      {/* </View> */}
      <View style={styles.detail}>
        <ScrollView>
        {data && data.map(detail => {
          return (
            <View key={detail._id}>
              <Text style={{fontSize: 16, fontWeight:'bold'}}>{detail.participantId.name}</Text>
              {detail.transactionId.items.map(item => {
                return (
                  <View key={item._id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                  </View>
                )
              })}
              {detail.transactionId.status == false
                ?
                <Text style={{marginLeft: 'auto', color: '#900'}}>Status: UNPAID</Text>
                :
                <Text style={{marginLeft: 'auto', color: '#6597a0'}}>Status: COMPLETE</Text>
              }
              <Divider />
            </View>
          )
        })}
        </ScrollView>
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
    height: height * 0.9
  }
})

export default DetailHistory