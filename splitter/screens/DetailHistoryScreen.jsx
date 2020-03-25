import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Divider } from 'react-native-elements'
import Constants from 'expo-constants';
import { useSelector, useDispatch } from 'react-redux'
import { BackButton } from '../components'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import { showOneEvent } from '../actions/eventAction'
import formatMoney from '../helpers/RpConverter'

const baseUrl = "http://192.168.43.186:3000";

function DetailHistory({navigation, route}) {
  const dispatch = useDispatch()

  const back = () => {
    route.params.refresh()
    navigation.goBack()
  }

  const getUser = useSelector(state => {
    return state.userReducer.UserLogin;
  })

  const token = getUser.token
  const eventId = route.params.eventId

  useEffect(() => {
    dispatch(showOneEvent(eventId, token))
  }, [])

  const getEvent = useSelector(state => {
    return state.eventReducer.oneEvent;
  })
  
  const changeStatus = (userId) => {
    axios({
      method: 'PATCH',
      url: `${baseUrl}/transactions/${eventId}/${userId}`,
      headers: { token },
      data: {
        status: 'settled'
      }
    })
      .then(result => {
        dispatch(showOneEvent(eventId, token))
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
        <Text style={{marginLeft: 'auto', color: '#0b8457',fontFamily: 'ProximaNova-Regular'}}>Status: COMPLETE</Text>
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
        {getEvent && getEvent.participants.map(detail => {
          return (
            <View key={detail._id} style={styles.box}>
              <Text style={{fontSize: 16,fontFamily: 'ProximaNova-Bold'}}>{detail.participantId.name}</Text>
              {detail.transactionId.items.map(item => {
                return (
                  <View key={item._id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontFamily: 'ProximaNova-Regular'}}>{item.name}</Text>
                    <Text style={{fontFamily: 'ProximaNova-Regular'}}>Rp {formatMoney(item.price)}</Text>
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
    height: height * 0.9
  },
  box: {
    marginTop: 'auto',
  }
})

export default DetailHistory