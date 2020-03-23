import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AddFriendToEvent, RemoveFriendToEvent} from '../actions/eventAction'

export default function EventFriend ({profPic, id}) {
    const friendInEvent = useSelector(state => state.eventReducer.friendInEvent)
    const dispatch = useDispatch()

    const addFriend = () => {
        dispatch(AddFriendToEvent(id))
    }

    const RemoveFriend = () => {
        dispatch(RemoveFriendToEvent(id))
    }

    if (friendInEvent.includes(id)) {
        return (
            <TouchableOpacity onPress={() => RemoveFriend()} style={{margin: 20, alignItems: 'center'}}>
                <View style={styles.FriendPicOut}>
                    <View style={styles.FriendPicIn}>
                        <Image
                        style= {styles.FriendPic}
                        source={{uri: profPic}}
                        />
                    </View>
                </View>
                <View style={styles.FriendNameOut}>
                    <View style={styles.FriendNameIn}>
                    <Text>UserName</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={() => addFriend()} style={{margin: 20, alignItems: 'center'}}>
                <View style={styles.FriendPicOutNone}>
                    <View style={styles.FriendPicIn}>
                        <Image
                        style= {styles.FriendPic}
                        source={{uri: profPic}}
                        />
                    </View>
                </View>
                <View style={styles.FriendNameOutNone}>
                    <View style={styles.FriendNameIn}>
                        <Text>UserName</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    
}

const styles = StyleSheet.create({
    FriendNameOut: {
        height: 35,
        width: 90,
        backgroundColor: '#55efc4',
        translateY: -10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    FriendNameOutNone: {
        height: 35,
        width: 90,
        translateY: -10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    FriendNameIn: {
        height: '90%',
        width: '95%',
        backgroundColor: '#dfe6e9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    FriendPicOutNone: {
        borderRadius: 99999,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FriendPicOut: {
        borderRadius: 999,
        backgroundColor: '#55efc4',
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    FriendPicIn: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 99999,
        height: '90%',
        width: '90%'
    },
    FriendPic: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    }
})