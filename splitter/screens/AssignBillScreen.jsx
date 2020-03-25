import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import { ScrollView } from 'react-native-gesture-handler'
import TransactionItem from '../components/TransactionItems'
import { useSelector, useDispatch } from 'react-redux'
import ReceiptImageModal from '../components/ReceiptImageModal'
import { submitEvent, setParticipantsWithItems, FetchTransactionItemsAgain, AddTransactionItem } from '../actions/eventAction'
import ConvertToIdr from '../helpers/RpConverter'
import ConfirmationModal from '../components/ConfirmationModal'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

export default function AssignBillScreen ({ navigation }) {
    const eventName = useSelector(state => state.eventReducer.eventName)
    const [receiptModalTrigger, setReceiptModalTrigger] = useState(false)
    const [confirmTrigger, setConfirmTrigger] = useState(false)
    const receiptImageUrl = useSelector(state => state.eventReducer.billPicture)
    const transactionItems = useSelector(state => state.eventReducer.transactionItems)
    const participants = useSelector(state => state.eventReducer.participants)
    const userData = useSelector(state => state.userReducer.UserLogin)
    const [totalReceipt, setTotalReceipt] = useState(0)
    const dispatch = useDispatch()

    const triggerModal = () => {
        setReceiptModalTrigger(!receiptModalTrigger)
    }

    const submitTheEvent = (confirmation) => {
        if (confirmation) {
            dispatch(setParticipantsWithItems())
            dispatch(submitEvent(userData._id))
            navigation.navigate('Event')
        } else {
            setConfirmTrigger(false)
            console.log( 'cancelled' )
        }
    }

    const addAnItem = () => {
        dispatch(AddTransactionItem())
    }

    useEffect(() => {
        console.log(participants)
    }, [])

    useEffect(() => {
        if(transactionItems.length > 1) {
            let newTotal = 0
            transactionItems.forEach(item => {
                newTotal += Number(item.price)
            })
            setTotalReceipt(newTotal)
        }
    }, [transactionItems])
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => triggerModal()}>
                    <View style={styles.receiptContainer}>
                        {
                            receiptImageUrl
                            ? <Image source={{uri: receiptImageUrl}} style={styles.receipt} />
                            : <ActivityIndicator size="small" color='#0b8457' />
                        }
                    </View>
                </TouchableOpacity>
                <View style={styles.eventDetails}>
                    <Text style={{color: 'white', fontSize: 25, flexWrap: 'wrap', textAlign: 'center', flexDirection: 'row', width: 110, marginBottom: 5, fontFamily: 'ProximaNova-Bold'}}>{eventName}</Text>
                    <Text style={{color: 'white', marginBottom: 5, fontFamily: 'ProximaNova-Regular'}}>Paid by: {userData.username}</Text>
                    <Text style={{color: 'white', fontFamily: 'ProximaNova-Regular'}}>{new Date().toDateString()}</Text>
                </View>
            </View>
            <View style={styles.receiptDetailsContainer}>
                <View style={{borderTopStartRadius: 10, borderTopEndRadius: 10, borderWidth: 3, borderColor: '#900', backgroundColor: '#900', width: '45%', height: '8%', alignItems: 'center'}}>
                    <Text style={{fontSize: 13, fontFamily: 'ProximaNova-Bold', color: 'white'}}>Transaction Details</Text>
                </View>
                {   
                    transactionItems.length > 1
                    ? <><View style={styles.transactionDetails}>
                        <View style={styles.transactionItemHeader}>
                            <View style={{height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20, fontFamily: 'ProximaNova-Bold'}}>Menu</Text>
                            </View>
                            <View style={{height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 20, fontFamily: 'ProximaNova-Bold'}}>Price</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={{padding: 5}}>
                                {
                                    transactionItems.map((item, i) => {
                                        return (
                                            <TransactionItem itemDetails={item} key={i} indexNum={i}></TransactionItem>
                                        )
                                    })
                                }
                                <TouchableOpacity style={styles.addTransactionSection} onPress={() => addAnItem()}>
                                    <Ionicons name="md-add-circle-outline" size={32} color="#7bed9f" />
                                </TouchableOpacity>
                                <View style={styles.totalSection}>
                                    <Text style={styles.totalInfo}>
                                        Total
                                    </Text>
                                    <Text style={styles.totalInfo}>
                                        Rp. {ConvertToIdr(totalReceipt)} ,-
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View></>
                    : transactionItems.length == 1 
                    ? <View style={styles.tryAgainContainer}>
                        <Text>Oops!</Text>
                        <Text>there's an error in scanning your bill</Text>
                        <Text>Please press the button below to retry the process</Text>
                        <TouchableOpacity style={styles.tryAgainButton} onPress={() => {
                            dispatch(FetchTransactionItemsAgain(receiptImageUrl))
                        }}>
                            <FontAwesome name="refresh" size={20} color="green" />
                        </TouchableOpacity>
                    </View>
                    : <View style={styles.tryAgainContainer}>    
                        <ActivityIndicator size="large" color='#0b8457' />
                    </View>
                    
                }
            </View>
            <TouchableOpacity style={styles.splitTheBillButton} onPress={() => setConfirmTrigger(true)}>
                <Text style={{fontFamily: 'ProximaNova-Regular', color: 'white'}}>Split The Bill!</Text>
            </TouchableOpacity>
            {
                receiptModalTrigger
                && <ReceiptImageModal triggerModal={triggerModal} />
            }
            {
                confirmTrigger
                && <ConfirmationModal confirmationFunction={submitTheEvent} />
            }
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
        paddingTop: Constants.statusBarHeight
    },
    header: {
        height: '25%',
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row'
    },
    receiptContainer: {
        height: 170,
        width: 170,
        borderRadius: 999,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#0b8457',
        backgroundColor: 'white'
    },
    receipt: {
        height: '95%',
        width: '95%',
        resizeMode: 'cover',
        borderRadius: 999,
        overflow: 'hidden'
    },
    eventDetails: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '75%',
        paddingRight: 50,
        height: '80%',
        borderRadius: 20,
        translateX: -100,
        zIndex: -1,
        backgroundColor: '#0b8457'
        // transform: [{
        //     translateX: '-30%'
        // }]
    },
    receiptDetailsContainer: {
        height: '65%',
        width: '95%'
    },
    tryAgainContainer: {
        height: Dimensions.get('screen').height-350,
        width: Dimensions.get('screen').width-20,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: '#0b8457',
        transform: [{
            translateY: -20
        }],
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    transactionDetails: {
        height: Dimensions.get('screen').height-350,
        width: Dimensions.get('screen').width-20,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: '#0b8457',
        transform: [{
            translateY: -20
        }],
        backgroundColor: 'white',
        alignItems: 'center'
    },
    transactionItemHeader: {
        height: '15%',
        width: '95%',
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 3
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderTopWidth: 2,
        marginTop: 10,
        height: 50,
        width: Dimensions.get('screen').width-40
    },
    totalInfo: {
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'ProximaNova-Regular'
    },
    splitTheBillButton: {
        height: '6%',
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#0b8457',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tryAgainButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#10ac84',
        borderRadius: 10,
        marginTop: 10
    },
    addTransactionSection: {
        height: 40,
        width: '100%',
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#01a3a4'
    }
})