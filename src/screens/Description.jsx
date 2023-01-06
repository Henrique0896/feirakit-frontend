import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  Box,
  useTheme,
  VStack,
  HStack,
  Heading,
  FlatList,
  Image,
} from "native-base";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import ImageButton from "../components/ImageButton";
import { WhatsappButton } from "../components/WhatsappButton";
import { MaterialIcons } from "@expo/vector-icons";
import { ButtonBack } from "../components/ButtonBack";
import apiFeiraKit from "../services/ApiFeiraKit";
import { FontAwesome5 } from "@expo/vector-icons";

export function Description() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
  const { product } = route.params;
  const { isInfo } = route.params;
  const [amount, setAmount] = useState(1);
  const [urlImage, setUrlImage] = useState(product.imagem_url[0]);
  const Images = product.imagem_url;
  const [WhatsAppNumber, setWhatsAppNumber] = useState("");
  const [endereco, setEndereco] = useState();
  const [produtor, setProdutor] = useState();

  let btnDisabled = amount === 1 ? true : false;

  function handleOpenEdit(product) {
    navigation.navigate("ProductForm", { product });
  }
  const texts = {
    title: "Exluir",
    description: `Realmente deseja excluir "${product.nome}"`,
    optionYes: "Sim",
    optionNo: "Não",
  };

  const deleteProduct = (id) => {
    Alert.alert(texts.title, texts.description, [
      {
        text: texts.optionNo,
        onPress: () => {
          return;
        },
      },
      {
        text: texts.optionYes,
        onPress: () => {
          let objDelete = { id: id };
          apiFeiraKit
            .delete("/products", { data: objDelete })
            .then(() => {
              navigation.goBack();
            })
            .catch((error) => {
              console.log("====>um erro ocorreu: " + error.response.data);
            });
        },
      },
    ]);
  };

  useEffect(() => {
    apiFeiraKit
      .get(`/users/${product.produtor_id}`)
      .then(({ data }) => {
        let endereco = data.endereco.split(",");
        let cidade = endereco[3];
        setEndereco(cidade);
        setProdutor(data.nome);
        setWhatsAppNumber(data.telefone);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <VStack style={styles.container}>
      <ButtonBack />
      <Box style={styles.imagebox}>
        <Image
          source={{ uri: urlImage }}
          style={styles.image}
          alt="imagem dos produtos"
        />
      </Box>
      <ScrollView height="100%">
        <FlatList
          width={"100%"}
          showsHorizontalScrollIndicator={false}
          mt={-4}
          horizontal
          contentContainerStyle={{ paddingHorizontal: "2%" }}
          data={Images}
          keyExtractor={(images) => images}
          renderItem={({ index }) => (
            <ImageButton
              urlImage={product.imagem_url[index]}
              onPress={() => setUrlImage(product.imagem_url[index])}
            />
          )}
        />

        {isInfo && (
          <HStack
            mt={-5}
            mb={3}
            alignItems="center"
            justifyContent="space-evenly"
            style={styles.actionsContainer}
          >
            <TouchableOpacity
              style={[
                styles.btnActions,
                {
                  borderColor: colors.purple[200],
                  backgroundColor: colors.gray[200],
                  shadowColor: colors.purple[400],
                  elevation: 14,
                },
              ]}
              onPress={() => handleOpenEdit(product)}
            >
              <MaterialIcons name="edit" size={25} color={colors.purple[600]} />
              <Heading color={colors.purple[600]}>Editar</Heading>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnActions,
                {
                  borderColor: colors.red[400],
                  backgroundColor: colors.gray[200],
                  shadowColor: colors.red[800],
                  elevation: 14,
                },
              ]}
              onPress={() => deleteProduct(product.id)}
            >
              <MaterialIcons
                name="delete-outline"
                size={25}
                color={colors.red[600]}
              />
              <Heading color={colors.red[600]}>Excluir</Heading>
            </TouchableOpacity>
          </HStack>
        )}

        <HStack
          marginTop={-10}
          mr={5}
          pr={5}
          justifyContent="space-between"
          alignSelf="center"
          px="2%"
          w="90%"
          minW="90%"
          alignContent="center"
          justifyItems="center"
          pt={2}
        >
          {product.bestbefore && (
            <FontAwesome5
              name="medal"
              size={30}
              style={{
                color: colors.green[600],
                alignSelf: "center",
                marginTop: -10,
              }}
            />
          )}

          <VStack
            alignSelf="center"
            w={product.bestbefore ? "62%" : "70%"}
            ml={2}
          >
            <Text style={styles.text} font-size="10vw">
              {product.nome}
            </Text>
          </VStack>
          <Text style={[styles.text, { alignSelf: "flex-end", paddingTop: 4 }]}>
            R$ {product.preco.toFixed(2)}
          </Text>
        </HStack>

        <HStack mt={-2} w="90%" alignSelf="center" mb={2}>
          <MaterialIcons
            name="location-pin"
            size={18}
            style={{ color: colors.gray[600], alignSelf: "center" }}
          />
          <Text fontSize={16}>{endereco}</Text>
        </HStack>

        <View style={styles.descriptionBox}>
          <Heading size="sm">
            Validade: {`${product.validade.split("-").reverse().join("/")} \n`}
          </Heading>
          <Heading size="sm" mt={-5} mb={1}>
            Categoria: {product.categoria}
          </Heading>
          <Heading size="sm" mt={-1} mb={1}>
            Unidade: {product.unidade}
          </Heading>
          {product.bestbefore && (
            <Text
              style={{
                fontSize: 14,
                textAlign: "left",
                color: colors.green[600],
              }}
            >
              Este produto será colhido no dia da entrega
            </Text>
          )}

          <Text style={{ fontSize: 14, textAlign: "left" }}>
            {product.descricao}
          </Text>
        </View>

        <HStack
          mt={2}
          w="90%"
          alignSelf="center"
          justifyItems="center"
          alignContent="center"
          mb={2}
        >
          <Text display="flex" alignItems="center" fontSize={16}>
            Vendido por
          </Text>
          <Text color={colors.blue[600]} fontSize={16}>{` ${produtor}`}</Text>
        </HStack>
        {!isInfo && (
          <>
            <Text
              style={[
                styles.text,
                { fontSize: 20, marginLeft: "7%", marginTop: 20 },
              ]}
            >
              Quantidade
            </Text>
            <HStack
              marginTop={5}
              alignSelf="center"
              h="16"
              w="1/3"
              justifyContent="space-between"
              alignItems="center"
              borderWidth={1}
              borderColor={colors.blue[700]}
            >
              <TouchableOpacity
                disabled={btnDisabled}
                onPress={() => setAmount(amount - 1)}
                style={styles.qtdButton}
              >
                <MaterialIcons size={30} name="remove" />
              </TouchableOpacity>
              <View>
                <Text style={{ fontSize: 20 }}>{amount}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setAmount(amount + 1)}
                style={styles.qtdButton}
              >
                <MaterialIcons size={30} name="add" />
              </TouchableOpacity>
            </HStack>
            <WhatsappButton
              WhatsAppNumber={WhatsAppNumber}
              Quantity={amount}
              ProductName={`${product.nome}`}
              Name={`${product.produtor}`}
            />
          </>
        )}
      </ScrollView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
  },
  image: {
    resizeMode: "center",
    height: "100%",
    width: "100%",
  },
  imagebox: {
    height: "30%",
    width: "70%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "-5%",
  },
  descriptionBox: {
    height: "auto",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 20,
  },
  qtdButton: {
    height: "100%",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#0088a7",
  },
  text: {
    fontSize: 30,
    fontFamily: "Montserrat_400Regular",
    marginVertical: 15,
    lineHeight: 30,
  },

  btnActions: {
    borderWidth: 1,
    borderRadius: 8,
    width: "40%",
    paddingHorizontal: 16,
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  actionsContainer: {
    borderRadius: 20,
    paddingVertical: 16,
    width: "90%",
    alignSelf: "center",
  },
});
