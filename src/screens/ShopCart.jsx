import React from 'react';
import { VStack,Text,Center } from 'native-base';
import { Back } from '../components/Back';

export function ShopCart() {
  return (
    <VStack flex={1} w="full" >
        <Back/>
        <Center mt='1/2'>
           <Text>Carrinho de compras</Text>
        </Center>
    </VStack>
  );
}