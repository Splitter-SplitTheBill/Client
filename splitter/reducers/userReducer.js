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
      console.log(action.payload.profile, "<<<reducr tucyy");
      const profile = action.payload.profile;
      return { ...state, UserLogin: profile };
    default:
      return state;
  }
};

export default userReducer;
