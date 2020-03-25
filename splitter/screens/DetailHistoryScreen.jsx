import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Divider } from 'react-native-elements'
import Constants from 'expo-constants';
import { BackButton } from '../components'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'

const baseUrl = "http://192.168.43.186:3000";

function DetailHistory({navigation, route}) {
  const [bill, setBill] = useState(0)
  // const [status, setStatus] = useState(false)

  const back = () => {
    navigation.goBack()
  }

  const user = useSelector(state => {
    return state.userReducer.UserLogin;
  })

  const token = user.token

  const data = route.params.event
  const eventId = route.params.eventId
  console.log(route.params.eventId, '< ini params ya')
  
  const changeStatus = (userId) => {
    console.log(eventId, '< ini data ya')
    console.log(userId, '< userid')
    axios({
      method: 'PATCH',
      url: `${baseUrl}/${eventId}/${userId}`,
      headers: { token },
      data: {
        status: 'settled'
      }
    })
      .then(result => {
        console.log(result, '< change status')
      })
      .catch(err => {
        console.log(err, '< error showAllEvents')
      })
  }

  const checkStatus = (status, userId) => {
    if (status === 'unpaid') {
      return (
        <Text style={{marginLeft: 'auto', color: '#900',fontFamily: 'ProximaNova-Regular'}}>Status: UNPAID</Text>
      )
    } else if (status === 'settling') {
      return (
        <View>
          <Text style={{marginLeft: 'auto', color: '#900',fontFamily: 'ProximaNova-Regular'}}>Status: SETTLING</Text>
          <TouchableOpacity onPress={() => changeStatus(userId)} style={{marginLeft: 'auto', backgroundColor: '#0b8457', padding: 5, borderRadius: 5, paddingHorizontal: 10, marginBottom: 5}}>
            <Text style={{color: 'white'}}>
              Paid
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <Text style={{marginLeft: 'auto', color: '#6597a0',fontFamily: 'ProximaNova-Regular'}}>Status: COMPLETE</Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <BackButton methods={back} />
        <Text style={styles.headline}>Detail Transaction</Text>
      </View>
      <View style={styles.detail}>
        <ScrollView>
        {data && data.map(detail => {
          return (
            <View key={detail._id}>
              <Text style={{fontSize: 16,fontFamily: 'ProximaNova-Bold'}}>{detail.participantId.name}</Text>
              {detail.transactionId.items.map(item => {
                return (
                  <View key={item._id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontFamily: 'ProximaNova-Regular'}}>{item.name}</Text>
                    <Text style={{fontFamily: 'ProximaNova-Regular'}}>{item.price}</Text>
                  </View>
                )
              })}
              {checkStatus(detail.transactionId.status, detail.transactionId.userId)}
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
    backgroundColor: '#0b8457'
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
    fontSize: 15,
    fontFamily: 'ProximaNova-Regular'
  },
  amount: {
    fontSize: 25,
    fontFamily: 'ProximaNova-Regular'
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