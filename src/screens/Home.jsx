import React, { useState } from 'react';
import { VStack,HStack,Heading,Box,useTheme,FlatList, Center, Text } from 'native-base';
import {TouchableOpacity} from 'react-native';
import {MaterialIcons,Feather}from '@expo/vector-icons'
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';


export function Home() {
  const {colors}=useTheme();
  const [order,setOrder]=useState(true)
  
  let products=[
      { 
        id:1,
        img:require("../assets/exemplo.jpeg"),
        title:"Tomate",
        description:"pequena descrição sobre oproduto",
        price:4.50,
        favorite:true
      },
      { 
        id:2,
        img:require("../assets/exemplo.jpeg"),
        title:"Alface",
        description:"pequena descrição sobre oproduto",
        price:2.50, 
        favorite:false
      },

      { 
        id:3,
        img:require("../assets/exemplo.jpeg"),
        title:"Repolho",
        description:"pequena descrição sobre oproduto",
        price:3.50, 
        favorite:false
      },

      { 
        id:4,
        img:require("../assets/exemplo.jpeg"),
        title:"Abóbora",
        description:"pequena descrição sobre oproduto",
        price:3.50, 
        favorite:true
      },
      { 
        id:5,
        img:require("../assets/exemplo.jpeg"),
        title:"cenoura",
        description:"pequena descrição sobre oproduto",
        price:3.50, 
        favorite:true
      },
      { 
        id:6,
        img:require("../assets/exemplo.jpeg"),
        title:"Kit frutas",
        description:"pequena descrição sobre oproduto",
        price:3.50, 
        favorite:false
      },
      { 
        id:7,
        img:require("../assets/exemplo.jpeg"),
        title:"Abóbora",
        description:"pequena descrição sobre oproduto",
        price:3.50, 
        favorite:false
      },

    ]


  return (
    <VStack flex={1} width='full' bg='gray.200'
            p={8} pt={0} alignItems='center'  
            px={4} pb={0}>
      <Header/>
     
      <HStack mt={2} alignItems="center" alignContent='center' justifyContent='space-between' w='full'>
        <Heading size='2xl' color='primary.600'>Produtos</Heading>
        <Box flexDirection='row' >
          <TouchableOpacity style={{ marginRight: 10 }} onPress={()=>setOrder(!order)}>
            <MaterialIcons name="unfold-more" size={40}  color={colors.primary[600]} />
          </TouchableOpacity>
          <TouchableOpacity disabled>
            <Feather name="filter" size={36} color={colors.primary[600]}/>
          </TouchableOpacity>
        </Box>
      </HStack>   
      <Heading size='sm' color='gray.600' justifyItems='left' w='full' mb={4}>Todos os produtos</Heading>
      <FlatList
        data={order ? products : products.reverse()}
        showsVerticalScrollIndicator={false}
        w='full'
        contentContainerStyle={{ paddingBottom: 100}}
        numColumns='2'
        
        keyExtractor={item=>item.id}
        renderItem={({item})=><ProductCard data={item}/>}
        ListEmptyComponent={() => (
          
          <Center alignContent='center' flex={1} h={400}>
            <Text color="gray.300" fontSize="4xl" textAlign="center">
              :({'\n'}
              Oops! Não há Produtos para mostrar.
            </Text>
          </Center>
        )}
      />
      
    </VStack>
  );
}