import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "http://192.168.43.186:3000";

const UserLogin = inputLogin => {
  return dispatch => {
    axios({
      method: "POST",
      url: baseUrl + "/users/login",
      data: {
        username: inputLogin.username,
        password: inputLogin.password
      }
    })
      .then(response => {
        dispatch({
          type: "USERLOGIN",
          payload: { user: response.data }
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export { UserLogin };
