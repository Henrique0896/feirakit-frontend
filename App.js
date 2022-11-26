import { StyleSheet, View, Alert } from "react-native";
import { Home } from "./src/screens/Home";
import { Description } from "./src/screens/Description";
import { NativeBaseProvider } from "native-base";
import {useFonts,Montserrat_400Regular,Montserrat_700Bold,}from "@expo-google-fonts/montserrat"
import {THEME}from './src/styles/theme'
import { Loading } from "./src/components/Loading";
export default function App() {
  
  const [fontsLoaded] = useFonts({ Montserrat_400Regular,Montserrat_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <View style={styles.container}>
        {fontsLoaded?
        <Description />:
        <Loading/>}
      </View>
    </NativeBaseProvider>
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
