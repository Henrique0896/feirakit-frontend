import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function ImageButton({urlImage, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.container}>
        <ImageBackground
          borderRadius={12}
          source={{uri:urlImage}}
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
    padding:2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#D8D8DD",
    borderWidth: 3,
    marginHorizontal: 5,
    marginVertical: 35,
    marginRight: 10,
    marginLeft: 10,
  },

  image: {
    width: 90,
    height: 90,
    justifyContent: "center",
    flex: 1,
    alignItems:'center',
  },
});
