import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";


export function Button() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() =>
          Linking.canOpenURL("whatsapp://send?text=oi?").then((supported) => {
            if (supported) {
              return Linking.openURL(
                "whatsapp://send?phone=5533998785878&text=Oi"
              );
            } else
              return Linking.openURL(
                "https://api.whatsapp.com/send?phone=5533998785878&text=Oi"
              );
          })
        }
        Whatsapp
        Mensagem
      >
        <Text style={styles.title}>
          <FontAwesome5 size={20} name="whatsapp" /> COMPRAR
        </Text>
      </TouchableOpacity>
    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    width: "80%",
    height: 70,
    backgroundColor: "#038C8C",
    borderRadius: 15,
    marginVertical: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#F2f2f2",
    fontFamily: "Montserrat_700Bold",
  },
});
