import React from "react";
import { Heading, Image, Pressable, useTheme } from "native-base";
import { Text } from "react-native";

export function ProductCard({ product, onPress }) {
  const { colors } = useTheme();
  const description = product.description.slice(0, 25) + "...";
  return (
    <Pressable
      onPress={onPress}
      mr="4%"
      mb={2}
      maxH={300}
      w="48%"
      bgColor="white"
      p={4}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.blue[500]}
    >
      <Image
        source={product.img[0]}
        style={{
          width: "100%",
          height: 90,
          alignSelf: "center",
          marginBottom: 4,
        }}
        resizeMode="cover"
        alt={product.description}
      />

      <Heading fontWeight="medium" size="sm" mb={1} fontFamily="heading">
        {product.title}
      </Heading>
      <Text
        style={{
          backgroundColor: colors.gray[200],
          color: colors.gray[400],
          fontSize: 14,
          height: 40,
          paddingHorizontal: 2,
        }}
      >
        {description}
      </Text>
      <Heading fontWeight="medium" size="sm" mt={2} mb={1} fontFamily="heading">
        R$ {product.price.toFixed(2)}
      </Heading>
    </Pressable>
  );
}
