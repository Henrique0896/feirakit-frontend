import React from "react";
import { VStack, useTheme, Text, Button, Input, Icon  } from "native-base";
import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
export function MyAccount() {
  const { colors } = useTheme();

  return (
    <ScrollView>
      <VStack flex={1} w="full">
        <ButtonBack />
        <TouchableOpacity>
          <Image
          style={styles.userImage}
          source={require('../assets/user.png')}
          />
      </TouchableOpacity>
      <Text mt={5} fontSize={25} alignSelf="center">
        Minha Conta
      </Text>
      <Text fontFamily={"Montserrat_400Regular"}
      alignSelf="flex-start" ml={4} mt={4} fontSize={15}>
            Alterar dados
          </Text>
      <Input
            mt={4}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            alignSelf="center"
            leftElement={
              <Icon
                color={colors.blue[900]}
                as={<MaterialIcons name="email" />}
                size={6}
                ml={2}
              />
            }
            placeholder="E-mail"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
        />
        <Input
            mt={4}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            alignSelf="center"
            leftElement={
              <Icon
                color={colors.blue[900]}
                as={<MaterialIcons name="call"/>}
                size={6}
                ml={2}
              />
            }
            placeholder="Telefone"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
          <Text alignSelf="flex-start" ml={4} mt={4} fontSize={15}>
            Endereço
          </Text>
          <Input
            mt={4}
            width={334}
            height={54}
            alignSelf="center"
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            placeholder="* CEP"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
          <Input
            mt={4}
            width={334}
            height={54}
            alignSelf="center"
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            placeholder="* Rua"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
          <Input
            mt={4}
            width={334}
            height={54}
            alignSelf="center"
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            placeholder="* Numero"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
          <Input
            mt={4}
            width={334}
            height={54}
            alignSelf="center"
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            placeholder="* Complemento (opicional)"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
          <Input
            mt={4}
            width={334}
            height={54}
            alignSelf="center"
            bgColor={colors.gray[100]}
            w="90%"
            color={colors.blue[900]}
            placeholder="* Bairro"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={colors.blue[900]}
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
          <Input
          mt={4}
          width={334}
          height={54}
          alignSelf="center"
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          placeholder="* Cidade"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          borderRadius={8}
          mr={4}
        />
        <Input
          mt={4}
          width={334}
          height={54}
          alignSelf="center"
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          rightElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="arrow-drop-down" />}
              size={6}
              ml={2}
            />
          }
          placeholder="Estado"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          borderRadius={8}
          mr={4}
        />
        <Button
          bgColor={colors.blue[600]}
          _pressed={{ bgColor: colors.blue[700] }}
          width={334}
          height={54}
          mt={10}
          w="90%"
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          alignItems="center"
      
        >
        Confirmar</Button>
      
        <Button
          bgColor={colors.blue[600]}
          _pressed={{ bgColor: colors.blue[700] }}
          width={334}
          height={54}
          mt={5}
          w="90%"
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          alignItems="center"
      
        >
        Alterar Senha</Button>
        <Button
          bgColor={colors.purple[500]}
          _pressed={{ bgColor: colors.purple[700] }}
          width={334}
          height={54}
          mt={5}
          margin={10}
          w="90%"
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          alignItems="center"
        >
        Excluir Conta</Button>
      </VStack>
    </ScrollView>




  )
}
const styles = StyleSheet.create({
  userImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',


  },

});


    
