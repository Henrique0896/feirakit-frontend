import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, useTheme, View } from "native-base";
import { Image } from "react-native";

export function CustomDrawer(props) {
  const { colors } = useTheme();
  return (
    <View flex={1}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: colors.blue[500],
          paddingTop: 60,
        }}
      >
        <Image
          source={require("../assets/user.png")}
          style={{
            height: 70,
            width: 70,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        />
        <Text
          style={{
            color: colors.gray[200],
            fontSize: 18,
            fontFamily: "Montserrat_700Bold",
            marginHorizontal: 10,
            paddingBottom: 10,
          }}
        >
          Nome Do Usuário
        </Text>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Text>FeriraKit</Text>
    </View>
  );
}
