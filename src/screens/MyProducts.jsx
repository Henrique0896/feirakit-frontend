import React, { useState, useCallback } from "react";
import {
  VStack,
  HStack,
  Icon,
  Input,
  useTheme,
  Heading,
  FlatList,
  Center,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
import { MyProductItem } from "../components/MyProductItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import apiFeiraKit from "../services/ApiFeiraKit";

export function MyProducts() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const user=useSelector((state) => state.AuthReducers.userData)
  function handleOpenAdd() {
    navigation.navigate("ProductForm", {});
  }

  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate("description", { productId, product, isInfo });
  }

  const getProductsByNameUsuario = () => {
    apiFeiraKit
      .get(`/products/by-id-usuario/${user.id}`)
      .then(({ data }) => {
        console.log(data)
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  useFocusEffect(useCallback(getProductsByNameUsuario, []));

  return (
    <VStack flex={1} w="full" px="2%">
      <ButtonBack />
       <TouchableOpacity style={{alignSelf:'flex-end',marginTop:-60,marginRight:10}} onPress={() => handleOpenAdd()}>
          <View>
            <MaterialIcons name="add" size={50} color={colors.blue[600]}/>
          </View>
        </TouchableOpacity>
      <Heading
        size="md"
        mt={4}
        color={colors.gray[500]}
        justifyItems="left"
        w="full"
        ml="2%"
        mb={4}
      >
        Meus produtos
      </Heading>

      <FlatList
        paddingX="2%"
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
          <View
            bgColor={colors.gray[250]}
            mr="4%"
            mb={4}
            w="98%"
            h={"90%"}
            p={4}
            borderRadius={8}
            borderWidth={1}
            borderColor={colors.gray[500]}
            justifyContent="space-between"
          >
            <HStack justifyContent="space-between">
              <Center>
                <MaterialIcons
                  color={colors.gray[300]}
                  name="remove-shopping-cart"
                  size={50}
                />
              </Center>
              <VStack alignSelf="center" w="70%" ml={2}>
                <Heading
                  fontWeight="medium"
                  fontFamily="heading"
                  size="sm"
                  mb={1}
                  color={colors.gray[500]}
                >
                  Voc?? ainda n??o tem produtos cadatrados
                </Heading>
              </VStack>

              <Center>
                <TouchableOpacity onPress={() => getProductsByNameUsuario()}>
                  <MaterialIcons
                    color={colors.gray[300]}
                    name="refresh"
                    size={50}
                  />
                </TouchableOpacity>
              </Center>
            </HStack>
          </View>
        )}
      />
    </VStack>
  );
}