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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, ScrollView} from "react-native";
import { ButtonBack } from "../components/ButtonBack";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ViaCep from "../services/ViaCep";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import { LogoFeira } from "../components/LogoFeira";
import { User } from "../services/user";

export function PasswordRecovery() {
  const user = new User();
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const userSchema = yup.object({
    email: yup
      .string()
      .required("Informe um email válido")
      .email("Informe um email válido"),
    cep: yup.string().min(7, "CEP Inválido").required("Informe um CEP"),
    rua: yup.string().required("informe o nome da rua"),
    numero: yup.string().required("informe o numero da sua residência"),
    cidade: yup.string().required("informe o nome da cidade"),
    estado: yup.string().required("selecione o estado"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleCreateUser = async (data) => {
    setIsLoading(true);
    let objUser = {
      email: data.email,
      endereco: {
        rua: data.rua,
        numero: data.numero,
        cep: data.cep,
        cidade: data.cidade,
        estado: data.estado,
      }
    };
    //alert de acordo com a resposta da api,com sucesso redireciona pro login
    Alert.alert("recuperação de senha",`Um email com a sua nova senha será enviado para ${objUser.email}`)
    setIsLoading(false);
  };

  const getAddressData = async (cep) => {
    await ViaCep.get(`${cep}/json/`)
      .then(({ data }) => {
        setValue("estado", data.uf);
        setValue("cidade", data.localidade);
        setValue("rua", data.logradouro);
      })
      .catch((err) => console.log(err));
  };

  return (
    <VStack w="full" alignItems="center" justifyContent='center'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}
        contentContainerStyle={{ width: "100%",justifyContent:'center', paddingBottom: 100}}
      >
        <ButtonBack />
        <LogoFeira />
        <Text alignSelf="flex-start" mt={8} ml={4} fontSize="xl">
          Recuperação de Senha
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              height={54}
              alignSelf="center"
              w='94%'
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
        <Text fontSize='sm' ml='4%'>Informe o E-mail cadastrado na plataforma</Text>

        <Text alignSelf="flex-start" ml={4} mt={4} fontSize="xl">
          Informe o seu endereço
        </Text>

        <HStack
          alignItems="center"
          mt={4}
          height={54}
          alignSelf="center"
          w='94%'
          borderWidth={1}
          borderRadius={8}
          borderColor={colors.gray[300]}
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
                width="68%"
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
              bgColor={colors.gray[100]}
              height={54}
              alignSelf="center"
              w='94%'
              color={colors.blue[900]}
              placeholder="* Rua"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.rua ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
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
              bgColor={colors.gray[100]}
              height={54}
              alignSelf="center"
              w='94%'
              color={colors.blue[900]}
              placeholder="* Numero"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.numero ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
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
          name="cidade"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              bgColor={colors.gray[100]}
              height={54}
              alignSelf="center"
              w='94%'
              color={colors.blue[900]}
              value={value}
              placeholder="* Cidade"
              fontFamily={"Montserrat_400Regular"}
              placeholderTextColor={
                errors.cidade ? colors.purple[500] : colors.blue[800]
              }
              fontSize={14}
              borderRadius={8}
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
              h={54}
              alignSelf="center"
              w='94%'
              mt={4}
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
          width='90%'
          _pressed={{ bgColor: colors.blue[700] }}
          mt={4}
          borderRadius={15}
          alignSelf='center'
          onPress={handleSubmit(handleCreateUser)}
          isLoading={isLoading}
        >
          Recuperar Senha
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