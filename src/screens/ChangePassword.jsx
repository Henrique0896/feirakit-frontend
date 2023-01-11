import React, { useState } from "react";
import { VStack, Text, Input, useTheme, Icon, Button } from "native-base";
import { ButtonBack } from "../components/ButtonBack";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 
import { useDispatch, useSelector } from "react-redux";
import { Login as loginAction } from "../store/actions";
import apiFeiraKit from "../services/ApiFeiraKit";
import { showMessage} from "react-native-flash-message";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function ChangePassword() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const user = useSelector((state) => state.AuthReducers.userData);
  const dispatch = useDispatch();
  const [incompatiblePassword, setIncompatiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userSchema = yup.object({
    senha: yup
      .string()
      .min(6, "a senha deve ter pelo menos 6 dígitos")
      .required("informe uma senha"),
    confirmacao: yup
      .string()
      .min(6, "a senha deve ter pelo menos 6 dígitos")
      .required("reescreva a nova senha"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handlePassword = (data) => {
    setIsLoading(true);
    if (data.senha !== data.confirmacao) {
      setIncompatiblePassword(true);
      setIsLoading(false);
      return;
    }
    let userNewPassword = {
      ...user,
      senha: data.senha,
    };

    apiFeiraKit
      .put("/users", JSON.stringify(userNewPassword))
      .then((response) => {
        showMessage({
          message: "Senha alterada com sucesso",
          type: "success",
        });
        login(userNewPassword.nome, userNewPassword.senha);
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
        navigation.goBack();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <VStack flex={1} w="full">
      <ButtonBack />
      <Text
        fontFamily={"Montserrat_400Regular"}
        alignSelf="flex-start"
        ml={4}
        color={colors.gray[900]}
        fontSize={20}
        mt={10}
      >
        Alterar Senha
      </Text>

      {incompatiblePassword && (
        <Text color={colors.purple[500]} alignSelf="center" fontSize={16}>
          As senhas são incompatíveis
        </Text>
      )}

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <Input
            mt={5}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w="90%"
            color={errors.senha ? colors.purple[500] : colors.blue[900]}
            alignSelf="center"
            value={value}
            onChangeText={onChange}
            leftElement={
              <Icon
                color={errors.senha ? colors.purple[500] : colors.blue[900]}
                as={<MaterialIcons name="lock" />}
                size={6}
                ml={2}
              />
            }
            placeholder="nova Senha"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={
              errors.senha ? colors.purple[500] : colors.blue[900]
            }
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
        )}
      />
      {errors.senha && (
        <Text alignSelf="flex-start" marginLeft={8} color={colors.purple[500]}>
          {errors.senha.message}
        </Text>
      )}

      <Controller
        control={control}
        name="confirmacao"
        render={({ field: { onChange, value } }) => (
          <Input
            mt={5}
            width={334}
            height={54}
            bgColor={colors.gray[100]}
            w="90%"
            color={errors.confirmacao ? colors.purple[500] : colors.blue[900]}
            alignSelf="center"
            value={value}
            onChangeText={onChange}
            leftElement={
              <Icon
                color={
                  errors.confirmacao ? colors.purple[500] : colors.blue[900]
                }
                as={<MaterialIcons name="lock" />}
                size={6}
                ml={2}
              />
            }
            placeholder="Confirmar Nova Senha"
            fontFamily={"Montserrat_400Regular"}
            placeholderTextColor={
              errors.confirmacao ? colors.purple[500] : colors.blue[900]
            }
            fontSize={14}
            borderRadius={8}
            mr={4}
          />
        )}
      />
      {errors.confirmacao && (
        <Text alignSelf="flex-start" marginLeft={8} color={colors.purple[500]}>
          {errors.confirmacao.message}
        </Text>
      )}

      <Button
        bgColor={colors.blue[600]}
        _pressed={{ bgColor: colors.blue[700] }}
        width={334}
        height={54}
        onPress={handleSubmit(handlePassword)}
        mt={10}
        w="90%"
        borderRadius={15}
        isLoading={isLoading}
        alignSelf="center"
        alignContent="center"
        alignItems="center"
      >
        <Text
          color={colors.gray[200]}
          fontFamily={"Montserrat_400Regular"}
          fontSize={15}
        >
          Confirmar
        </Text>
      </Button>
    </VStack>
  );
}
