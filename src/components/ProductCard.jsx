import React from "react";
import { Box, Heading, Image, Pressable, useTheme} from "native-base";
import { Text } from "react-native";

export function ProductCard({ product,onPress }) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}
      mr='4%'
      mb={4}
      maxH={300}
      w='48%'
      bgColor="white"
      p={4}
      borderRadius={8}
      borderWidth={1}
      borderColor={colors.blue[500]}
    >
      <Image
        source={product.img}
        style={{ width: '100%', height: 90, alignSelf: "center", marginBottom: 4 }}
        resizeMode="cover"
        alt={product.description}
      />

      <Heading fontWeight="medium" size="sm" mb={1}>
        {product.title}
      </Heading>
      <Text
        style={{color:colors.gray[400] ,fontSize:14,marginBottom:4}}
      >
        {product.description}
      </Text>
      <Heading fontWeight="medium" size="sm" mb={1}>
        R$ {product.price.toFixed(2)}
      </Heading>
    </Pressable>
  );
}
