const initialState = {
  authToken: "63c895c81060e0d6ba422c19",
  userData: {
    "id": "63c895c81060e0d6ba422c19",
    "nome": "Geraldo",
    "email": "geraotavio@hotmail.com",
    "telefone": "33998785878",
    "endereco": "Santos Dumont, 30, Centro, Leme do Prado - MG,39655-000",
    "senha": "geraldo1230"
  },
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
