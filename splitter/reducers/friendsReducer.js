const initialState = {
  friends: []
}


const friendsReducer = (state = initialState, action) => {
  console.log(state.friends, '< state')

  switch (action.type) {
    case 'ALLFRIENDS':
      console.log(action.payload.friends, '<<<action')
      const listFriends = state.friends.concat(action.payload.friends)
      return { ...state, friends: listFriends }
    case 'DELETEFRIEND':
      const deleted = action.payload.friend
      const deleteFriend = state.friends.filter(friend => friend.userId._id !== deleted)
      return {...state, friends: deleteFriend}
    case 'ADDFRIEND':
      console.log(action.payload, '< payload')
      const addFriend = state.friends.concat(action.payload)
      return { ...state, friends: addFriend }
    default:
      return state
  }
}

export default friendsReducer