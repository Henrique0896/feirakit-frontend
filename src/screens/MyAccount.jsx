import React from "react";
import { VStack, useTheme, Text, Button, Input, Icon } from "native-base";
import { StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function MyAccount() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <ScrollView>
      <VStack flex={1} w="full">
        <ButtonBack />
        <TouchableOpacity>
          <Image
            style={styles.userImage}
            source={require("../assets/user.png")}
          />
        </TouchableOpacity>
        <Text
          fontFamily={"Montserrat_400Regular"}
          mt={5}
          fontSize={25}
          alignSelf="center"
        >
          Minha Conta
        </Text>
        <Text
          style={styles.txt}
          alignSelf="flex-start"
          ml={4}
          mt={5}
          fontSize={20}
        >
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
              as={<MaterialIcons name="person" />}
              size={6}
              ml={2}
            />
          }
          placeholder="Nome Completo"
          style={styles.txt}
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
              as={<MaterialIcons name="email" />}
              size={6}
              ml={2}
            />
          }
          placeholder="E-mail"
          style={styles.txt}
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
              as={<MaterialIcons name="call" />}
              size={6}
              ml={2}
            />
          }
          placeholder="Telefone"
          style={styles.txt}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          borderRadius={8}
          mr={4}
        />
        <Text
          style={styles.txt}
          alignSelf="flex-start"
          ml={4}
          mt={5}
          fontSize={20}
        >
          Alterar endereço
        </Text>
        <Input
          mt={4}
          width={334}
          height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          placeholder="CEP"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          alignSelf="center"
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
          placeholder="Rua"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          alignSelf="center"
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
          placeholder="Numero"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          alignSelf="center"
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
          placeholder="Complemento (opicional)"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          alignSelf="center"
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
          placeholder="Bairro"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          alignSelf="center"
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
          placeholder="Cidade"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[900]}
          fontSize={14}
          alignSelf="center"
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
          alignSelf="center"
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
          <Text style={styles.txt} color={colors.gray[200]}>
            Confirmar
          </Text>
        </Button>
        <Button
          bgColor={colors.blue[700]}
          _pressed={{ bgColor: colors.blue[700] }}
          width={334}
          height={54}
          mt={4}
          w="90%"
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          alignItems="center"
          onPress={() => navigation.navigate('ChangePassword') }
        >
          <Text style={styles.txt} color={colors.gray[200]}>
            Alterar Senha
          </Text>
        </Button>
        <Button
          bgColor={colors.purple[500]}
          _pressed={{ bgColor: colors.purple[700] }}
          width={334}
          height={54}
          mt={4}
          margin={10}
          w="90%"
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          alignItems="center"
        >
          <Text style={styles.txt} color={colors.gray[200]}>
            Excluir Conta
          </Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  userImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  txt: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 15,
  },
});
