const initialState = {
  friends: []
}


const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALLFRIENDS':
      const listFriends = state.friends.concat(action.payload.friends)
      return { ...state, friends: listFriends }
    // case 'DELETEFRIEND':
    //   const 
    //   return {...state, friends: listFriends}
    default:
      return state
  }
}

export default friendsReducer