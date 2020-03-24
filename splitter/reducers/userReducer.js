const initialState = {
  UserLogin: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERLOGIN":
      console.log(action.payload.user, "<<<reducr tucyy");
      const user = action.payload.user;
      return { ...state, UserLogin: user };

    default:
      return state;
  }
};

export default userReducer;
