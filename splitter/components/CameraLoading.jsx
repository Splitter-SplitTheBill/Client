import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native'

export default function CameraLoading () {
    return (
        <View style={styles.loadingContainer}>
            <Image style={{height: 500, width: 500, resizeMode: 'contain'}} source={require('../assets/cameraLoadingSpinner.gif')} />
            <Text>Please wait a moment</Text>
            <Text>Saving Picture. . .</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute'
    }
})