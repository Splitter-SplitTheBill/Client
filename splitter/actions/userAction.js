import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "http://192.168.43.186:3000";

const UserLogin = inputLogin => {
  return dispatch => {
    dispatch({
      type: "USERLOGIN",
      payload: { user: inputLogin }
    });
  };
};

const profileUpdate = input => {
  return dispatch => {
    dispatch({
      type: "EDITPROFILE",
      payload: { profile: input }
    });
  };
};

const changeStatus = (eventId, userId, token) => {
  return dispatch => {
    axios({
      method: "patch",
      url: `http://localhost:3000/transactions/${eventId}/${userId}`,
      headers: {
        token: token
      },
      data: {
        status: "settling"
      }
    })
      .then(response => {
        dispatch({
          type: "UNPAID",
          payload: { unpaid: response.data }
        });
      })
      .catch(err => {
        console.log(err, "<<<< ini error");
      });
  };
};

const getTransaction = (id, token) => {
  return dispatch => {
    axios({
      method: "GET",
      url: baseUrl + "/transactions/user/" + id,
      headers: {
        token: token
      }
    })
      .then(response => {
        dispatch({
          type: "TRANSACTION",
          payload: { transaction: response.data }
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export { UserLogin, profileUpdate, changeStatus, getTransaction };
