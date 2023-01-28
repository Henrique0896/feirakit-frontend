import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";



export function WhatsappButton({Name,WhatsAppNumber, Quantity, ProductName }) {

  let Message = `Olá ${Name}, tudo bem? \n gostaria de comprar ${Quantity} unidade do produto "${ProductName}". Obrigado!`

  
  return (
    <View style={styles.container}> 
  
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() =>
            Linking.canOpenURL(`whatsapp://send?text=${Message}`).then((supported) => {
            if (supported) {
              return Linking.openURL(
                `whatsapp://send?phone=${WhatsAppNumber}&text= ${Message}`
              );
            } else
              return Linking.openURL(
                `https://api.whatsapp.com/send?phone=${WhatsAppNumber}&text=${Message}`
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
