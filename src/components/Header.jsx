import React, { useState } from "react";
import { VStack, HStack, Icon, Input, useTheme } from "native-base";
import { Image, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export function Header() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const Navigation=useNavigation()

  return (
    <VStack w="full" alignItems="center" pt={8}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 230, height: 70 }}
        resizeMode="contain"
      />
      <HStack mt={-1} alignItems="center">
        <Input
          bgColor={colors.gray[300]}
          h={10}
          color={colors.blue[900]}
          flex={1}
          leftElement={
            <Icon color={colors.blue[900]}  as={<MaterialIcons name="search" />} size={6} ml={2}  />
          }
          placeholder="Pesquisar"
          placeholderTextColor={colors.blue[700]}
          fontSize={14}
          borderRadius={8}
          mr={4}
          onChangeText={setSearch}
          style={{fontFamily:'Montserrat_500Medium',fontWeight:'500'}}
        />

        <TouchableOpacity onPress={()=>{
         Navigation.openDrawer();
        }}>
          <View>
            <MaterialIcons name="menu" size={45} color={colors.blue[600]} />
          </View>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
