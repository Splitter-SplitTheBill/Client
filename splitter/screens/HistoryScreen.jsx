import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { View, Text, StyleSheet, Image, Modal } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import pay from '../assets/images/pay.png'

import { CustomCard, BackButton } from '../components'
import { showAllEvents } from '../actions/eventAction'


function HistoryScreen({navigation}) {
  const dispatch = useDispatch()
  const user = useSelector(state => {
    return state.userReducer.UserLogin;
  })

  const userId = user._id
  const token = user.token

  useEffect(() => {
    dispatch(showAllEvents(userId, token))
  }, [])

  const allEvents = useSelector(state => state.eventReducer.allEvents)

  const back = () => {
    navigation.goBack()
  }

  const detailHistory = (event) => {
    navigation.navigate('DetailHistoryScreen', {event: event.participants, eventId: event._id})
  }

  return (
    <View style={styles.container} >
      <View style={styles.head}>
        <BackButton methods={back} />
        <Image source={pay} style={styles.image}/>
        <View style={styles.title}>
          <Text style={styles.totalBill}>History</Text>
          <View style={styles.boxAmount}>
            <Text style={styles.amount}>Transactions</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <ScrollView>
          {allEvents.map(event => {
            return (
              <View key={event._id}>
                <CustomCard methods={detailHistory} data={event} />
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b8457',
    flex: 1,
  },
  head: {
    paddingLeft: 5,
    flexDirection: 'row',
  },
  title: {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 20
  },
  image: {
    height: 150,
    width: 100,
    marginLeft: 10
  },
  totalBill: {
    marginTop: 20,
    color: 'white',
    fontSize: 30,
    fontFamily: 'Hotham',
    letterSpacing: 2
  },
  boxAmount: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    shadowRadius: 2,
    elevation: 2
  },
  amount: {
    color: '#0b8457',
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Bold'
  },
  box: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowRadius: 15,
    elevation: 10,
  },
  titleTransaction: {
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular'
  },
  event: {
    backgroundColor: '#bfc6cc',
    height: 100,
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowRadius: 2,
    elevation: 3,
  },
  circle: {
    backgroundColor: 'white',
    width: 50,
    padding: 10,
    borderRadius: 90
  },
  icon: {
    width: 30,
    height: 30
  },
  detail: {
    marginLeft: 10
  },
  eventName: {
    fontWeight: 'bold',
    color: '#0b8457',
    fontFamily: 'ProximaNova-Regular'
  },
  next: {
    height: 20,
  }
});


export default HistoryScreen