import React, { useState } from 'react';
import { VStack,HStack,Icon,Input, useTheme, SearchIcon } from 'native-base';
import { Image,TouchableOpacity,View} from 'react-native';
import {MaterialIcons}from '@expo/vector-icons'

export function Header() {
  const {colors}=useTheme()
  const [search,setSearch]=useState('');
  console.log(search)
  return (
    <VStack  w='full' alignItems='center' pt={4}>
      <Image source={require('../assets/logo.png')} style={{ width: 250, height: 80 }} resizeMode='contain'/>
      <HStack mt={-1} alignItems="center" >
        <Input bgColor="gray.300" h={10}   
          color="primary.900" flex={1}
          leftElement={<Icon as={<MaterialIcons name="search" />} size={6} ml={2} />}
          placeholder='Pesquisar produto' placeholderTextColor='primary.800'
          fontSize={14} borderRadius={8} mr={4}
          onChangeText={setSearch}
        />
      
        <TouchableOpacity>
          <View>
            <MaterialIcons name="menu" size={40} color={colors.primary[600]} />
          </View>
        </TouchableOpacity>

      </HStack>
    </VStack>
  );
}