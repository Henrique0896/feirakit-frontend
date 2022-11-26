import { StyleSheet, View } from "react-native";
import { Button as Btn } from "native-base";


export function Button() {
  return (
    <View style={styles.container}>
      <Btn>Button</Btn>
    </View>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
