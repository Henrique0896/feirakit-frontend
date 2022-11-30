import React, { useState } from "react";
import {
  Heading,
  VStack,
  useTheme,
  Input,
  Select,
  TextArea,
  HStack,
  View,
  KeyboardAvoidingView,
  Icon,
  Center,
  Button,
} from "native-base";
import { ButtonBack } from "../components/ButtonBack";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";

export function ProductForm() {
  const route = useRoute();
  const { product } = route.params;

  const ObjDate = new Date();
  let dayDate =
    ObjDate.getDate() < 10 ? "0" + ObjDate.getDate() : ObjDate.getDate();

  const HeaderText = product ? "Editar Produto" : "Adicionar Produto";
  const ButtonText = product ? "Confirmar" : "Adicionar";

  const { colors } = useTheme();

  const [title, setTitle] = useState(product ? product.title : "");
  const [unit, setunit] = useState(product ? product.unit : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(
    product ? product.price.toFixed(2).toString().replace(".", ",") : ""
  );
  const [inventory, setInventory] = useState(
    product ? product.inventory.toString() : ""
  );

  const [date, setDate] = useState(ObjDate);
  const [showDate, setShow] = useState(false);
  const [dateText, setDateText] = useState(
    product
      ? product.expirationDate
      : dayDate + "/" + (ObjDate.getMonth() + 1) + "/" + ObjDate.getFullYear()
  );

  const onDateChange = (event, selectedDate) => {
    const currentdate = selectedDate || date;
    setShow(false);
    setDate(currentdate);
    let tempDate = new Date(currentdate);
    let temDayDate =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let fDate =
      temDayDate +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setDateText(fDate);
  };
  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <VStack>
      <ButtonBack />

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={8}
        px={4}
      >
        <ScrollView
          style={{ height: "100%", width: "100%" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 280 }}
        >
          <Heading
            color={colors.gray[500]}
            borderBottomColor={colors.gray[400]}
            borderBottomWidth={1}
          >
            {HeaderText}
          </Heading>
          <Heading
            mt={"4"}
            size="md"
            color={colors.blue[700]}
            fontFamily="body"
            fontWeight="semibold"
          >
            Nome do Produto:
          </Heading>
          <Input
            borderColor={colors.blue[600]}
            placeholderTextColor={colors.blue[500]}
            placeholder="Nome do Produto"
            fontSize="md"
            fontWeight="thin"
            fontFamily="body"
            value={title}
            onChangeText={setTitle}
            color={colors.blue[700]}
            _focus={{
              backgroundColor: colors.gray[200],
              borderWidth: 2,
            }}
          />
          <Heading
            mt={"4"}
            size="md"
            color={colors.blue[700]}
            fontFamily="body"
            fontWeight="semibold"
          >
            Categoria:
          </Heading>
          <Select
            placeholderTextColor={colors.blue[500]}
            color={colors.blue[700]}
            borderColor={colors.blue[600]}
            selectedValue={category}
            placeholder="Selecione a categoria do produto"
            fontSize="md"
            accessibilityLabel="Escolha a categoria do produto"
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Select.Item label="Legumes" value="1" />
            <Select.Item label="Frutas" value="2" />
            <Select.Item label="Hortalicas" value="3" />
            <Select.Item label="Plantas medicinais" value="4" />
          </Select>

          <Heading
            mt={"4"}
            size="md"
            color={colors.blue[700]}
            fontFamily="body"
            fontWeight="semibold"
          >
            Descrição:
          </Heading>
          <TextArea
            borderColor={colors.blue[600]}
            placeholderTextColor={colors.blue[500]}
            placeholder="descrição do produto"
            flexWrap="wrap"
            fontSize="md"
            value={description}
            onChangeText={setDescription}
            fontWeight="thin"
            fontFamily="body"
            color={colors.blue[700]}
            _focus={{
              backgroundColor: colors.gray[200],
              borderWidth: 2,
            }}
          />
          <HStack justifyContent="space-between" mt={4}>
            <View w="1/3">
              <Heading
                mt={"2"}
                size="md"
                color={colors.blue[700]}
                fontFamily="body"
                fontWeight="semibold"
              >
                Preço:
              </Heading>
              <Input
                placeholder="0,00"
                placeholderTextColor={colors.blue[500]}
                type="text"
                fontSize="md"
                value={price}
                onChangeText={setPrice}
                color={colors.blue[700]}
                keyboardType="numeric"
                _focus={{
                  backgroundColor: colors.gray[200],
                  borderWidth: 2,
                }}
              />
            </View>

            <View w="2/3" pl={4}>
              <Heading
                mt={"2"}
                size="md"
                color={colors.blue[700]}
                fontFamily="body"
                fontWeight="semibold"
              >
                Unidade
              </Heading>
              <Select
                placeholderTextColor={colors.blue[500]}
                color={colors.blue[700]}
                borderColor={colors.blue[600]}
                selectedValue={unit}
                placeholder="tipo de unidade"
                fontSize="md"
                accessibilityLabel="Escolha o tipo de unidade"
                onValueChange={(itemValue) => setunit(itemValue)}
              >
                <Select.Item label="Kilograma" value="kg" />
                <Select.Item label="Dúzia" value="dz" />
                <Select.Item label="Grama" value="g" />
                <Select.Item label="Uma unidade" value="un" />
                <Select.Item label="Litro" value="lt" />
              </Select>
            </View>
          </HStack>

          <HStack justifyContent="space-between" mt={4}>
            <View w="1/3">
              <Heading
                mt={"2"}
                size="md"
                color={colors.blue[700]}
                fontFamily="body"
                fontWeight="semibold"
              >
                Estoque
              </Heading>
              <Input
                placeholder="0"
                placeholderTextColor={colors.blue[500]}
                type="text"
                fontSize="md"
                color={colors.blue[700]}
                keyboardType="numeric"
                onChangeText={setInventory}
                value={inventory}
                _focus={{
                  backgroundColor: colors.gray[200],
                  borderWidth: 2,
                }}
              />
            </View>

            <View w="2/3" pl={4} justifyContent="center">
              <TouchableOpacity onPress={() => showDatePicker()}>
                <Heading
                  mt={"2"}
                  size="md"
                  color={colors.blue[700]}
                  fontFamily="body"
                  fontWeight="semibold"
                >
                  Validade
                </Heading>
                <Input
                  isDisabled
                  _disabled={{
                    opacity: 1,
                  }}
                  fontSize="md"
                  color={colors.blue[700]}
                  rightElement={
                    <Icon
                      color={colors.blue[700]}
                      as={<MaterialIcons name="date-range" />}
                      size={6}
                      mr={2}
                    />
                  }
                  value={dateText}
                />
              </TouchableOpacity>

              {showDate && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  is24Hour={true}
                  style={{ width: "90%" }}
                  onChange={onDateChange}
                />
              )}
            </View>
          </HStack>

          <Center mt={8}>
            <Button rounded={8} px={8} py={2} fontSize={22}>
              <Heading
                color={colors.gray[200]}
                fontFamily="body"
                fontWeight="semibold"
              >
                {ButtonText}
              </Heading>
            </Button>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
}
