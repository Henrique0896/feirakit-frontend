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
      img: [{
          uri: "https://images.pexels.com/photos/96616/pexels-photo-96616.jpeg?auto=compress&cs=tinysrgb&w=1000&h=500&dpr=1",
        },
        {
          uri: "https://images.pexels.com/photos/3938343/pexels-photo-3938343.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
          uri:"https://veja.abril.com.br/wp-content/uploads/2016/06/tomate-colesterol-genetica-tk-20121106-original.jpeg?quality=70&strip=info&resize=850,567"
        }
      ],
      title: "Tomate ",
      description: `O tomate é o fruto do tomateiro.
Da sua família, fazem também parte as berinjelas,
as pimentas e os pimentões, além de algumas espécies não comestíveis.`,
      price: 4.5,
      inventory: 12,
      expirationDate: "10/12/2023",
      unit: "kg",
      category: "2",
    },
    {
      id: 2,
      img:[{
        uri: "https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=1000&h=500&dpr=1",
      },
      {
        uri: "https://images.pexels.com/photos/257259/pexels-photo-257259.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },],
      title: "Repolho",
      description: `O repolho, subespécie da Brassica oleracea, grupo Capitata, é uma variedade peculiar de couve, constituindo um dos vegetais mais utilizados na cozinha, em diversas aplicações (sopas, conservas, acompanhamentos, massas, etc). `,
      price: 2.5,
      inventory: 19,
      expirationDate: "01/07/2027",
      unit: "un",
      category: "3",
    },
  ];

  const navigation = useNavigation();
  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate("description", { productId, product, isInfo });
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
            onPress={() => handleOpenDescription(item.id, item, false)}
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
