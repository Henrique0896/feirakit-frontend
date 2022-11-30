import React, { useState } from "react";
import { VStack,HStack, Icon, Input,useTheme, Heading, FlatList } from "native-base";
import {TouchableOpacity, View} from "react-native"
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
import { MyProductItems} from "../components/MyProductItems";
import { useNavigation } from "@react-navigation/native";

export function MyProducts() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  let products = [
    {
      id: 1,
      img: require("../assets/exemplo.jpeg"),
      title: "Tomate ",
      description: "pequena descrição sobre oproduto",
      price: 4.5,
      inventory:12,
      expirationDate:"10/12/2023",
      unit:'kg',
      category:"2"
    },
    {
      id: 2,
      img: require("../assets/exemplo.jpeg"),
      title: "Alface",
      description: "pequena descrição sobre oproduto",
      price: 2.5,
      inventory:19,
      expirationDate:"01/07/2027",
      unit:'un',
      category:"3"
    },
  ];
  
  const navigation = useNavigation();
  function handleOpenAdd() {
    navigation.navigate("ProductForm",{});
  }

  function handleOpenDescription(productId,isInfo) {
    navigation.navigate("description", { productId,isInfo });
  }

  return (
    <VStack flex={1} w="full" px='2%'>
      <ButtonBack/>
      <HStack alignItems="center" w='96%' alignSelf='center'>
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

        <TouchableOpacity
            onPress={()=> handleOpenAdd()}
        >
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
        ml='2%'
        mb={4}
      >
        Meus produtos
      </Heading>
      
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} 
        w="100%"
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => (
          <MyProductItems
            product={item}
            onPress={() => handleOpenDescription(item.id,true)}
          />
        )}
        ListEmptyComponent={() => (
          <Center flex={1} h={400}>
            <MaterialIcons
              name="storefront"
              size={80}
              color={colors.gray[300]}
              mt
            />
            {"\n"}
            <Text color={colors.gray[300]} fontSize="4xl" textAlign="center">
              Não há Produtos para mostrar.
            </Text>
          </Center>
        )}
      /> 


    </VStack>
  );
}
