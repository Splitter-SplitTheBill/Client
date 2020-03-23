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

export {
    AddFriendToEvent,
    RemoveFriendToEvent
}