const initialState = {
    friendInEvent: []
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
        default:
            return state
    }
}

export default eventReducer