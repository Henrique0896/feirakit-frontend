import React, { useState } from "react";
import { VStack, HStack, Icon, Input, useTheme, View } from "native-base";
import { Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function Button() {
  const { colors } = useTheme();
  const showConfirm = () => {
    Alert.alert(
      "Recuperar senha",
      "Entre em contato via Whatsapp.",
      
      [
        {
          text: "Ok",
          onPress: () => console.log("Ação selecionada: SIM"),
        }
      ]
    )
  }

  return (
    <VStack pb={-10} mt={10}>

      <HStack>

        <TouchableOpacity onPress={ showConfirm }>
            <View pl={3} alignItems='center' justifyContent='center' borderColor={colors.blue[600]} borderRadius='full' borderWidth={4} m='9%' w={60} h={60}>
                <MaterialIcons name="arrow-back-ios" size={34} color={colors.blue[600]} />
            </View>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
