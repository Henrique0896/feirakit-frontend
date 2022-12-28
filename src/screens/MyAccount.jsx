import React from "react";
import { VStack, useTheme, Text, Button  } from "native-base";
import { StyleSheet, Image, View, TouchableOpacity,   } from "react-native"
import { ButtonBack } from "../components/ButtonBack";
export function MyAccount() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <TouchableOpacity>
        <Image
        style={styles.userImage}
        source={require('../assets/user.png')}
        />
    </TouchableOpacity>
    <Button
        bgColor={colors.blue[600]}
        _pressed={{ bgColor: colors.blue[700] }}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
        alignSelf="center"
        alignContent="center"
        alignItems="center"
      >
      Alterar E-mail</Button>
      <Button
        bgColor={colors.blue[600]}
        _pressed={{ bgColor: colors.blue[700] }}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
        alignSelf="center"
        alignContent="center"
        alignItems="center"
      >
      Alterar Senha</Button>
      <Button
        bgColor={colors.blue[600]}
        _pressed={{ bgColor: colors.blue[700] }}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
        alignSelf="center"
        alignContent="center"
        alignItems="center"
      >
      Alterar Dados Pessoais</Button>
      <Button
        bgColor={colors.blue[600]}
        _pressed={{ bgColor: colors.blue[700] }}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
        alignSelf="center"
        alignContent="center"
        alignItems="center"
      >
      Excluir Conta</Button>
    </VStack>




  )
}
const styles = StyleSheet.create({
  userImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'

  },


});


    
