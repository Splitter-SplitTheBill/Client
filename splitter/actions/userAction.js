import axios from "axios";

const baseUrl = "http://localhost:3000";

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

export { UserLogin, profileUpdate };
