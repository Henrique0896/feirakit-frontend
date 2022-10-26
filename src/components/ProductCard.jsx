import React from 'react';
import { Box, Heading, HStack,Image,useTheme} from 'native-base';
import { TouchableOpacity } from 'react-native';
import {Feather,FontAwesome}from '@expo/vector-icons'

export function ProductCard({data}) {
 const {colors}=useTheme();
 function addFavorite(id){
  console.log(`adicionar ${id} aos favoritos`)
 }
 function removeFavorite(id){
  console.log(`remover ${id} aos favoritos`)
 }
  return (
    <Box 
      mr={4} mb={4}
      w={180} bgColor='white'
      p={4} borderRadius={8} 
      borderWidth={1} borderColor='primary.500' >

    <HStack  w='full' justifyContent='flex-end' mb={2}>  
     <TouchableOpacity onPressIn={()=>{
      if(data.favorite){
        removeFavorite(data.id)
        return
      }
      addFavorite(data.id)
      }}>
       {data.favorite ? 
        <FontAwesome name='heart' size={20} color={colors.primary[900]} />:
        <Feather name='heart' size={20}/>}
     </TouchableOpacity> 
    </HStack>
    <Image source={data.img} 
           style={{ width: 140, height: 90,alignSelf:'center',marginBottom:4}}
           resizeMode='cover' alt='imagem do produto a ser vendido'/>

    <Heading fontWeight='medium' size='md' mb={1}>{data.title}</Heading>
    <Heading fontWeight='normal' size='xs' mb={2} textAlign='left' color={'gray.400'}>{data.description}</Heading>
    <Heading fontWeight='medium' size='md' mb={1}>R$ {data.price.toFixed(2)}</Heading>
    </Box>
  );
}