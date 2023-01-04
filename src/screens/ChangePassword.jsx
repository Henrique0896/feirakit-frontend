import React from "react";
import { VStack, Text, Input, useTheme, Icon, Button } from "native-base";
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
export function ChangePassword() {
  const { colors } = useTheme();

  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <Text
        fontFamily={"Montserrat_400Regular"}
        alignSelf="flex-start"
        ml={4}
        color={colors.gray[900]}
        fontSize={20}
        mt={10}
      >
        Alterar Senha
      </Text>
      <Input
        mt={5}
        width={334}
        height={54}
        bgColor={colors.gray[100]}
        w="90%"
        color={colors.blue[900]}
        alignSelf="center"
        leftElement={
          <Icon
            color={colors.blue[900]}
            as={<MaterialIcons name="lock" />}
            size={6}
            ml={2}
          />
        }
        placeholder="Nova Senha"
        fontFamily={"Montserrat_400Regular"}
        placeholderTextColor={colors.blue[900]}
        fontSize={14}
        borderRadius={8}
        mr={4}
      />
      <Input
        mt={5}
        width={334}
        height={54}
        bgColor={colors.gray[100]}
        w="90%"
        color={colors.blue[900]}
        alignSelf="center"
        leftElement={
          <Icon
            color={colors.blue[900]}
            as={<MaterialIcons name="lock" />}
            size={6}
            ml={2}
          />
        }
        placeholder="Confirmar Nova Senha"
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
        <Text
          color={colors.gray[200]}
          fontFamily={"Montserrat_400Regular"}
          fontSize={15}
        >
          Confirmar
        </Text>
      </Button>
    </VStack>
  );
}
