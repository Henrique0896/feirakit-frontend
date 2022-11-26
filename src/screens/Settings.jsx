import React from "react";
import { VStack, Center, Text } from "native-base";
import { Back } from "../components/Back";

export function Settings() {
  return (
    <VStack flex={1} w="full">
      <Back />
      <Center mt="1/2">
        <Text>Configurações</Text>
      </Center>
    </VStack>
  );
}
