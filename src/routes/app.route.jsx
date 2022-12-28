import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//screens
import { Home } from "../screens/Home";
import { Description } from "../screens/Description";
import { CustomDrawer } from "../components/CustomDrawer";
import { ShopCart } from "../screens/ShopCart";
import { MyProducts } from "../screens/MyProducts";
import { Settings } from "../screens/Settings";
import { Sobre } from "../screens/Sobre";
//icons
import { Ionicons } from "@expo/vector-icons";
//hooks
import { useTheme } from "native-base";

const { Navigator, Screen } = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function HomeDrawer() {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerActiveBackgroundColor: colors.blue[500],
        drawerActiveTintColor: colors.gray[200],
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Montserrat_500Medium",
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="Início"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Meu Carrinho"
        component={ShopCart}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Meus Produtos"
        component={MyProducts}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="basket-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Configurações"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sobre"
        component={Sobre}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={25} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homeStack" component={HomeDrawer} />
      <Screen name="description" component={Description} />
    </Navigator>
  );
}
