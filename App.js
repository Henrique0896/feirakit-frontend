import * as React from "react";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_500Medium,
  Montserrat_100Thin,
} from "@expo-google-fonts/montserrat";
import { THEME } from "./src/styles/theme";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_100Thin,
  });

  return (
    <Provider store={store}>
        <NativeBaseProvider theme={THEME}>
          {fontsLoaded ? <Routes /> : <Loading />}
        </NativeBaseProvider>
    </Provider>
  );
}
