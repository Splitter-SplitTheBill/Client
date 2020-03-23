import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import peopleMoney from '../assets/images/peopleMoney.png'

export default function HomeScreen ({navigation}) {
    return (
        <View style={styles.container}>
          <View style={styles.background}>
            <View>
              <Text style={styles.title}>Splitter</Text>
              <Text style={styles.desc}>Split The Bill</Text>
            </View>
            <Image source={peopleMoney} style={styles.image}/>
          </View>
          <View style={styles.box}>
            <ScrollView>
              <View style={styles.horBox}>
                <TouchableOpacity style={styles.boxes}>
                  <Text>Recent Transaction</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes} onPress={() => navigation.navigate('HistoryScreen')}>
                  <Text>History</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} >
                    <Text>Add Bill</Text>
                </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
    )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    background: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: '#6597a0',
      fontSize: 30,
      marginLeft: 20
    }, 
    desc: {
      color: '#6597a0',
      fontSize: 20,
      marginLeft: 15,
      fontStyle: 'italic'
    },
    image: {
      width: height * 0.4,
      height: height * 0.4, 
      // width: 'auto',
      marginTop: 'auto'
    },
    box: {
      backgroundColor: '#6597a0',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      shadowRadius: 4,
      elevation: 2,
      height: height * 0.55
    },
    horBox: {
      flexDirection: 'row'
    },
    boxes: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      shadowRadius: 2,
      shadowColor: 'white',
      elevation: 2,
      margin: 8,
      opacity: 0.8,
      height: height * 0.3,
      width: width * 0.4
    },
    button: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      shadowRadius: 2,
      shadowColor: 'white',
      elevation: 2,
      margin: 8,
      opacity: 0.8,
      height: height * 0.17,
      width: width * 0.85
    }
  });
