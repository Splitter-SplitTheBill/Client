const initialState = {
  UserLogin: [],
  EditProfile: [],
  token: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERLOGIN":
      console.log(action.payload.user, "<<<reducr tucyy");
      const user = action.payload.user;
      return { ...state, UserLogin: user, token: user.token };
    case "EDITPROFILE":
      // console.log(action.payload.updatedUserData, "<<<reducr tucyy");
      const profile = action.payload.updatedUserData;
      profile.token = state.token
      console.log(profile, '<<<<<<<<<<<<==========')
      return { ...state, UserLogin: state.UserLogin = action.payload.updatedUserData };
    default:
      return state;
  }
};

export default userReducer;
