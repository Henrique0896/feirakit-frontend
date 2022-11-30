import { VStack, Heading, useTheme, FlatList, Center, Text } from "native-base";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export function Home() {
  const { colors } = useTheme();

  let products = [
    {
      id: 1,
      img: require("../assets/exemplo.jpeg"),
      title: "Tomate",
      description: "pequena descrição sobre oproduto",
      price: 4.5,
      favorite: true,
    },
    {
      id: 2,
      img: require("../assets/exemplo.jpeg"),
      title: "Alface",
      description: "pequena descrição sobre oproduto",
      price: 2.5,
      favorite: false,
    },
  ];

  const navigation = useNavigation();
  function handleOpenDescription(productId,isInfo) {
    navigation.navigate("description", { productId,isInfo });
  }

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
      <Header />

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
            onPress={() => handleOpenDescription(item.id,false)}
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
