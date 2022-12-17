import React, { useState } from "react";
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

export function Description() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
  const { product } = route.params;
  const { isInfo } = route.params;
  const [amount, setAmount] = useState(1);
  const [urlImage, setUrlImage] = useState(product.imagem_url[0]);
  const Images = product.imagem_url;
  const WhatsAppNumber = "5533998785878";
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
          return;
        },
      },
    ]);
  };

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
      <ScrollView height='100%'>
          <FlatList
            width={'100%'}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{paddingHorizontal:"2%",
            width:"90%"}}
            data={Images}
            keyExtractor={(images) => images}
            renderItem={({ index }) => (
              <ImageButton
                urlImage={product.imagem_url[index]}
                onPress={() => setUrlImage(product.imagem_url[index])}
              />
            )}
          ></FlatList>
        
        {isInfo && (
          <HStack
          mt={-5}
            alignItems="center"
            justifyContent="space-evenly"
            style={styles.actionsContainer}
          >
            <TouchableOpacity
              style={[
                styles.btnActions,
                {
                  borderColor: colors.purple[200],
                  backgroundColor:colors.gray[200]
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
                  borderColor: colors.red[600],
                  backgroundColor:colors.gray[200]
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
          justifyContent="space-between"
          alignSelf="center"
          px="2%"
          w="90%"
        >
          <Text style={styles.text} paddingTop="10">
            {product.nome}
          </Text>
          <Text style={styles.text} paddingTop="10">
            R$ {product.preco.toFixed(2)}
          </Text>
        </HStack>
        <View style={styles.descriptionBox}>
          <Text style={{ fontSize: 14, textAlign: "left" }}>
            {product.descricao}
          </Text>
        </View>
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
  },

  btnActions: {
    borderWidth: 2,
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
