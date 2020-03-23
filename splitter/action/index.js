import axios from 'axios'

export const ALLFRIENDS = () => {
  return (dispatch) => {
    axios.get('http://localhost:3000/users')
      .then(result => {
        dispatch(friends(result.data))
      })
      .catch(err => {
        console.log(err.response, '< error')
      })
  }
}

const friends = (friends) => ({
  type: 'ALLFRIENDS',
  payload: {
    friends
  }
})

