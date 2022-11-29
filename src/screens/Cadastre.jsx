import React from 'react';
import { Button, Text,VStack, Icon, Input, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
export function Cadastre() {

    const { colors } = useTheme();
  return (
      <VStack w="full" alignItems="center">
          <ScrollView>
            <Image
            source={require("../assets/logo.png")}
            style={{ width: 187, height: 170}}
            resizeMode="contain"
                    />
            <Text alignSelf="flex-start" ml={4}>Informações da Conta</Text>
            <Input mt={4} width={334} height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              leftElement={
                <Icon color={colors.blue[900]} as={<MaterialIcons name="email"/>} size={6} ml={2} />
              }
              placeholder="E-mail"
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
            <Text alignSelf="flex-start" ml={4}>Dados pessoais</Text>
            <Input mt={4} width={334} height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              leftElement={
                <Icon color={colors.blue[900]} as={<MaterialIcons name="person"/>} size={6} ml={2} />
              }
              placeholder="Nome"
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
                <Icon color={colors.blue[900]} size={6} ml={2} />
              }
              placeholder="Sobrenome"
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
                <Icon color={colors.blue[900]} as={<MaterialIcons name="badge"/>} size={6} ml={2} />
              }
              placeholder="CPF"
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
                <Icon color={colors.blue[900]} as={<MaterialIcons name="calendar-today"/>} size={6} ml={2} />
              }
              placeholder="Data de nascimento"
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
                <Icon color={colors.blue[900]} as={<MaterialIcons name="call"/>} size={6} ml={2} />
              }
              placeholder="Telefone"
              fontFamily={"Montserrat_400Medium"}
              opacity={0.3}
              placeholderTextColor={colors.blue[900]}
              fontSize={14}
              borderRadius={8}
              mr={4}
              />
              <Text alignSelf="flex-start" ml={4}>Sexo</Text>
              <Text alignSelf="flex-start" color={colors.blue[600]} ml={4}>Masculino</Text>
              <Text alignSelf="flex-start" color={colors.blue[600]} ml={4}>Feminino</Text>
              <Text alignSelf="flex-start" ml={4}>Endereço</Text>
              <Input mt={4} width={334} height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              placeholder="* CEP"
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
              placeholder="* Rua"
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
              placeholder="* Numero"
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
              placeholder="* Complemento (opicional)"
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
              placeholder="* Bairro"
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
              placeholder="* Cidade"
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
                <Icon color={colors.blue[900]} as={<MaterialIcons name="arrow-drop-down"/>} size={6} ml={2} />
              }
              placeholder="Estado"
              fontFamily={"Montserrat_400Medium"}
              opacity={0.3}
              placeholderTextColor={colors.blue[900]}
              fontSize={14}
              borderRadius={8}
              mr={4}
              />
              <Button bgColor={colors.blue[600]} width={141} height={42} mt={4} w="90%" borderRadius={15}>Cadastar</Button>
          </ScrollView>
      </VStack>
    
  );
}
