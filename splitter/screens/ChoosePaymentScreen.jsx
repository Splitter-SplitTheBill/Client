import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native'
import PaymentMethodCard from '../components/PaymentMethodCard'
import { FetchTransactionItems } from '../actions/eventAction'
import { useDispatch, useSelector } from 'react-redux'

export default function ChoosePaymentScreen ({navigation}) {
    const billPicture = useSelector(state => state.cameraReducer.newBillPicture)
    const dispatch = useDispatch()

    const createEvent = () => {
        dispatch(FetchTransactionItems(billPicture))
        navigation.navigate('Split')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/paymentMethod.png')} style={{height: '75%', width: '70%', resizeMode: 'contain'}} />
            </View>
            <Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 10}}>Choose Your Methods</Text>
            <View style={styles.paymentMethodCardContainer}>
                <PaymentMethodCard paymentDetails={{
                    name: 'Okka Linardi',
                    instance: 'Mandiri',
                    accNumber: '3456787654',
                    id: 1
                }}></PaymentMethodCard>
                <PaymentMethodCard paymentDetails={{
                    name: 'Okka Linardi',
                    instance: 'Ovo',
                    accNumber: '3456787654',
                    id: 2
                }}></PaymentMethodCard>
                <PaymentMethodCard paymentDetails={{
                    name: 'Okka Linardi',
                    instance: 'BCA',
                    accNumber: '3456787654',
                    id: 3
                }}></PaymentMethodCard>
                <PaymentMethodCard paymentDetails={{
                    name: 'Okka Linardi',
                    instance: 'Gopay',
                    accNumber: '3456787654',
                    id: 4
                }}></PaymentMethodCard>
            </View>
            <Button title="Next" onPress={() => createEvent()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: Constants.statusBarHeight,
        height: Dimensions.get('screen').height,
        // height: '100%',
        width: Dimensions.get('screen').width,
        alignItems: 'center'
    },
    header: {
        height: '25%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#6597A0',
        alignItems: 'center',
        borderBottomEndRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center'
    }
})