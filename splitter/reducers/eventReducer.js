const initialState = {
    friendInEvent: [],
    allEvents: [],
    paymentSelection: [],
    eventName: '',
    transactionItems: [],
    billPicture: '',
    participants: [],
    newEvent: null,
    newEventTransactions: [],
    mockUserData: null

    // {
    //     userId,
    //     items
    // }
}

const eventReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'AddFriendToEvent':
            return {
                ...state, friendInEvent: state.friendInEvent = [...state.friendInEvent, action.payload.friendData]
            }
        case 'RemoveFriendToEvent':
            let newFriendInEvent = state.friendInEvent.filter(friend => friend._id !== action.payload.friendData._id)
            return {
                ...state, friendInEvent: state.friendInEvent = newFriendInEvent
            }
        case 'showAllEvents':
            const events = action.payload.events
            const user = action.payload.user
            const userEvents = events.filter(event => event.createdUserId._id == user)
            return { ...state, allEvents: userEvents }
        case 'AddPaymentMethod':
            return {
                ...state, paymentSelection: state.paymentSelection = [...state.paymentSelection, action.payload.paymentDetails]
            }
        case 'RemovePaymentMethod':
            let newpaymentSelection = state.paymentSelection.filter(method => method._id !== action.payload.paymentDetails._id)
            return {
                ...state, paymentSelection: state.paymentSelection = newpaymentSelection
            }
        case 'SetEventName':
            return {
                ...state, eventName: state.eventName = action.payload.eventName
            }
        case 'FetchTransactionItems':
            return {
                ...state, transactionItems: state.transactionItems = action.payload.transactionList,
                billPicture: state.billPicture = action.payload.billPic
            }
        case 'ResetTransactionItems':
            return {
                ...state, transactionItems: state.transactionItems = []
            }
        case 'AssignItemToUser':
            let newTransactionList = JSON.parse(JSON.stringify(state.transactionItems))
            newTransactionList[action.payload.index] = action.payload.item
            return {
                ...state, transactionItems: state.transactionItems = newTransactionList
            }
        case 'ChangeItemName':
            let newTransactionListName = JSON.parse(JSON.stringify(state.transactionItems))
            newTransactionListName[action.payload.index].name = action.payload.newName
            return {
                ...state, transactionItems: state.transactionItems = newTransactionListName
            }
        case 'ChangeItemPrice':
            let newTransactionListPrice = JSON.parse(JSON.stringify(state.transactionItems))
            newTransactionListPrice[action.payload.index].price = action.payload.newPrice
            return {
                ...state, transactionItems: state.transactionItems = newTransactionListPrice
            }
        case 'SetParticipantsId':
            let participantList = []
            let currentInEvent = JSON.parse(JSON.stringify(state.friendInEvent))
            currentInEvent.forEach(friend => {
                participantList.push({userId: friend._id, items: []})
            })
            return {
                ...state, participants: state.participants = participantList
            }
        case 'setParticipantsWithItems': 
            let participantsData = JSON.parse(JSON.stringify(state.participants))
            let transactionItemsData = JSON.parse(JSON.stringify(state.transactionItems))
            // console.log(participantsData[2])
            // for (let i = 0; i < participantsData.length; i++) {
            //     for (let j = 0; j < transactionItemsData.length; j++) {
            //         if (participantsData[i].id === transactionItemsData[j].userId) {
            //             console.log(transactionItemsData[j], 'INI J')
            //             participantsData[i].items.push(transactionItemsData[j])
            //         }
            //     }
            // }
            participantsData.forEach((participant, participantIndex) => {
                transactionItemsData.forEach(transactionItem => {
                    if(transactionItem.userId == participant.userId) {
                        participant.items.push({name: transactionItem.name, price: transactionItem.price})
                    }
                })
            })
            return {
                ...state, participants: state.participants = participantsData
            }
        case 'submitEvent':
            return {
                ...state, newEvent: state.newEvent = action.payload.newEvent,
                newEventTransactions: state.newEventTransactions = action.payload.transactions
            }
        case 'userMockFetch':
            return {
                ...state, mockUserData: state.mockUserData = action.payload.mockUserData
            }
        default:
            return state
    }
}

export default eventReducer