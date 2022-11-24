import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../screens/Home";
import { Description } from "../screens/Description";
import { CustomDrawer} from "../components/CustomDrawer"
import { ShopCart } from "../screens/ShopCart";
import { MyProducts } from "../screens/MyProducts";
import { Settings } from "../screens/Settings";
const {Navigator ,Screen } = createNativeStackNavigator();


const Drawer = createDrawerNavigator();

function HomeDrawer(){
    return(
        <Drawer.Navigator drawerContent={ props=><CustomDrawer {...props}/>}  screenOptions={{ headerShown: false,drawerPosition: "right"}}>
            <Drawer.Screen name='Início' component={Home} />
            <Drawer.Screen name='Meu Carrinho' component={ShopCart}/>
            <Drawer.Screen name='Meus Produtos' component={MyProducts}/>
            <Drawer.Screen name='Configurações' component={Settings}/>
        </Drawer.Navigator>
    )
}

export function AppRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="homeStack" component={HomeDrawer} />
            <Screen name="description" component={Description}  />
        </Navigator>
    )
}