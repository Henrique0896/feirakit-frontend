import React, { useState,useEffect } from "react";
import {
  VStack,
  HStack,
  Icon,
  Input,
  useTheme,
  Heading,
  FlatList,
  Center,
  Pressable,
} from "native-base";
import { TouchableOpacity, View } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
import { MyProductItem } from "../components/MyProductItem";
import { useNavigation } from "@react-navigation/native";
import apiFeiraKit from "../services/ApiFeiraKit";

export function MyProducts() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  
  
  const navigation = useNavigation();
  function handleOpenAdd() {
    navigation.navigate("ProductForm", {});
  }

  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate("description", { productId, product, isInfo });
  }

  const getAllProducts=()=>{
    apiFeiraKit.get('/products')
    .then(({data})=>{
      setProducts(data)
    }) 
    .catch((error)=>{
      console.log(error)
    })

  }
   
  useEffect(getAllProducts,[])

  return (
    <VStack flex={1} w="full" px="2%">
      <ButtonBack />
      <HStack alignItems="center" w="96%" alignSelf="center">
        <Input
          bgColor={colors.gray[300]}
          borderWidth={2}
          borderColor={colors.gray[400]}
          h={10}
          flex={1}
          color={colors.blue[900]}
          leftElement={
            <Icon
              color={colors.blue[700]}
              as={<MaterialIcons name="search" />}
              size={6}
              ml={2}
            />
          }
          placeholder="Pesquisar"
          placeholderTextColor={colors.blue[700]}
          fontSize={14}
          borderRadius={8}
          mr={2}
          onChangeText={setSearch}
          style={{ fontFamily: "Montserrat_500Medium", fontWeight: "500" }}
        />

        <TouchableOpacity onPress={() => handleOpenAdd()}>
          <View>
            <MaterialIcons name="add" size={45} color={colors.blue[600]} />
          </View>
        </TouchableOpacity>
      </HStack>
      <Heading
        size="md"
        mt={2}
        color={colors.gray[500]}
        justifyItems="left"
        w="full"
        ml="2%"
        mb={4}
      >
        Meus produtos
      </Heading>

      <FlatList
      paddingX='2%'
        data={products} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        w="100%"
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => (
          <MyProductItem
            product={item}
            onPress={() => handleOpenDescription(item.id, item, true)}
          />
        )}
        ListEmptyComponent={() => (
          <Pressable
          bgColor={colors.gray[250]}
          onPress={()=>getAllProducts()}
          mr="4%"
          mb={4}
          w='98%'
          maxH={320}
          p={4}
          borderRadius={8}
          borderWidth={1}
          borderColor={colors.gray[500]}
          justifyContent="space-between"
        >
          <HStack justifyContent="space-between">
            <Center>
              <MaterialIcons color={colors.gray[300]} name="remove-shopping-cart" size={50}/>
            </Center>
            <VStack alignSelf="center" w="70%" ml={2}>
                <Heading
                  fontWeight="medium"
                  fontFamily="heading"
                  size="sm"
                  mb={1}
                  color={colors.gray[500]}
                >
                 nenhum produto encontrado
                </Heading>
            </VStack>
            <Center>
              <MaterialIcons color={colors.gray[300]} name="refresh" size={50}/>
            </Center>
          </HStack>
           </Pressable>
        )}
      />
    </VStack>
  );
}
