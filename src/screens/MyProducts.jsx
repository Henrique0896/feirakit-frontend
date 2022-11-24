import React from "react";
import { VStack, Center, Text } from "native-base";
import { Header } from "../components/Header";
import { Back } from "../components/Back";
export function MyProducts() {
  return (
    <VStack flex={1} w="full" >
    <Back/>
      <Center mt='1/2'>
        <Text>Meus produtos</Text>
      </Center>
    </VStack>
  );
}
