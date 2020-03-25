import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import PaymentMethodCard from '../components/PaymentMethodCard'
import { FetchTransactionItems, SetParticipantsId, changeBillPicture } from '../actions/eventAction'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'

export default function ChoosePaymentScreen ({navigation}) {
    const billPicture = useSelector(state => state.cameraReducer.newBillPicture)
    const userData = useSelector(state => state.userReducer.UserLogin)
    const dispatch = useDispatch()

    const createEvent = () => {
        dispatch(changeBillPicture())  
        dispatch(FetchTransactionItems(billPicture))
        navigation.navigate('Split')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/paymentMethod.png')} style={{height: '75%', width: '70%', resizeMode: 'contain'}} />
            </View>
            <Text style={{fontSize: 23, marginTop: 10, fontFamily: 'ProximaNova-Bold'}}>Choose Your Methods</Text>
            {/* <ScrollView>
            <View style={styles.paymentMethodCardContainer}>
                {
                    userData.accounts.map(account => {
                        return (
                            <PaymentMethodCard paymentDetails={account} />
                        )
                    })
                }
            </View>
            </ScrollView> */}
            <FlatList
                    data={userData.accounts}
                    style={styles.ContentList}
                    contentContainerStyle={{justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap'}}
                    renderItem={({ item }) => {
                        return (
                            <PaymentMethodCard paymentDetails={item} />
                        )
                    }}
                    keyExtractor={(item, i) => item._id}
                    />
            {/* <Button title="Next" onPress={() => createEvent()} /> */}
            <TouchableOpacity onPress={() => createEvent()}
                            style={{width: 100,
                            marginTop: 10,
                            height: 45,
                            backgroundColor: '#0b8457',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10}}>

                                <Text style={{marginRight: 5, color:'white', fontFamily: 'ProximaNova-Bold'}}>Next</Text>
                                <AntDesign name="doubleright" size={20} color="white" />
                        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Constants.statusBarHeight,
        height: Dimensions.get('screen').height,
        // height: '100%',
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        paddingBottom: 40
    },
    header: {
        height: '25%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#0b8457',
        alignItems: 'center',
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center'
    },
    paymentMethodCardContainer: {
        height: 500,
        width: 400,
        paddingHorizontal: 20,
        alignItems: 'center'
    }
})