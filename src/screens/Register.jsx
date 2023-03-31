import React from "react";
import {
  Button,
  Text,
  VStack,
  Icon,
  Select,
  Input,
  useTheme,
  HStack
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ViaCep from "../services/ViaCep";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import { LogoFeira } from "../components/LogoFeira";
import {User} from '../services/user'

export function Register() {
  const user = new User
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const cellRef = useRef(null);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleVisibilityPassword = () => {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  
  const userSchema = yup.object({
    nome: yup.string()
    .required("informe o seu nome completo"),
    email: yup
      .string()
      .required("Informe um email válido")
      .email("Informe um email válido"),
    telefone: yup.string().min(10).required("Informe um numero de whatsapp"),
    senha: yup
      .string()
      .min(6, "a senha deve ter pelo menos 6 dígitos")
      .required("informe uma senha"),
    cep: yup.string().min(7, "CEP Inválido").required("Informe um CEP"),
    rua: yup.string().required("informe o nome da rua"),
    numero: yup.string().required("informe o numero da sua residência"),
    complemento: yup.string(),
    bairro: yup.string().required("informe o bairro"),
    cidade: yup.string().required("informe o nome da cidade"),
    estado: yup.string().required("selecione o estado"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm({
    resolver: yupResolver(userSchema),
    
  });

  const handleCreateUser = async(data) => {
    setIsLoading(true);
    let objUser = {
      email: data.email,
      nome: data.nome,
      senha: data.senha,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        bairro: data.bairro,
        cep: data.cep,
        complemento: data.complemento,
        cidade: data.cidade,
        estado: data.estado,
      },
      telefone: cellRef?.current.getRawValue()
    };
  
    await user.createUser(objUser).then(({data})=>{
      if(!data.resultado){
        setError('email',{type:'custom',message:'Este email já está sendo usado'})
        return Alert.alert("Erro", "Este endereço de email já está sendo usado");
      }
      user.getUserByEmail(objUser.email)
    }).catch(({err})=>{
      setIsLoading(false);
      return Alert.alert("Erro", "Um erro inesperado aconteceu,por favor tente novamente");
    })
    setIsLoading(false);
  };

  const getAddressData = async (cep) => {
    await ViaCep.get(`${cep}/json/`)
      .then(({ data }) => {
        setValue('estado',data.uf)
        setValue('cidade',data.localidade);
        setValue('bairro',data.bairro);
        setValue('rua',data.logradouro);
        setValue('complemento',data.complemento);
      })
      .catch((err) => console.log(err));
  };

  return (
    <VStack w="full" alignItems="center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: "100%", paddingBottom: 100 }}
      >
        <ButtonBack />
        <LogoFeira />
        <Text alignSelf="flex-start" mt={8} ml={4} fontSize="xl">
          Informações da Conta
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              keyboardType="email-address"
              color={errors.email ? colors.purple[500] : colors.blue[900]}
              leftElement={
                <Icon
                  color={errors.email ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name="email" />}
                  size={6}
                  ml={2}
                />
              }
              placeholder="E-mail"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.email ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={errors.senha ? colors.purple[500] : colors.blue[900]}
              leftElement={
                <Icon
                  color={errors.senha ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name="lock" />}
                  size={6}
                  ml={2}
                />
              }
              rightElement={
                <TouchableOpacity onPress={handleVisibilityPassword}>
                  <Icon
                    color={errors.senha ? colors.purple[500] : colors.blue[900]}
                    as={
                      <MaterialIcons
                        name={
                          inputType == "text" ? "visibility-off" : "visibility"
                        }
                      />
                    }
                    size={6}
                    marginRight={2}
                  />
                </TouchableOpacity>
              }
              type={inputType}
              placeholder="Senha"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.senha ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.senha && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.senha.message}
          </Text>
        )}

        <Text alignSelf="flex-start" ml={4} mt={4} fontSize="xl">
          Dados pessoais
        </Text>

        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={errors.nome ? colors.purple[500] : colors.blue[900]}
              leftElement={
                <Icon
                  color={errors.nome ? colors.purple[500] : colors.blue[900]}
                  as={<MaterialIcons name="person" />}
                  size={6}
                  ml={2}
                />
              }
              placeholder="Nome Completo"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.nome ? colors.purple[500] : colors.blue[900]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nome && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.nome.message}
          </Text>
        )}

        <HStack
          alignItems="center"
          mt={4}
          height={54}
          borderWidth={1}
          borderRadius={8}
          borderColor={colors.gray[300]}
          mr={4}
          bgColor={colors.gray[100]}
        >
          <Icon
            color={errors.telefone ? colors.purple[500] : colors.blue[900]}
            as={<FontAwesome5 name="whatsapp" />}
            size={5}
            ml={3}
          />
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, value } }) => (
              <TextInputMask
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                color={errors.telefone ? colors.purple[500] : colors.blue[900]}
                placeholder="(xx) XXXXX-XXXX"
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 14,
                  marginLeft: 11,
                }}
                width="70%"
                placeholderTextColor={
                  errors.telefone ? colors.purple[500] : colors.blue[900]
                }
                value={value}
                onChangeText={onChange}
                ref={cellRef}
              />
            )}
          />
        </HStack>
        {errors.telefone && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.telefone.message}
          </Text>
        )}

        <Text alignSelf="flex-start" ml={4} mt={4} fontSize="xl">
          Endereço
        </Text>

        <HStack
          alignItems="center"
          mt={4}
          height={54}
          borderWidth={1}
          borderRadius={8}
          borderColor={colors.gray[300]}
          mr={4}
          bgColor={colors.gray[100]}
        >
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, value } }) => (
              <TextInputMask
                type={"custom"}
                options={{
                  mask: "99999-999",
                }}
                color={errors.cep ? colors.purple[500] : colors.blue[900]}
                placeholder="*CEP"
                style={{
                  fontFamily: "Montserrat_400Regular",
                  fontSize: 14,
                  marginLeft: 11,
                }}
                width="70%"
                placeholderTextColor={
                  errors.cep ? colors.purple[500] : colors.blue[800]
                }
                value={value}
                onChangeText={onChange}
                onEndEditing={() => {
                  getAddressData(value);
                }}
                keyboardType="numeric"
              />
            )}
          />
        </HStack>
        {errors.cep && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.cep.message}
          </Text>
        )}

        <Controller
          control={control}
          name="rua"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              placeholder="* Rua"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.rua ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.rua && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.rua.message}
          </Text>
        )}

        <Controller
          control={control}
          name="numero"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              placeholder="* Numero"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.numero? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              keyboardType="default"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.numero && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.numero.message}
          </Text>
        )}

        <Controller
          control={control}
          name="complemento"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              placeholder="Complemento (opcional)"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={colors.blue[800]}
              fontSize={14}
              borderRadius={8}
              mr={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="bairro"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              placeholder="*Bairro"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.bairro ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.bairro && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.bairro.message}
          </Text>
        )}

        <Controller
          control={control}
          name="cidade"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              width={334}
              height={54}
              bgColor={colors.gray[100]}
              w="90%"
              color={colors.blue[900]}
              value={value}
              placeholder="* Cidade"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.cidade ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
              mr={4}
              onChangeText={onChange}
            />
          )}
        />
        {errors.cidade && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.cidade.message}
          </Text>
        )}

        <Controller
          control={control}
          name="estado"
          render={({ field: { onChange, value } }) => (
            <Select
              w="96%"
              mt={4}
              h={54}
              borderRadius={8}
              placeholderTextColor={
                errors.estado ? colors.purple[500] : colors.blue[800]
              }
              color={colors.blue[900]}
              selectedValue={value}
              placeholder="Selecione o estado"
              fontSize="md"
              accessibilityLabel="Escolha a categoria do produto"
              onValueChange={onChange}
            >
              <Select.Item label="Acre" value="AC" />
              <Select.Item label="Alagoas" value="AL" />
              <Select.Item label="Amapá" value="AP" />
              <Select.Item label="Amazonas" value="AM" />
              <Select.Item label="Bahia" value="BA" />
              <Select.Item label="Ceará" value="CE" />
              <Select.Item label="Distrito Federal" value="DF" />
              <Select.Item label="Espírito Santo" value="ES" />
              <Select.Item label="Goiás" value="GO" />
              <Select.Item label="Maranhão" value="MA" />
              <Select.Item label="Mato Grosso" value="MT" />
              <Select.Item label="Mato Grosso do Sul" value="MS" />
              <Select.Item label="Minas Gerais" value="MG" />
              <Select.Item label="Pará" value="PA" />
              <Select.Item label="Paraíba" value="PB" />
              <Select.Item label="Paraná" value="PR" />
              <Select.Item label="Pernambuco" value="PE" />
              <Select.Item label="Piauí" value="PI" />
              <Select.Item label="Rio de Janeiro" value="RJ" />
              <Select.Item label="Rio Grande do Norte" value="RN" />
              <Select.Item label="Rio Grande do Sul" value="RS" />
              <Select.Item label="Rondônia" value="RO" />
              <Select.Item label="Roraima" value="RR" />
              <Select.Item label="Santa Catarina" value="SC" />
              <Select.Item label="São Paulo" value="SP" />
              <Select.Item label="Sergipe" value="SE" />
              <Select.Item label="Tocantins" value="TO" />
            </Select>
          )}
        />
        {errors.estado && (
          <Text
            alignSelf="flex-start"
            marginLeft={8}
            color={colors.purple[500]}
          >
            {errors.estado.message}
          </Text>
        )}

        <Button
          bgColor={colors.blue[600]}
          height={54}
          width={334}
          mt={4}
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          onPress={handleSubmit(handleCreateUser)}
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
        {Object.values(errors).length > 0 && (
          <Text alignSelf="center" color={colors.purple[500]} mt={4}>
            Verifique todos os campos antes de continuar
          </Text>
        )}
      </ScrollView>
    </VStack>
  );
}