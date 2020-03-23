import axios from 'axios'

export const ALLFRIENDS = (id) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/users/5e787cbff1349c203efdf2fe`,
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4N2NiZmYxMzQ5YzIwM2VmZGYyZmUiLCJlbWFpbCI6InRlc3Rlc0BtYWlsLmNvbSIsImlhdCI6MTU4NDk1NTEwOH0.bB6t_mcyZTV1RCuzEVP_dRpmrlofmWsgyJ_vd4sbmro'
       }
    })
      .then(result => {
        console.log(result.data.friendList)
        dispatch(allfriends(result.data.friendList))
      })
      .catch(err => {
        console.log(err.response, '< error')
      })
  }
}

const allfriends = (friends) => ({
  type: 'ALLFRIENDS',
  payload: {
    friends
  }
})


export const DELETEFRIEND = (friendId) => {
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: `http://localhost:3000/users/5e787cbff1349c203efdf2fe/friends/${friendId}`,
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4N2NiZmYxMzQ5YzIwM2VmZGYyZmUiLCJlbWFpbCI6InRlc3Rlc0BtYWlsLmNvbSIsImlhdCI6MTU4NDk1NTEwOH0.bB6t_mcyZTV1RCuzEVP_dRpmrlofmWsgyJ_vd4sbmro'
       }
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


export const ADDFRIEND = (friendId) => {
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: `http://localhost:3000/users/5e787cbff1349c203efdf2fe/friends`,
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4N2NiZmYxMzQ5YzIwM2VmZGYyZmUiLCJlbWFpbCI6InRlc3Rlc0BtYWlsLmNvbSIsImlhdCI6MTU4NDk1NTEwOH0.bB6t_mcyZTV1RCuzEVP_dRpmrlofmWsgyJ_vd4sbmro'
      },
      data: {
        friendId
      }
    })
      .then(result => {
        console.log(result.data.userId, '< add friend action')
        axios({
          method: 'GET',
          url: `http://localhost:3000/users/${result.data.userId}`,
          headers: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4N2NiZmYxMzQ5YzIwM2VmZGYyZmUiLCJlbWFpbCI6InRlc3Rlc0BtYWlsLmNvbSIsImlhdCI6MTU4NDk1NTEwOH0.bB6t_mcyZTV1RCuzEVP_dRpmrlofmWsgyJ_vd4sbmro'
          }
        })
          .then(res => {
            console.log(res.data, '< friend')
            dispatch(added(res.data))
          })
          .catch(err => {
            console.log(err.response, '< error find one')
          })
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