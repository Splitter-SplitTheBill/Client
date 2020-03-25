import React from 'react'
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native'

export default function ConfirmationModal ({ confirmationFunction }) {
    return (
        <View style={styles.backDrop}>
            <View style={styles.dialogBoxContainer}>
                <Image style={{
                    height: '35%',
                    width: '50%',
                    resizeMode: 'contain',
                    marginTop: 20
                }} source={require('../assets/forConfirmation.gif')} />
                <Text style={{fontSize: 20, fontFamily: 'ProximaNova-Bold'}}>You are about to Split The Bill</Text>
                <Text style={{textAlign: 'center', marginVertical: 4, fontFamily: 'ProximaNova-Bold'}}>Please note that you will not be able to change this event details </Text>
                <View style={styles.confirmationButtons}>
                    <TouchableOpacity style={{
                        backgroundColor: '#0b8457',
                        borderRadius: 10,
                        height: '80%',
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                    onPress={() => confirmationFunction(true)}
                    >
                        <Text style={{color: 'white', fontFamily: 'ProximaNova-Regular'}}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: '#900',
                        borderRadius: 10,
                        height: '80%',
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                    onPress={() => confirmationFunction(false)}
                    >
                        <Text style={{color: 'white',fontFamily: 'ProximaNova-Regular'}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backDrop: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'rgba(5, 1, 0, 0.7)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogBoxContainer: {
        height: '35%',
        width: '80%',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    confirmationButtons: {
        height: '20%',
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})