import AsyncStorage from "@react-native-async-storage/async-storage";
export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
      dispatch({
        type: "LOGIN",
        payload: token,
      });
    }
  };
};

export const Login = (user) => {
  return async (dispatch) => {
    let token = user.id;
    await AsyncStorage.setItem("token", token);
    dispatch({
      type: "LOGIN",
      payload: token,
    });
  };
};

export const Logout = () => {
  return async (dispatch) => {
    await AsyncStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };
};
