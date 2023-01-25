import React from "react";
import { VStack, Text, Center, useTheme } from "native-base";
import { ButtonBack } from "../components/ButtonBack";
import { LogoFeira } from "../components/LogoFeira";

export function Sobre() {
    const { colors } = useTheme();

  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <LogoFeira />
      <VStack borderBottomWidth={1} borderBottomColor={colors.gray[400]}pb={1}>
          <Text fontSize={20} mt={4} ml={4} color={colors.gray[500]}>
            Versão
            </Text>
            <Text fontSize={17} ml={4} color={colors.gray[400]}mb={2}>
            1.0.0
            </Text>
      </VStack>
      <VStack borderBottomWidth={1} borderBottomColor={colors.gray[400]}pb={1}>
          <Text fontSize={20} mt={4} ml={4} color={colors.gray[500]}>
            Contato
            </Text>
            <Text fontSize={17} ml={4} color={colors.gray[400]}mb={2}>
            +55 38 8853-6753
            </Text>
      </VStack>
      <VStack borderBottomWidth={1} borderBottomColor={colors.gray[400]}pb={1}>
          <Text fontSize={20} mt={4} ml={4} color={colors.gray[500]}>
            Descrição do projeto
            </Text>
            <Text fontSize={17} ml={4} color={colors.gray[400]}mb={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores laborum animi, repellendus quidem doloremque nisi fugiat qui, totam tenetur deleniti assumenda vero nulla necessitatibus, expedita enim quam odio officiis ullam.
            </Text>
      </VStack>
    </VStack>
  );
}
