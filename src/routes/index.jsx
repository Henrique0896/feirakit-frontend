import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Login} from "../screens/Login";

import { AppRoutes } from "./app.route";

export function Routes(){
    const user=useSelector(state=>state.AuthReducers.authToken);
    return(
        <NavigationContainer>
           {user !== null && user !== '' ?
            <AppRoutes/>:
            <Login/>
           }
        </NavigationContainer>
    )
}