import React from "react";
import { VStack, HStack, useTheme, View, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function ButtonBack() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <VStack pb={-10} mt={10}>
      <HStack alignItems='flex-start'>
        <TouchableOpacity onPress={handleGoBack}>
          <View
            pl={3}
            alignItems="center"
            justifyContent="center"
            borderColor={colors.blue[600]}
            borderRadius="full"
            borderWidth={4}
            m="9%"
            mr={0}
            w={60}
            h={60}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={34}
              color={colors.blue[600]}
            />
          </View>
        </TouchableOpacity>
        <Image alt='texto feira-kit' 
        source={require("../assets/logo.png")}
        style={{ width: 230, height: 70 }}
        resizeMode="contain"
        alignSelf='center'
        alignContent='center'
        alignItems='center'

      />
      </HStack>
    </VStack>
  );
}