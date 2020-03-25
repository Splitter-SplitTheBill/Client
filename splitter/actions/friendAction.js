import axios from 'axios'
// const baseUrl = "http://localhost:3000";
// const baseUrl = "http://192.168.1.5:3000";
const baseUrl = "http://192.168.43.186:3000";

export const ALLFRIENDS = (id, token) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${baseUrl}/users/${id}`, 
      headers: { token },
    })
      .then(result => {
        dispatch(allfriends(result.data.friendList))
      })
      .catch(err => {
        console.log(err, '< error show all friends')
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
      url: `${baseUrl}/users/${userId}/friends/${friendId}`,
      headers: { token }
    })
      .then(result => {
        dispatch(deleted(result.data.friendList))
      })
      .catch(err => {
        console.log(err, '< error delete friend action')
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
      url: `${baseUrl}/users/${id}/friends`,
      headers: { token },
      data: {
        friendId
      }
    })
      .then(result => {
        console.log(result.data._id, '< add friend action')
        axios({
          method: 'GET',
          url: `${baseUrl}/users/${friendId}`,
          headers: { token }
        })
        .then(res => {
          console.log(res, '< ini res')
          dispatch(added(res.data))
        })
        .catch(err => {
          console.log(err, '< error add friend action findOne')
        })
      })
      .catch(err => {
        console.log(err, '< error add friend action')
      })
  }
}


const added = (friend) => ({
  type: 'ADDFRIEND',
  payload: {
    userId: friend
  }
})