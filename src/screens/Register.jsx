import React from "react";
import {
  Button,
  Text,
  VStack,
  Icon,
  Select,
  Input,
  useTheme,
  HStack,
  Heading,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { useState, useRef } from "react";
import ViaCep from "../services/ViaCep";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import apiFeiraKit from "../services/ApiFeiraKit";
import { useNavigation } from "@react-navigation/native";
import { Login as loginAction } from "../store/actions";
import { TextInputMask } from "react-native-masked-text";

export function Register() {
  const [inputType, setInputType] = useState("password");
  const [IsLoading, setIsLoading] = useState(false);
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [complement, setComplement] = useState("");
  const [adressError, setAdressError] = useState(false);
  const cellRef = useRef(null);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleVisibilityPassword = () => {
    if (inputType == "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  const getAddressData = async (cep) => {
    await ViaCep.get(`${cep}/json/`)
      .then(({ data }) => {
        setState(data.uf);
        setCity(data.localidade);
        setDistrict(data.bairro);
        setStreet(data.logradouro);
        setComplement(data.complemento);
      })
      .catch((err) => console.log(err));
  };

  const userSchema = yup.object({
    nome: yup.string().required("informe o seu nome completo"),
    email: yup
      .string()
      .required("Informe um email válido")
      .email("Informe um email válido"),
    telefone: yup.string().min(10).required("Informe um numero de whatsapp"),
    senha: yup
      .string()
      .min(6, "a senha deve ter pelo menos 6 dígitos")
      .required("informe uma senha"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleCreateUser = (data) => {
    setIsLoading(true);
    if (
      street == "" ||
      number == "" ||
      district == "" ||
      city == "" ||
      state == "" ||
      cep == ""
    ) {
      setAdressError(true);
      setIsLoading(false);
      return;
    }
    let adress = `${street}, ${number}, ${district}, ${city} - ${state},${cep.slice(
      0,
      5
    )}-${cep.slice(-3)}`;
    let objUser = {
      ...data,
      endereco: adress,
      telefone: cellRef?.current.getRawValue(),
    };

    console.log(objUser);
    setIsLoading(false);
    apiFeiraKit
      .post("/users", JSON.stringify(objUser))
      .then((response) => {
        login(objUser.nome, objUser.senha);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const login = (username) => {
    apiFeiraKit
      .get(`/users/byname/${username}`)
      .then(({ data }) => {
        dispatch(loginAction(data[0]));
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <VStack w="full" alignItems="center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: "100%", paddingBottom: 100 }}
      >
        <ButtonBack />
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
          <TextInputMask
            type={"custom"}
            options={{
              mask: "99999-999",
            }}
            color={errors.telefone ? colors.purple[500] : colors.blue[900]}
            placeholder="*CEP"
            style={{
              fontFamily: "Montserrat_400Regular",
              fontSize: 14,
              marginLeft: 11,
            }}
            width="70%"
            placeholderTextColor={
              adressError ? colors.purple[500] : colors.blue[800]
            }
            onChangeText={setCep}
            onEndEditing={() => getAddressData(cep)}
            keyboardType="numeric"
          />
        </HStack>

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
            adressError ? colors.purple[500] : colors.blue[800]
          }
          fontSize={14}
          borderRadius={8}
          mr={4}
          value={street}
          onChangeText={(text) => setStreet(text)}
        />
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
            adressError ? colors.purple[500] : colors.blue[800]
          }
          fontSize={14}
          borderRadius={8}
          mr={4}
          keyboardType="default"
          value={number}
          onChangeText={setNumber}
        />
        <Input
          mt={4}
          width={334}
          height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          placeholder="*Complemento (opcional)"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={colors.blue[800]}
          fontSize={14}
          borderRadius={8}
          mr={4}
          value={complement}
          onChangeText={(text) => setComplement(text)}
        />
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
            adressError ? colors.purple[500] : colors.blue[800]
          }
          fontSize={14}
          borderRadius={8}
          mr={4}
          value={district}
          onChangeText={(text) => setDistrict(text)}
        />
        <Input
          mt={4}
          width={334}
          height={54}
          bgColor={colors.gray[100]}
          w="90%"
          color={colors.blue[900]}
          value={city}
          placeholder="* Cidade"
          fontFamily={"Montserrat_400Regular"}
          placeholderTextColor={
            adressError ? colors.purple[500] : colors.blue[800]
          }
          fontSize={14}
          borderRadius={8}
          mr={4}
          onChangeText={(text) => setCity(text)}
        />

        <Select
          w="96%"
          mt={4}
          h={54}
          borderRadius={8}
          placeholderTextColor={
            adressError ? colors.purple[500] : colors.blue[800]
          }
          color={colors.blue[900]}
          selectedValue={state}
          placeholder="Selecione o estado"
          fontSize="md"
          accessibilityLabel="Escolha a categoria do produto"
          onValueChange={(itemvalue) => setState(itemvalue)}
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

        <Button
          bgColor={colors.blue[600]}
          height={54}
          width={334}
          mt={4}
          borderRadius={15}
          alignSelf="center"
          alignContent="center"
          onPress={handleSubmit(handleCreateUser)}
          isLoading={IsLoading}
        >
          Cadastrar
        </Button>
        {Object.values(errors).length > 0 && (
          <Text alignSelf="center" color={colors.purple[500]} mt={4}>
            Preencha todos os campos antes de continuar
          </Text>
        )}
      </ScrollView>
    </VStack>
  );
}
