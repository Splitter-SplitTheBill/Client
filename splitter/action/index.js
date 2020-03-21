import axios from 'axios'

export const ALLFRIENDS = () => {
  return (dispatch) => {
    axios.get('http://localhost:3000/users/2')
      .then(result => {
        console.log(result.data)
        dispatch(friends(result.data.friends))
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

