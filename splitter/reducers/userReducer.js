const initialState = {
  UserLogin: [],
  EditProfile: [],
  token: null,
  dataUnpaid: [],
  dataTransaction: []
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
    case "UNPAID":
      const unpaid = action.payload.unpaid;
      return { ...state, dataUnpaid: unpaid };
    case "TRANSACTION":
      const transaction = action.payload.transaction;
      return { ...state, dataTransaction: transaction };
    default:
      return state;
  }
};

export default userReducer;
