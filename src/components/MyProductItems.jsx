import React from "react";
import {
  Heading,
  HStack,
  Image,
  Pressable,
  useTheme,
  VStack,
} from "native-base";
import { TouchableOpacity, StyleSheet,Alert } from "react-native";
import { MaterialIcons}from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";

export function MyProductItems({ product, onPress }) {

  const navigation = useNavigation();
  function handleOpenEdit(product) {
    navigation.navigate("ProductForm",{product});
  }


  const { colors } = useTheme();

  const texts = {
    title: "Exluir",
    description: `Realmente deseja excluir "${product.title}"`,
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
          //chama funcão para excluir o produto do banco pelo id 
        },
      },
    ]);
  };


  return (
    <Pressable
      bgColor= {colors.gray[250]}
      mr="4%"
      mb={4}
      maxH={300}
      p={4}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.blue[500]}
      justifyContent="space-between"
    >
      <HStack justifyContent="space-between">
        <Image
          source={product.img}
          style={{
            width: "20%",
            height: 65,
            alignSelf: "center",
            marginBottom: 4,
          }}
          resizeMode="center"
          alt={product.description}
        />

        <VStack
          alignSelf="center"
          w="35%"
          ml={2}
        >
          <Heading size={product.title.length > 10 ? "xs" : "md"} mb={1}>
            {product.title}
          </Heading>
          <Heading
            fontWeight="medium"
            fontFamily='heading'
            size="xs"
            mb={1}
            color={colors.green[300]}
          >
            R$ {product.price.toFixed(2)}
          </Heading>
        </VStack>
        <HStack
          justifyContent="center"
          w="40%"
        >
          <TouchableOpacity style={styles.btnActions} onPress={onPress}>
            <MaterialIcons name="info-outline" size={30} color={colors.green[300]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnActions} onPress={()=>handleOpenEdit(product)}>
            <MaterialIcons name="edit" size={25} color={colors.purple[600]}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnActions} onPress={()=>deleteProduct(product.id)}>
            <MaterialIcons name='delete-outline' size={25} color={colors.red[600]}/>
          </TouchableOpacity>
        </HStack>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnActions: {
    width: "30%",
    height: 40,
    borderRadius: 10,
    marginHorizontal:4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
