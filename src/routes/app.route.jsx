import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../screens/Home";
import { Description } from "../screens/Description";
import { CustomDrawer} from "../components/CustomDrawer"
const {Navigator ,Screen } = createNativeStackNavigator();


const Drawer = createDrawerNavigator();

function HomeDrawer(){
    return(
        <Drawer.Navigator drawerContent={ props=><CustomDrawer {...props}/>}  screenOptions={{ headerShown: false,drawerPosition: "right"}}>
            <Drawer.Screen name='HOME' component={Home}/>
        </Drawer.Navigator>
    )
}

export function AppRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={HomeDrawer} />
            <Screen name="description" component={Description}  />
        </Navigator>
    )
}