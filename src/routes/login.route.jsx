import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import {PasswordRecovery}from "../screens/PasswordRecovery"

const { Navigator, Screen } = createNativeStackNavigator();

export function LoginRoutes() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="SignIn" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="PasswordRecovery" component={PasswordRecovery} />
      </Navigator>
    );
  }