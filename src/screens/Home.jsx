import {
  VStack,
  HStack,
  Input,
  Icon,
  Heading,
  useTheme,
  FlatList,
  Center,
  Text,
} from "native-base";
import { ProductCard } from "../components/ProductCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import apiFeiraKit from "../services/ApiFeiraKit";
import { LoadingProducts } from "../components/Loading";
import { Image, TouchableOpacity, View } from "react-native";

export function Home() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [iconName, setIconName] = useState("storefront");
  const [emptyText, setEmptyText] = useState("Não há Produtos para mostrar.");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const navigation = useNavigation();
  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate("description", { productId, product, isInfo });
  }

  const getAllProducts = () => {
    setIsLoading(true);
    apiFeiraKit
      .get("/products")
      .then(({ data }) => {
        setProducts(data.reverse());
        setIsLoading(false);
      })
      .catch((error) => {
        setProducts([]);
        setIconName("sync-problem");
        setEmptyText(":'(\n Ocorreu um erro,tente novamente");
        console.log(error);
        setIsLoading(false);
      });
  };

  const getProductsByName = (name) => {
    apiFeiraKit
      .get(`/products/byname/${name}`)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useFocusEffect(useCallback(getAllProducts, []));

  return (
    <VStack
      flex={1}
      w="full"
      bg={colors.gray[200]}
      p={8}
      pt={0}
      alignItems="center"
      px={4}
      pb={0}
    >
      <VStack w="full" alignItems="center" pt={8}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 230, height: 70 }}
          resizeMode="contain"
        />
        <HStack mt={-1} alignItems="center">
          <Input
            bgColor={colors.gray[300]}
            h={10}
            color={colors.blue[900]}
            flex={1}
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
            mr={4}
            onChangeText={setSearch}
            onSubmitEditing={() => {
              getProductsByName(search);
            }}
            style={{ fontFamily: "Montserrat_500Medium", fontWeight: "500" }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <View>
              <MaterialIcons name="menu" size={45} color={colors.blue[600]} />
            </View>
          </TouchableOpacity>
        </HStack>
      </VStack>

      {isLoading ? (
        <LoadingProducts />
      ) : (
        <>
          <Heading
            size="md"
            mt={2}
            color={colors.gray[500]}
            justifyItems="left"
            w="full"
            mb={4}
          >
            Todos os produtos
          </Heading>

          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            numColumns="2"
            w="100%"
            keyExtractor={(product) => product.id}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => handleOpenDescription(item.id, item, false)}
              />
            )}
            ListEmptyComponent={() => (
              <Center flex={1} h={400}>
                <TouchableOpacity onPress={() => getAllProducts()}>
                  <MaterialIcons
                    name={iconName}
                    size={80}
                    color={colors.gray[300]}
                    mt
                  />
                </TouchableOpacity>
                {"\n"}
                <Text
                  color={colors.gray[300]}
                  fontSize="4xl"
                  textAlign="center"
                >
                  {emptyText}
                </Text>
              </Center>
            )}
          />
        </>
      )}
    </VStack>
  );
}