import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native'
import Constants from 'expo-constants'
import { Feather } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { ResetPicture } from '../actions/cameraAction'
import { SetEventName, SetParticipantsId, userMockFetch } from '../actions/eventAction'
import EventFriend from '../components/EventFriend'

export default function CreateEventScreen ({navigation}) {
    const billPicture = useSelector(state => state.cameraReducer.newBillPicture)
    // const [newEventName, setNewEventName] = useState('')
    const userData = useSelector(state => state.eventReducer.mockUserData)
    const dispatch = useDispatch()

    // JANGAN LUPA DI HAPUS INI HANYA UNTUK TESTING
    const profPicUri = 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_weight_other/1800x1200_cat_weight_other.jpg?resize=600px:*'
    const mockFriendList = [{
        id: '5e78b2a9ab98c8a9c5cb94d6',
        userName: 'Novi',
        image_url: profPicUri
    },{
        id: '5e78b2baab98c8a9c5cb94d7',
        userName: 'Riko',
        image_url: profPicUri
    }]
    useEffect(() => {
       dispatch(userMockFetch())
    }, [])
    // HAPUSNYA SAMPAI SINI

    const resetPicture = () => {
        dispatch(ResetPicture())
        navigation.navigate('Camera')
    }

    const changeEventName = (newEventName) => {
        dispatch(SetEventName(newEventName))
    }

    const goToPaymentSelection = () => {
        dispatch(SetParticipantsId())
        navigation.navigate('PaymentMethod')

    }

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/createEventHeader.png')} style={{height: '75%', width: '50%'}} />
                    <Text style={{fontSize: 23, fontWeight: 'bold'}}>Create an Event</Text>
                </View>
                <ScrollView>
                    <View style={styles.screenContentContainer}>
                        <View style={styles.eventNameInputContainer}>
                            <TextInput
                                style={{
                                    borderBottomWidth: 2,
                                    width: '85%',
                                    height: '90%',
                                    textAlign: 'center'
                                }}
                                placeholder="Enter Event Name"
                                placeholderTextColor="#57606f"
                                onChangeText={(eventNameInput) => changeEventName(eventNameInput)}>
                            </TextInput>
                        </View>
                        {
                            billPicture
                            ? <><View style={{
                                height: '40%',
                                width: '95%',
                                marginTop: 20,
                                borderRadius: 20,
                                overflow: 'hidden'
                                }}>
                                <Image source={{uri: billPicture.uri}} style={{width: '100%', height: '100%'}} />
                            </View>
                            <TouchableOpacity onPress={() => resetPicture()} style={{height: '3%', marginVertical: 3, width: '50%', borderWidth: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
                                    <Text>Change Picture</Text>
                                </TouchableOpacity>
                            </>
                            : <TouchableOpacity
                                style={{
                                    height: '40%',
                                    width: '95%',
                                    marginTop: 20
                                }}
                                onPress={() => navigation.navigate('Camera')}
                                >
                                <View style={styles.takePicturePart}>
                                    <View style={styles.innerPicturePart}>
                                        <Feather name="camera" size={75} color="#ced6e0" />
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#ced6e0',
                                            marginTop: 10
                                        }}>Click here to take picture of the bill</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        <View style={styles.addFriendContainer}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add Friends to this Event</Text>
                            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>      
                                {
                                    userData
                                    && userData.friendList.map(friend => {
                                        return (
                                            <EventFriend friendData={friend.userId}></EventFriend>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <Button title="Create Event" onPress={() => goToPaymentSelection()} />
                    </View>
                </ScrollView>
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
    },
    takePicturePart: {
        height: '100%',
        width: '100%',
        backgroundColor: '#a4b0be',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerPicturePart: {
        width: '99%',
        height: '99%',
        borderStyle: 'dashed',
        borderRadius: 20,
        borderColor: '#dfe4ea',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventNameInputContainer: {
        height: '4%',
        width: '75%',
        backgroundColor: '#a4b0be',
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 5
    },
    screenContentContainer: {
        height: Dimensions.get('screen').height+500,
        width: Dimensions.get('screen').width,
        alignItems: 'center'
    },
    addFriendContainer: {
        height: '28%',
        width: '100%',
        marginTop: 10,
        alignItems: 'center'
    }
})