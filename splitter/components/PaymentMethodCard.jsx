import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AddPaymentMethod, RemovePaymentMethod} from '../actions/eventAction'

export default function PaymentMethodCard ({ paymentDetails }) {
    const paymenMethodList = useSelector(state => state.eventReducer.paymentSelection)
    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch()

    const addMethod = () => {
        dispatch(AddPaymentMethod(paymentDetails))
    }

    const removeMethod = () => {
        dispatch(RemovePaymentMethod(paymentDetails))
    }

    useEffect(() => {
        const methodList = paymenMethodList.filter (method => method.id == paymentDetails.id)

        if(methodList.length > 0){
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [paymenMethodList])

    if(!selected) {
        return(
            <TouchableOpacity onPress={() => addMethod()}>
                <View style={styles.methodCard}>
                    <View style={{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.instanceMethod}>{paymentDetails.instance}</Text>
                    </View>
                    <View style={styles.selectedMethodNone}>
                        <Text style={styles.accNameMethod}>{paymentDetails.name}</Text>
                        <Text style={styles.accNumMethod}>{paymentDetails.accNumber}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    } else {
        return(
            <TouchableOpacity onPress={() => removeMethod()}>
                <View style={styles.methodCard}>
                    <View style={{width: '35%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 3, borderTopRightRadius: 999, borderBottomRightRadius: 999,backgroundColor: '#d1d8e0'}}>
                        <Text style={styles.instanceMethod}>{paymentDetails.instance}</Text>
                    </View>
                    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1, flexDirection:'row', position:'absolute', backgroundColor: '#4b6584'}}>
                        <View style={{width: '35%', height: '100%'}}></View>
                        <View style={{width: '65%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.accNameMethodSelected}>{paymentDetails.name}</Text>
                            <Text style={styles.accNumMethodSelected}>{paymentDetails.accNumber}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    methodCard: {
        height: 100,
        width: Dimensions.get('screen').width-70,
        backgroundColor: '#d1d8e0',
        borderRadius: 30,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    instanceMethod: {
        fontSize: 20,
        height: '100%',
        width: '100%',
        paddingRight: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRightWidth: 7,
        borderRadius: 999,
        borderColor: '#4b6584'
    },
    accNameMethod: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    selectedMethodNone: {
        width: '65%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedMethod: {
        width: '65%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b6584',
        color: 'white'
    },
    accNameMethodSelected: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
        color: '#d1d8e0'
    },
    accNumMethodSelected: {
        color: '#d1d8e0'
    }
})