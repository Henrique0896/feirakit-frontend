const initialState = {
  authToken: null,
  userData: {},
  anyData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        authToken: action.payload.email,//alterar para Id assim que a api for alterada
        userData:action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        authToken: null,
        userData: {},
      };
    default:
      return state;
  }
};
