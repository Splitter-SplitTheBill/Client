import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import ConvertToIDR from '../helpers/RpConverter'
import { Dropdown } from 'react-native-material-dropdown'
import { useSelector, useDispatch } from 'react-redux'
import { AssignItemToUser, ChangeItemName, ChangeItemPrice } from '../actions/eventAction'

export default function TransactionItems ({ itemDetails, indexNum }) {
    const [displayPrice, setDisplayPrice] = useState(null)
    const [price, setPrice] = useState(null)
    const friendsInEvent = useSelector(state => state.eventReducer.friendInEvent)
    const [dropDownList, setDropDownList] = useState([])
    const [itemName, setItemName] = useState(itemDetails.name)
    const dispatch = useDispatch()

    const changePrice = (newPrice) => {
        let NumberedPrice = Number(newPrice.split('.').join(''))
        setPrice(NumberedPrice)
        dispatch(ChangeItemPrice(NumberedPrice, indexNum))
    }

    const changeName = (newItemName) => {
        setItemName(newItemName)
        dispatch(ChangeItemName(newItemName, indexNum))
    }

    const assignItem = (userId) => {
        dispatch(AssignItemToUser({
            name: itemName,
            price: price,
            userId: userId
        },
        indexNum
        ))
    }

    useEffect(() => {
        setPrice(itemDetails.price)
        let forDropdownList = []
        friendsInEvent.forEach(friend => {
            forDropdownList.push({
                value: friend
            })
        })
        setDropDownList(forDropdownList)
    }, [setDropDownList, friendsInEvent])

    useEffect(() => {
        if(price) {
            setDisplayPrice(ConvertToIDR(price))
        }
    },[price, setDisplayPrice])

    return (
        <View style={styles.transactionItemCard}>
            <View style={{height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                <TextInput style={{textAlign: 'center', maxWidth: '100%'}} multiline = {true} onChangeText={(newItemName) => changeName(newItemName)}>{itemName}</TextInput>
            </View>
            <View style={{height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Text>Rp.</Text>
                <TextInput keyboardType={'numeric'} onChangeText={(newPrice) => changePrice(newPrice)}>{displayPrice}</TextInput>
                <Text>,-</Text>
            </View>
            <View style={{height: '100%', width: '30%', alignItems: 'center', justifyContent: 'center'}}>
                <Dropdown
                    data={dropDownList}
                    containerStyle={{width: '100%', height: '100%', marginBottom: 25}}
                    onChangeText={(userId) => assignItem(userId)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    transactionItemCard: {
        height: 60,
        width: Dimensions.get('screen').width-35,
        flexDirection: 'row'
    }
})