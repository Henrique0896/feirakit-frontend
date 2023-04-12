import React, { useState } from "react";
import { Button, Text, VStack, Icon, Input, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Alert, TouchableOpacity, Linking } from "react-native";
import {User} from '../services/user'
import { useNavigation } from "@react-navigation/native";
export function Login() {
  const navigation = useNavigation();
  const user = new User;
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const[isLoading,setIsLoading]=useState(false)
 
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
          Linking.canOpenURL(alert.link)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(alert.link);
              }
            })
            .catch(() => {}),
      },
      {
        text: alert.textButtonCancel,
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const submit = async() => {
    setIsLoading(true)
    if (email === "" || password === "") {
      setIsLoading(false)
      return Alert.alert("Erro", "por favor preencha todos os campos");
    }
    
    await user.checkPassword(email,password)
    .then(({data})=>{
      if(!data.resultado){
        setIsLoading(false)
        return Alert.alert("Erro", "Usuário ou senha inválidos");
      }
      user.getUserByEmail(email)
    })
    .catch((err)=>{
      setIsLoading(false)
      return Alert.alert("Erro", "Um erro inesperado aconteceu,tente novamente");
    })
    
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
      <Text
        alignSelf="flex-start"
        color={colors.blue[600]}
        ml={4}
        fontFamily="heading"
      >
        Fazer Login
      </Text>
      <Input
        onChangeText={setEmail}
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
        placeholder="Digite o seu email"
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
