const initialState = {
    friendInEvent: [],
    allEvents: []
}

const eventReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'AddFriendToEvent':
            return {
                ...state, friendInEvent: state.friendInEvent = [...state.friendInEvent, action.payload.friendId]
            }
        case 'RemoveFriendToEvent':
            let newFriendInEvent = state.friendInEvent.filter(friend => friend !== action.payload.friendId)
            return {
                ...state, friendInEvent: state.friendInEvent = newFriendInEvent
            }
        case 'showAllEvents':
            const events = action.payload.events
            const user = action.payload.user
            const userEvents = events.filter(event => event.createdUserId._id == user)
            return { ...state, allEvents: userEvents }
        default:
            return state
    }
}

export default eventReducer