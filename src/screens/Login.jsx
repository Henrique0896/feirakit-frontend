import React, { useState } from "react";
import { Button, Text, VStack, Icon, Input, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Image,Alert, Touchable, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Login as loginAction} from "../store/actions";

export function Login() {
  const { colors } = useTheme();
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [inputType,setInputType]=useState('password')
  const dispatch=useDispatch();

  const submit = () =>{
    if(username ==='' || password===''){
      return Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
    
    dispatch(loginAction(username,password))
  }
  
  
  function handleVisibilityPassword(){
    if(inputType  == 'password'){
      setInputType('text')
    }else{
      setInputType('password')
    }
  }
   
  

  return (
    <VStack w="full" alignItems="center">
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 187, height: 170 }}
        resizeMode="contain"
      />
      <Text alignSelf="flex-start" color={colors.blue[600]} ml={4}>
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
        placeholder="Digite seu e-mail ou CPF"
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
            as={<MaterialIcons name={inputType=='text'?"visibility-off":'visibility '} />}
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
        _pressed={{bgColor:colors.blue[700]}}
        onPress={submit}
        width={334}
        height={54}
        mt={4}
        w="90%"
        borderRadius={15}
      >
        Entrar
      </Button>
      <Button width={334} height={54} mt={4} w="90%" borderRadius={15}>
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
      >
        Cadastre-se
      </Button>
    </VStack>
  );
}
