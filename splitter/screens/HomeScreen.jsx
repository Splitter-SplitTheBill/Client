import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function HomeScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistoryScreen')}>
                <Text>History</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: 'rgb(101, 151, 160)',
      padding: 10,
      borderRadius: 10
    }
  });
