import React, { useState } from "react";
import { Button, Text, VStack, Icon, Input, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Alert, TouchableOpacity, Linking } from "react-native";
import { useDispatch } from "react-redux";
import { Login as loginAction } from "../store/actions";
import { useNavigation } from "@react-navigation/native";
import ApiFeiraKit from '../services/ApiFeiraKit'
export function Login() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const[isLoading,setIsLoading]=useState(false)
  const dispatch = useDispatch();

  const alert = {
    title: "Esqueceu sua senha?",
    text: "Entre em contato via WhatsApp.",
    link: "whatsapp://send?text=Esqueci%20minha%20senha%20do%20App%20FeiraKit,%20preciso%20de%20ajuda!",
    textButton: "WhatsApp",
    textButtonCancel: "Cancelar",
  };

  const showConfirm = () => {
    Alert.alert(alert.title, alert.text, [
      {
        text: alert.textButton,
        onPress: () =>
          Linking.canOpenURL(link).then((supported) => {
            if (!supported) {
              //operacao concluida com sucesso
            }
          }),
      },
      {
        text: alert.textButtonCancel,
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const submit = () => {
    setIsLoading(true)
    if (username === "" || password === "") {
      setIsLoading(false)
      return Alert.alert("Erro", "Usuário ou senha inválidos");
    }
    
    ApiFeiraKit.get(`/users/byname/${username}`)
    .then(({data})=>{
      if (data.length === 0 ||data[0].senha !== password  ){
        setIsLoading(false)
        return Alert.alert("Erro", "Usuário ou senha inválidos")
      }
      dispatch(loginAction(data[0]));
    })
    .catch(()=>{
      setIsLoading(false)
      return Alert.alert("Erro", "Um Erro inesperado ocorreu,tente novamente")
     }
    )
    
  };

  function handleVisibilityPassword() {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  return (
    <VStack w="full" alignItems="center">
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 187, height: 170 }}
        resizeMode="contain"
      />
      <Text alignSelf="flex-start" color={colors.blue[600]} ml={4} fontFamily='heading'>
        Fazer Login
      </Text>
      <Input
        onChangeText={setUsername}
        mt={4}
        width={334}
        height={54}
        bgColor={colors.gray[100]}
        w="90%"
        color={colors.blue[900]}
        leftElement={
          <Icon
            color={colors.blue[700]}
            as={<MaterialIcons name="person" />}
            size={6}
            ml={2}
          />
        }
        placeholder="Digite seu nome de usuário"
        fontFamily={"Montserrat_500Medium"}
        placeholderTextColor={colors.blue[700]}
        fontSize={14}
        borderRadius={8}
        mr={4}
      />
      <Input
        type={inputType}
        onChangeText={setPassword}
        mt={4}
        width={334}
        height={54}
        bgColor={colors.gray[100]}
        w="90%"
        color={colors.blue[900]}
        leftElement={
          <Icon
            color={colors.blue[700]}
            as={<MaterialIcons name="lock" />}
            size={6}
            ml={2}
          />
        }
        rightElement={
          <TouchableOpacity onPress={handleVisibilityPassword}>
            <Icon
              color={colors.blue[700]}
              as={
                <MaterialIcons
                  name={inputType == "text" ? "visibility-off" : "visibility"}
                />
              }
              size={6}
              marginRight={2}
            />
          </TouchableOpacity>
        }
        placeholder="Senha"
        fontFamily={"Montserrat_500Medium"}
        placeholderTextColor={colors.blue[700]}
        fontSize={14}
        borderRadius={8}
        mr={4}
      />
      <Button
        bgColor={colors.blue[600]}
        _pressed={{ bgColor: colors.blue[700] }}
        onPress={submit}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
        isLoading={isLoading}
      >
        Entrar
      </Button>
      <Button
        onPress={showConfirm}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
      >
        Esqueci minha senha
      </Button>
      <Button
        bgColor={colors.gray[200]}
        _text={{ color: colors.blue[600] }}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
        onPress={() => navigation.navigate("Register")}
      >
        Cadastre-se
      </Button>
    </VStack>
  );
}
