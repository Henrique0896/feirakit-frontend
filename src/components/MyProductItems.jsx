import React from "react";
import {
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  useTheme,
  VStack,
} from "native-base";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function MyProductItems({ product, onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable
      bgColor={colors.gray[250]}
      onPress={onPress}
      mr="4%"
      mb={4}
      w='98%'
      maxH={320}
      p={4}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.blue[500]}
      justifyContent="space-between"
    >
      <HStack justifyContent="space-between">
        <Image
          source={product.img[0]}
          style={{
            width: "20%",
            height: 65,
            alignSelf: "center",
            marginBottom: 4,
          }}
          resizeMode="center"
          alt={product.description}
        />

        <VStack alignSelf="center" w="70%" ml={2}>
          <Heading size={product.title.length > 10 ? "xs" : "md"} mb={1}>
            {product.title}
          </Heading>

          <HStack>
            <Heading
              fontWeight="medium"
              fontFamily="heading"
              size="xs"
              mb={1}
              color={colors.green[300]}
            >
              R$ {product.price.toFixed(2)}
            </Heading>

            <Heading
              fontWeight="medium"
              fontFamily="heading"
              size="xs"
              mb={1}
              color={colors.gray[400]}
              ml={2}
            >
              Qtd.Estoque: {product.inventory}
            </Heading>
          </HStack>
        </VStack>
        <Center>
          <MaterialIcons color={colors.gray[300]} name="chevron-right" size={50}/>
        </Center>
      </HStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
