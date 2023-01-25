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
        authToken: action.payload.id,
        userData:action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        authToken: null,
      };
    default:
      return state;
  }
};
