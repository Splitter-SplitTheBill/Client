import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'

export default function ReceiptImageModal ({ triggerModal }) {
    const receiptImageUrl = useSelector(state => state.eventReducer.billPicture)
    return (
        <View style={styles.modalPage}>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => triggerModal()}>
                    <Text style={styles.crossIcon}>X</Text>
                </TouchableOpacity>
                <View style={styles.receiptImagePart}>
                    <Image style={styles.receiptImage} source={{uri: receiptImageUrl}} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalPage: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        backgroundColor: 'rgba(5, 1, 0, 0.7)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: '80%',
        width: '90%',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
    },
    closeModalButton: {
        width: '100%',
        height: '5%',
        alignItems: 'flex-end'
    },
    receiptImagePart: {
        height: '95%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    receiptImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
        overflow: 'hidden'
    },
    croosIcon: {
        height: 20,
        width: 20,
        borderRadius: 999,
        backgroundColor: 'grey'
    }
})