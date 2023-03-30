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
            FeiraKit é um aplicativo destinado a vendas de produtos de feira, com intenção de facilitar a vida dos produtores e clientes que venham a desfrutar do aplicativo. No nosso aplicativo você  poderá vender produtos como verduras, frutas, legumes entre outros produtos que são comercializados nas tradicionais feiras do país, e também vai poder comprar esses produtos dentro do aplicativo, onde irá negociar a forma de pagamento e de entrega direto com o próprio vendedor.
            </Text>
      </VStack>
    </VStack>
  );
}
