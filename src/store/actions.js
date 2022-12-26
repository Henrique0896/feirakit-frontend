import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem("token");
    let user=JSON.parse(await AsyncStorage.getItem("user"));
    if (token !== null) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    }
  };
};

export const Login = (user) => {
  return async (dispatch) => {
    let token = user.id;
     
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user",JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: user,
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
