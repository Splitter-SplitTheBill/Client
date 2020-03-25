<<<<<<< HEAD
import axios from 'axios'
// const baseUrl = "http://localhost:3000";
// const baseUrl = "http://192.168.1.5:3000";
const baseUrl = "http://192.168.43.186:3000";
=======
import axios from "axios";
>>>>>>> fixing display

export const ALLFRIENDS = (id, token) => {
  return dispatch => {
    axios({
<<<<<<< HEAD
      method: 'GET',
      url: `${baseUrl}/users/${id}`, 
      headers: { token },
=======
      method: "GET",
      url: `http://localhost:3000/users/${id}`,
      headers: { token }
>>>>>>> fixing display
    })
      .then(result => {
        dispatch(allfriends(result.data.friendList));
      })
      .catch(err => {
        console.log(err.response, "< error show all friends");
      });
  };
};

const allfriends = friends => ({
  type: "ALLFRIENDS",
  payload: {
    friends
  }
});

export const DELETEFRIEND = (userId, friendId, token) => {
  return dispatch => {
    axios({
<<<<<<< HEAD
      method: 'PATCH',
      url: `${baseUrl}/users/${userId}/friends/${friendId}`,
=======
      method: "PATCH",
      url: `http://localhost:3000/users/${userId}/friends/${friendId}`,
>>>>>>> fixing display
      headers: { token }
    })
      .then(result => {
        dispatch(deleted(result.data.userId));
      })
      .catch(err => {
        console.log(err.response, "< error delete friend action");
      });
  };
};

const deleted = friend => ({
  type: "DELETEFRIEND",
  payload: {
    friend
  }
});

<<<<<<< HEAD
export const ADDFRIEND = (id, friendId, token) => { 
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: `${baseUrl}/users/${id}/friends`,
=======
export const ADDFRIEND = (id, friendId, token) => {
  return dispatch => {
    axios({
      method: "PATCH",
      url: `http://localhost:3000/users/${id}/friends`,
>>>>>>> fixing display
      headers: { token },
      data: {
        friendId
      }
    })
      .then(result => {
        console.log(result.data.userId, "< add friend action");
        axios({
<<<<<<< HEAD
          method: 'GET',
          url: `${baseUrl}/users/${result.data.userId}`,
=======
          method: "GET",
          url: `http://localhost:3000/users/${result.data.userId}`,
>>>>>>> fixing display
          headers: { token }
        })
          .then(res => {
            dispatch(added(res.data));
          })
          .catch(err => {
            console.log(err.response, "< error add friend action findOne");
          });
      })
      .catch(err => {
        console.log(err.response, "< error add friend action");
      });
  };
};

const added = friend => ({
  type: "ADDFRIEND",
  payload: {
    userId: friend
  }
});
