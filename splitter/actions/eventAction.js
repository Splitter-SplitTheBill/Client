import axios from 'axios'

const AddFriendToEvent = (friendId) => {
    return {
        type: 'AddFriendToEvent',
        payload: {
            friendId
        }
    }
}

const RemoveFriendToEvent = (friendId) => {
    return {
        type: 'RemoveFriendToEvent',
        payload: {
            friendId
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

export {
    AddFriendToEvent,
    RemoveFriendToEvent,
    showAllEvents
}