import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SetToPaid } from '../actions/eventAction'
import ConvertToIDR from '../helpers/RpConverter'
import { useDispatch } from 'react-redux';

export default function NewEventParticipantCard ({ participantData }) {
    const dispatch = useDispatch()

    const setPaid = () => {
        dispatch(SetToPaid(participantData.transactionId.eventId,participantData.participantId._id))
        // console.log(participantData.transactionId.eventId,participantData.participantId._id)
    }

    if (participantData.transactionId.status == 'settled' || participantData.transactionId.status == 'settling') {
        // console.log(participantData.participantId.username)
        return (
            <>
                <View style={styles.cardContainer}>
                    <View>
                            <Feather name="check-circle" size={50} color="green" />
                    </View>
                    <View style={{width: '45%', height: '100%', justifyContent: 'center', marginHorizontal: 10}}>
                        <Text style={{textAlign: 'right', fontSize: 15, marginBottom: 5, fontWeight: 'bold'}}>{participantData.participantId.username} </Text>
                        <Text style={{textAlign: 'right'}}>Rp. {ConvertToIDR(participantData.transactionId.total)} ,-</Text>
                    </View>
                    <Image style={styles.ParticipantPic} source={{uri: participantData.participantId.image_url}}/>
                    <View style={styles.disabled}>
                    <Image style={{
                        width: '60%',
                        height: '100%',
                        resizeMode: 'cover'
                    }} source={require('../assets/settled.png')} />
                </View>
                </View>
            </>
            )
    }
    else if (participantData.transactionId.status == 'unpaid'){
    return (
        <TouchableOpacity onPress={() => setPaid()}>
            <View style={styles.cardContainer}>
                <View>
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={50} color="green" />
                </View>
                <View style={{width: '45%', height: '100%', justifyContent: 'center', marginHorizontal: 10}}>
                    <Text style={{textAlign: 'right', fontSize: 15, marginBottom: 5, fontWeight: 'bold'}}>{participantData.participantId.username} </Text>
                    <Text style={{textAlign: 'right'}}>Rp. {ConvertToIDR(participantData.transactionId.total)} ,-</Text>
                </View>
                <Image style={styles.ParticipantPic} source={{uri: participantData.participantId.image_url}}/>
            </View>
        </TouchableOpacity>
    )
    }
}

const styles = StyleSheet.create({
    disabled: {
        width: Dimensions.get('screen').width-60,
        height: 100,
        borderRadius: 20,
        // transform: [{
        //     translateX: -20
        // }],
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10,
        alignItems: 'center'
    },
    cardContainer: {
        width: Dimensions.get('screen').width-60,
        height: 100,
        borderRadius: 20,
        transform: [{
            translateX: -25
        }],
        borderWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 10
    },
    ParticipantPic: {
        height: '80%',
        width: '25%',
        borderRadius: 999,
        overflow: 'hidden'
    }
})