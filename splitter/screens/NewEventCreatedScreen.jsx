import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'
import NewEventParticipantCard from '../components/NewEventParticipantCard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

export default function NewEventCreatedScreen ({ navigation }) {
    const newEvent = useSelector(state => state.eventReducer.newEvent)

    if(newEvent){
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('TabNavigation')}>
                    <Ionicons name="ios-home" size={30} color="green" />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text>Your New Event!!</Text>
                </View>
            </View>
            <View style={styles.eventOverviewContainer}>
                <View style={styles.eventOverview}>
                    <Text style={{fontSize: 30}}>{newEvent.name}</Text>
                    <Text>{new Date(newEvent.createdAt).toDateString()}</Text>
                    <View style={styles.overviewImageContainer}>
                        <Image style={{height: '100%', width: '100%', resizeMode: 'cover'}} source={require('../assets/NewEventHeaderPic.png')} />
                    </View>
                </View>
            </View>
            <View style={styles.contentContainer}>
                {
                    newEvent.participants.map(participant => {
                        return(
                            <NewEventParticipantCard participantData={participant} />
                        )
                    })
                }
                
            </View>
        </View>
    )
} else {
    return (
        <Text>Loading</Text>
    )
}
} 

const styles = StyleSheet.create({
    overviewImageContainer: {
        height: '60%',
        width: '100%',
        marginTop: 25,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingTop: Constants.statusBarHeight
    },
    headerContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    eventOverviewContainer: {
        width: '100%',
        height: '40%',
        alignItems: 'flex-end'
    },
    header: {
        width: '65%',
        height: '100%',
        borderRadius: 20,
        borderWidth: 3,
        transform: [{
            translateX: 30
        }],
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10
    },
    eventOverview: {
        width: '80%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: '#6597A0',
        transform: [{
            translateX: 50,
            translateY: -40
        }],
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        height: '50%',
        width: '100%'
    },
    homeButton: {
        width: 100,
        height: 35,
        backgroundColor: '#32ff7e',
        borderRadius: 10,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})