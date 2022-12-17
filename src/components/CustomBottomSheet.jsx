import React from "react";
import { Heading, HStack, VStack, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
export function CustomBottomSheet({ actionGallery, actionCamera }) {
  const { colors } = useTheme();
  return (
    <HStack justifyContent="center" mt={4}>
      <TouchableOpacity
        style={{ width: "45%", height: "100%" }}
        onPress={actionCamera}
      >
        <VStack alignItems="center" justifyContent="center">
          <MaterialIcons name="camera-alt" size={70} color={colors.blue[700]} />
          <Heading color={colors.blue[700]}>Câmera</Heading>
        </VStack>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ width: "45%", height: "100%" }}
        onPress={actionGallery}
      >
        <VStack alignItems="center" justifyContent="center">
          <MaterialIcons name="photo-library" size={70} color={colors.blue[700]} />
          <Heading color={colors.blue[700]}>Galeria</Heading>
        </VStack>
      </TouchableOpacity>
    </HStack>
  );
}
