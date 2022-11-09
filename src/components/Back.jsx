import React, { useState } from "react";
import { VStack, HStack, Icon, Input, useTheme, View } from "native-base";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export function Back() {
  const { colors } = useTheme();
  return (
    <VStack pb={-10} mt={10}>

      <HStack>

        <TouchableOpacity>
            <View pl={3} alignItems='center' justifyContent='center' borderColor={colors.blue[600]} borderRadius='full' borderWidth={4} m='9%' w={60} h={60}>
                <MaterialIcons name="arrow-back-ios" size={34} color={colors.blue[600]} />
            </View>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
