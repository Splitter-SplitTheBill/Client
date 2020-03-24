import React from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import ConvertToIDR from '../helpers/RpConverter'

export default function NewEventParticipantCard ({ participantData }) {
    return (

        <View style={styles.cardContainer}>
            <View>
                <TouchableOpacity>
                    <Feather name="check-circle" size={50} color="green" />
                </TouchableOpacity>
            </View>
            <View style={{width: '40%', height: '100%', justifyContent: 'center', marginHorizontal: 10}}>
                <Text style={{textAlign: 'right', fontSize: 20, marginBottom: 5, fontWeight: 'bold'}}>{participantData.participantId.username} </Text>
                <Text style={{textAlign: 'right'}}>Rp. {ConvertToIDR(participantData.transactionId.total)} ,-</Text>
            </View>
            <Image style={styles.ParticipantPic} source={{uri: participantData.participantId.image_url}}/>
        </View>
    )
}

const styles = StyleSheet.create({
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