import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function ImageButton({urlImage}) {
  const showConfirm = () => {
    Alert.alert(
      "Navegação de imagens",
      "Função indisponível no momento.",

      [
        {
          text: "Ok",
          onPress: () => console.log("Ação selecionada: SIM"),
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={showConfirm}>
      <View style={style.container}>
        <ImageBackground
          source={{uri: urlImage}}
          resizeMode="cover"
          style={style.image}
        ></ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#D8D8DD",
    borderWidth: 3,
    marginHorizontal: 5,
    marginVertical: 50,
    marginRight: 10,
    marginLeft: 10,
    Flex: 1,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    justifyContent: "center",
    flex: 1,
  },
});
