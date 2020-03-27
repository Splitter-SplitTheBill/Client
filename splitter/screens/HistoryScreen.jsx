import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { View, Text, StyleSheet, Image, Modal, Dimensions, TouchableOpacity, ScrollView, RefreshControl  } from 'react-native'
import Constant from 'expo-constants'

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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    dispatch(showAllEvents(userId, token))
  }, []);

  useEffect(() => {
    dispatch(showAllEvents(userId, token))
  }, [])

  const allEvents = useSelector(state => state.eventReducer.allEvents)

  const back = () => {
    navigation.goBack()
  }

  const refreshScreen = () => {
    dispatch(showAllEvents(userId, token))
  }

  const detailHistory = (event) => {
    navigation.navigate('DetailHistoryScreen', {eventId: event._id, refresh: refreshScreen })
  }

  return (
    <View style={styles.container} >
        <View style={{paddingTop: 5, position: 'absolute', marginTop: Constant.statusBarHeight}}>
          <BackButton methods={back} />
        </View>
      <View style={styles.head}>
        <Image source={pay} style={styles.image}/>
        <View style={styles.title}>
          <Text style={styles.totalBill}>{' '}History{' '}</Text>
          <View style={styles.boxAmount}>
            <Text style={styles.amount}>Transactions</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {allEvents.map(event => {
            return (
              <CustomCard methods={detailHistory} data={event} key={event._id}/>
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
    paddingTop: Constant.statusBarHeight
  },
  head: {
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: -1
  },
  title: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  image: {
    height: 150,
    width: 100,
    marginLeft: '10%'
  },
  totalBill: {
    marginTop: 20,
    color: 'white',
    fontSize: 40,
    fontFamily: 'Hotham',
    letterSpacing: 2,
    marginLeft: '20%'
  },
  boxAmount: {
    backgroundColor: 'white',
    padding: 5,
    shadowRadius: 2,
    elevation: 2,
    width: 200,
    transform: [{
      translateX: 50
    }]
  },
  amount: {
    color: '#0b8457',
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'ProximaNova-Bold',
    marginRight: '15%'
  },
  box: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowRadius: 15,
    elevation: 10,
    height: Dimensions.get('screen').height-300,
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