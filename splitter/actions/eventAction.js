import axios from 'axios'
import eventReducer from '../reducers/eventReducer'
const baseUrl = 'http://192.168.1.5:3000'

const AddFriendToEvent = (friendData) => {
    return {
        type: 'AddFriendToEvent',
        payload: {
            friendData
        }
    }
}

const RemoveFriendToEvent = (friendData) => {
    return {
        type: 'RemoveFriendToEvent',
        payload: {
            friendData
        }
    }
}

const SetParticipantsId = () => {
    return {
        type: 'SetParticipantsId'
    }
}

const AddPaymentMethod = (paymentDetails) => {
    return {
        type: 'AddPaymentMethod',
        payload: {
            paymentDetails
        }
    }
}

const RemovePaymentMethod = (paymentDetails) => {
    return {
        type: 'RemovePaymentMethod',
        payload: {
            paymentDetails
        }
    }
}

const SetEventName = (eventName) => {
    return {
        type: 'SetEventName',
        payload: {
            eventName
        }
    }
}

const FetchTransactionItems = (photo) => {
    return (dispatch, getState) => {
        const data = new FormData()
        data.append('photo', {uri: photo.uri, name: 'test.jpg', type: 'image/jpeg' })
        fetch(baseUrl + '/events/ocr', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then(res => res.json())
          .then(
            (result) => {
            // console.log(result, "DATA YEUUUUUUH")
              if    (result.transactions) {
                dispatch({
                    type: 'FetchTransactionItems',
                    payload: {
                      transactionList: result.transactions,
                      billPic: result.photo
                    }
                })
              } else {
                dispatch({
                    type: 'FetchTransactionItems',
                    payload: {
                      transactionList: ['try again'],
                      billPic: result.photo
                    }
                })
              }
            },
            (error) => {
              console.log(error)
            }
          )
    }
}

const FetchTransactionItemsAgain = (photoUrl) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'ResetTransactionItems'
        })
        const data = new FormData()
        data.append('photo', photoUrl)
        fetch(baseUrl + '/events/ocr', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
        .then(res => res.json())
          .then(
            (result) => {
              if (result.transactions) {
                console.log(result.transactions, 'AGAAAAAAin')
                dispatch({
                    type: 'FetchTransactionItems',
                    payload: {
                      transactionList: result.transactions,
                      billPic: result.photo
                    }
                })
              } else {
                dispatch({
                    type: 'FetchTransactionItems',
                    payload: {
                      transactionList: ['try again'],
                      billPic: result.photo
                    }
                })
              }
            },
            (error) => {
              console.log(error)
            }
          )
    }
}

const AssignItemToUser = (item, index) => {
    return {
        type: 'AssignItemToUser',
        payload: {
            item,
            index
        }
    }
}

const ChangeItemName = (newName, index) => {
    return {
        type: 'ChangeItemName',
        payload: {
            newName,
            index
        }
    }
}

const ChangeItemPrice = (newPrice, index) => {
    return {
        type: 'ChangeItemPrice',
        payload: {
            newPrice,
            index
        }
    }
}

const showAllEvents = (userId) => {
    return (dispatch) => {
        axios.get(`http://localhost:3000/events`)
          .then(result => {
            dispatch(allEvents({events: result.data.events, user: userId}))
          })
          .catch(err => {
            console.log(err, '< error showAllEvents')
          })
      }
}

const allEvents = (events) => ({
    type: 'showAllEvents',
    payload: events
  })
  
const setParticipantsWithItems = () => {
    console.log('MASUK SET PARTICIPANT ITEMS')
    return {
        type: 'setParticipantsWithItems'
    }
}

const submitEvent = (createdUserId) => {
    return (dispatch, getState) => {
        console.log(getState().eventReducer.participants[0].items, '<<<<<<<<<<<<<')
        fetch(baseUrl + '/events', {
            method: 'POST',
            body: JSON.stringify({
                name: getState().eventReducer.eventName,
                photo: getState().eventReducer.billPicture,
                accounts: getState().eventReducer.paymentSelection,
                createdUserId,
                participants: getState().eventReducer.participants
            }),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
          .then(
            (result) => {
              dispatch({
                  type: 'submitEvent',
                  payload: {
                    newEvent: result.event,
                    transactions: result.transactions
                  }
              })
            },
            (error) => {
              console.log(error)
            }
          )
    }
}

// JANGAN LUPA DIHAPUS
const userMockFetch = () => {
    return (dispatch, getState) => {
        fetch(baseUrl + '/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: 'okka21',
                password: '1234567'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
          .then(
            (result) => {
              dispatch({
                  type: 'userMockFetch',
                  payload: {
                    mockUserData: result
                  }
              })
            },
            (error) => {
              console.log(error)
            }
          )
    }
}



export {
    setParticipantsWithItems,
    submitEvent,
    AddFriendToEvent,
    RemoveFriendToEvent,
    showAllEvents,
    AddPaymentMethod,
    RemovePaymentMethod,
    SetEventName,
    FetchTransactionItems,
    AssignItemToUser,
    ChangeItemName,
    ChangeItemPrice,
    SetParticipantsId,
    FetchTransactionItemsAgain,
    userMockFetch
}