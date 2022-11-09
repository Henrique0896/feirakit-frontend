import React from 'react';
import { Button, Text,VStack, Icon, Input, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
export function Login() {

    const { colors } = useTheme();
  return (
    <VStack w="full" alignItems="center">
        <Image
        source={require("../assets/logo.png")}
        style={{ width: 187, height: 170}}
        resizeMode="contain"
      />
        <Text alignSelf="flex-start" color={colors.blue[600]} ml={4}>Fazer Login</Text>
        <Input mt={4} width={334} height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          leftElement={
            <Icon color={colors.blue[900]} as={<MaterialIcons name="person"/>} size={6} ml={2} />
          }
          placeholder="Digite seu e-mail ou CPF" 
          fontFamily={"Montserrat_400Medium"}
          opacity={0.3}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          borderRadius={8}
          mr={4}
        />
         <Input mt={4} width={334} height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          leftElement={
            <Icon color={colors.blue[900]} as={<MaterialIcons name="lock"/>} size={6} ml={2} />
          }
          rightElement={
            <Icon color={colors.blue[900]} as={<MaterialIcons name="visibility-off"/>} size={6} marginRight={2} />
          }
          placeholder="Senha"
          fontFamily={"Montserrat_400Medium"}
          opacity={0.4}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          borderRadius={8}
          mr={4}
        />
        <Button bgColor={colors.blue[600]} width={334} height={54} mt={4} w="90%" borderRadius={15}>Entrar</Button>
        <Button width={334} height={54} mt={4} w="90%" borderRadius={15}>Esqueci minha senha</Button>
        <Button bgColor={colors.gray[200]} _text={{color:colors.blue[600]}} width={334} height={54} mt={4} w="90%" borderRadius={15}>Cadastre-se</Button>
    </VStack>
  );
}
