import React from "react";
import {
  Button,
  Text,
  VStack,
  Icon,
  Input,
  useTheme,
  Radio,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { useState } from "react";
export function Register() {
  const [value, setValue] = useState("");
  const { colors } = useTheme();
  return (
    <VStack w="full" alignItems="center">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width:"100%",paddingBottom:100}}>
        <ButtonBack />
        <Text alignSelf="flex-start" ml={4}>
          Informações da Conta
        </Text>
        <Input
          mt={4}
          width={334}
          height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
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
          leftElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="lock" />}
              size={6}
              ml={2}
            />
          }
          rightElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="visibility-off" />}
              size={6}
              marginRight={2}
            />
          }
          placeholder="Senha"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          borderRadius={8}
          mr={4}
        />
        <Text alignSelf="flex-start" ml={4} mt={4}>
          Dados pessoais
        </Text>
        <Input
          mt={4}
          width={334}
          height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          leftElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="person" />}
              size={6}
              ml={2}
            />
          }
          placeholder="Nome"
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
          leftElement={<Icon color={colors.blue[900]} size={6} ml={2} />}
          placeholder="Sobrenome"
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
          leftElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="badge" />}
              size={6}
              ml={2}
            />
          }
          placeholder="CPF"
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
          leftElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="calendar-today" />}
              size={6}
              ml={2}
            />
          }
          placeholder="Data de nascimento"
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
          leftElement={
            <Icon
              color={colors.blue[900]}
              as={<MaterialIcons name="call" />}
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
        <Text alignSelf="flex-start" ml={4} mb={4} mt={4}>
          Sexo
        </Text>
        <Radio.Group
          color={colors.blue[600]}
          name="generogroup"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        >
          <HStack>
            <Radio _text={{color:colors.blue[600]}} value="Masculino" my="1" style={{paddingHorizontal:20}}>
              Masculino
            </Radio>
            <Radio _text={{color:colors.blue[600]}} value="Feminino" my="1">
              Feminino
            </Radio>
          </HStack>
        </Radio.Group>
        <Text alignSelf="flex-start" ml={4} mt={4}>
          Endereço
        </Text>
        <Input
          mt={4}
          width={334}
          height={54}
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
          height={42}
          mt={4}
          borderRadius={15}
        >
          Cadastar
        </Button>
      </ScrollView>
    </VStack>
  );
}
