import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function LoginRoutes() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="SignIn" component={Login} />
        <Screen name="Register" component={Register} />
      </Navigator>
    );
  }