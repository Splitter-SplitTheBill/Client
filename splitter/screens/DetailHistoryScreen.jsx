import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Divider } from 'react-native-elements'
import Constants from 'expo-constants';
import { BackButton } from '../components'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

function DetailHistory({navigation, route}) {
  const back = () => {
    navigation.goBack()
  }

  // const data = route.params.event

  let data = [
    {
        "_id": "5e78b57527668fabf8f4862f",
        "participantId": {
            "_id": "5e78b2a9ab98c8a9c5cb94d6",
            "name": "Okka",
            "email": "okka@mail.com",
            "username": "okka21",
            "password": "$2b$08$nPQb80vVbp2a8n3Ak2jCau6EK/Orkl32QcEvoXQJ6od.qPLbStLf6",
            "accounts": [],
            "friendList": [],
            "__v": 0
        },
        "transactionId": {
            "_id": "5e78b57527668fabf8f48624",
            "userId": "5e78b2a9ab98c8a9c5cb94d6",
            "items": [
                {
                    "_id": "5e78b57527668fabf8f48625",
                    "name": " KSS TRIPLE OR",
                    "price": 50000
                },
                {
                    "_id": "5e78b57527668fabf8f48626",
                    "name": " TU Rice Org nik",
                    "price": 454
                },
                {
                    "_id": "5e78b57527668fabf8f48627",
                    "name": " KFC SOUP LIMA",
                    "price": 5000
                }
            ],
            "total": 55454,
            "status": false,
            "paymentSelection": [
                {
                    "_id": "5e78b57527668fabf8f48622",
                    "name": "Okka Linardi",
                    "instance": "Ovo"
                },
                {
                    "_id": "5e78b57527668fabf8f48623",
                    "name": "Okka Linardi",
                    "instance": "BCA"
                }
            ],
            "eventId": "5e78b57527668fabf8f48621",
            "createdAt": "2020-03-23T13:11:17.441Z",
            "updatedAt": "2020-03-23T13:11:17.441Z",
            "__v": 0
        }
    },
    {
        "_id": "5e78b57527668fabf8f48630",
        "participantId": {
            "_id": "5e78b2baab98c8a9c5cb94d7",
            "name": "Okka2",
            "email": "okka2@mail.com",
            "username": "okka12",
            "password": "$2b$08$EJYQa1wpSvrYDXxVjtRZvO2xW3KgXXL8FECbzpne1fxAofdhL5sCy",
            "accounts": [],
            "friendList": [],
            "__v": 0
        },
        "transactionId": {
            "_id": "5e78b57527668fabf8f4862a",
            "userId": "5e78b2baab98c8a9c5cb94d7",
            "items": [
                {
                    "_id": "5e78b57527668fabf8f4862b",
                    "name": " TU Rice Org nik",
                    "price": 454
                },
                {
                    "_id": "5e78b57527668fabf8f4862c",
                    "name": " TU Rice Org nik",
                    "price": 454
                }
            ],
            "total": 908,
            "status": true,
            "paymentSelection": [
                {
                    "_id": "5e78b57527668fabf8f48622",
                    "name": "Okka Linardi",
                    "instance": "Ovo"
                },
                {
                    "_id": "5e78b57527668fabf8f48623",
                    "name": "Okka Linardi",
                    "instance": "BCA"
                }
            ],
            "eventId": "5e78b57527668fabf8f48621",
            "createdAt": "2020-03-23T13:11:17.441Z",
            "updatedAt": "2020-03-23T13:11:17.441Z",
            "__v": 0
        }
    }
]

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <BackButton methods={back} />
        <Text style={styles.headline}>Detail Transaction</Text>
      </View>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Total Bill</Text>
        <Text style={styles.amount}>Rp 578.000,00</Text>
      </View>
      <View style={styles.detail}>
        <ScrollView>
        {data.map(detail => {
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
    height: height * 0.68
  }
})

export default DetailHistory