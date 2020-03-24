import axios from 'axios'

export const ALLFRIENDS = (id, token) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/users/${id}`,
      // url: `http://localhost:3000/users/5e787cbff1349c203efdf2fe`,
      headers: { token },
      // headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4N2NiZmYxMzQ5YzIwM2VmZGYyZmUiLCJlbWFpbCI6InRlc3Rlc0BtYWlsLmNvbSIsImlhdCI6MTU4NDk4OTI4NH0.GUEfRXNBUX5Tb6FEewKCnADbBR5-z-f-TPxGRWamq-k" },
    })
      .then(result => {
        console.log(result.data.friendList)
        dispatch(allfriends(result.data.friendList))
      })
      .catch(err => {
        console.log(err.response, '< error show all friends')
      })
  }
}

const allfriends = (friends) => ({
  type: 'ALLFRIENDS',
  payload: {
    friends
  }
})


export const DELETEFRIEND = (userId, friendId, token) => {
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: `http://localhost:3000/users/${userId}/friends/${friendId}`,
      headers: { token }
    })
      .then(result => {
        dispatch(deleted(result.data.userId))
      })
      .catch(err => {
        console.log(err.response, '< error delete friend action')
      })
  }
}

const deleted = (friend) => ({
  type: 'DELETEFRIEND',
  payload: {
    friend
  }
})


export const ADDFRIEND = (id, friendId, token) => {
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: `http://localhost:3000/users/${id}/friends`,
      headers: { token },
      data: {
        friendId
      }
    })
      .then(result => {
        console.log(result.data.userId, '< add friend action')
        axios({
          method: 'GET',
          url: `http://localhost:3000/users/${result.data.userId}`,
          headers: { token }
        })
      })
      .then(res => {
        console.log(res.data, '< friend')
        dispatch(added(res.data))
      })
      .catch(err => {
        console.log(err.response, '< error add friend action')
      })
  }
}


const added = (friend) => ({
  type: 'ADDFRIEND',
  payload: {
    userId: friend
  }
})