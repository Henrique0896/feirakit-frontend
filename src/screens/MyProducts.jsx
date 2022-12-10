import React, { useState } from "react";
import {
  VStack,
  HStack,
  Icon,
  Input,
  useTheme,
  Heading,
  FlatList,
} from "native-base";
import { TouchableOpacity, View } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
import { MyProductItems } from "../components/MyProductItems";
import { useNavigation } from "@react-navigation/native";

export function MyProducts() {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  
  let products=[
    {
      id: 1,
      imagem_url: [
          "https://images.pexels.com/photos/96616/pexels-photo-96616.jpeg?auto=compress&cs=tinysrgb&w=1000&h=500&dpr=1",
          "https://images.pexels.com/photos/3938343/pexels-photo-3938343.jpeg?auto=compress&cs=tinysrgb&w=1600",
          "https://veja.abril.com.br/wp-content/uploads/2016/06/tomate-colesterol-genetica-tk-20121106-original.jpeg?quality=70&strip=info&resize=850,567"
      ],
      nome: "Tomate ",
      descricao: `O tomate é o fruto do tomateiro.Da sua família, fazem também parte as berinjelas,as pimentas e os pimentões, além de algumas espécies não comestíveis.`,
      preco: 4.5,
      estoque: 12,
      validade: "10/12/2023",
      unidade: "kg",
      categoria: "2",
      produtor:"Manuel gomes",
      bestbefore:false,
      comentarios:[],
      avaliacao:[]
    },

    {
      id: 2,
      imagem_url: [
        "https://images.pexels.com/photos/2518893/pexels-photo-2518893.jpeg?auto=compress&cs=tinysrgb&w=1000&h=500&dpr=1",
        "https://images.pexels.com/photos/257259/pexels-photo-257259.jpeg?auto=compress&cs=tinysrgb&w=1600",
      ],
      nome: "Repolho ",
      descricao: `O repolho, subespécie da Brassica oleracea, grupo Capitata, é uma variedade peculiar de couve, constituindo um dos vegetais mais utilizados na cozinha, em diversas aplicações (sopas, conservas, acompanhamentos, massas, etc). `,
      preco: 2.0,
      estoque: 7,
      validade: "17-12-2025",
      unidade: "kg",
      categoria: "2",
      produtor:"Manuel gomes",
      bestbefore:true,
      comentarios:[],
      avaliacao:[]
    },
  ]
  
  const navigation = useNavigation();
  function handleOpenAdd() {
    navigation.navigate("ProductForm", {});
  }

  function handleOpenDescription(productId, product, isInfo) {
    navigation.navigate("description", { productId, product, isInfo });
  }

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
          <MyProductItems
            product={item}
            onPress={() => handleOpenDescription(item.id, item, true)}
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
