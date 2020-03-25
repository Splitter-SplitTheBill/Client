const initialState = {
  friends: []
}


const friendsReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'ALLFRIENDS':
      const listFriends = state.friends.concat(action.payload.friends)
      return { ...state, friends: listFriends }
    case 'DELETEFRIEND':
      const deleted = action.payload.friend
      // const deleteFriend = state.friends.filter(friend => friend.userId._id !== deleted)
      return {...state, friends: deleted}
    case 'ADDFRIEND':
      const addFriend = state.friends.concat(action.payload)
      return { ...state, friends: addFriend }
    default:
      return state
  }
}

export default friendsReducer