import React, { useState, useCallback, useRef } from "react";
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
  Text,
  FlatList,
  Image,
  Checkbox,
} from "native-base";
import { ButtonBack } from "../components/ButtonBack";
import { Alert, Platform, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LoadingImage } from "../components/Loading";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { CustomBottomSheet } from "../components/CustomBottomSheet";
import apiFeiraKit from "../services/ApiFeiraKit";

export function ProductForm() {
  const route = useRoute();
  const { product } = route.params;
  const HeaderText = product ? "Editar Produto" : "Adicionar Produto";
  const ButtonText = product ? "Confirmar" : "Adicionar";
  const { colors } = useTheme();

  const ObjDate = new Date();
  let dayDate =
    ObjDate.getDate() < 10 ? "0" + ObjDate.getDate() : ObjDate.getDate();
  let monthDate =
    ObjDate.getMonth() < 10
      ? "0" + (ObjDate.getMonth() + 1)
      : ObjDate.getMonth() ;
  const id =product ? product.id : null ;
  const [title, setTitle] = useState(product ? product.nome : "");
  const [unit, setunit] = useState(product ? product.unidade : "");
  const [bestBefore,setBestBefore]=useState(product ? product.bestbefore : false)
  const [category, setCategory] = useState(product ? product.categoria : "");
  const [description, setDescription] = useState(
    product ? product.descricao : ""
  );
  const [price, setPrice] = useState(
    product ? product.preco.toFixed(2).toString().replace(".", ",") : ""
  );
  const [inventory, setInventory] = useState(
    product ? product.estoque.toString() : ""
  );
  const [isLoading,setIsLoading]=useState(false);
  const [date, setDate] = useState(ObjDate);
  const [showDate, setShow] = useState(false);
  const [dateText, setDateText] = useState(
    product
      ? product.validade.split("-", 3).reverse().join("/")
      : dayDate + "/" + (monthDate + 1) + "/" + ObjDate.getFullYear()
  );

  const onDateChange = (event, selectedDate) => {
    const currentdate = selectedDate || date;
    setShow(false);
    setDate(currentdate);
    let tempDate = new Date(currentdate);

    let temDayDate =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    let tempMonthDate =
      tempDate.getMonth() < 9
        ? "0" + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    let fDate = temDayDate + "/" + tempMonthDate + "/" + tempDate.getFullYear();

    setDateText(fDate);
  };
  const showDatePicker = () => {
    setShow(true);
  };

  const bottomSheetRef = useRef(BottomSheet);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const snapPoints = ["30%"];
  const openActionsSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsSheetOpen(true);
  }, []);
  const closeActionsSheet = () => {
    bottomSheetRef.current?.close();
    setIsSheetOpen(false);
  };

  const [images, setImages] = useState(product ? product.imagem_url : []);
  const [isLoadingImage, setIsLoadingImages] = useState(false);

  const pickImages = async () => {
    setIsLoadingImages(true);
    closeActionsSheet();
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissões",
        "O app precisa dessas permissões para adicionar imagens ao seu produto!"
      );
      return;
    }
    
    let selectedImages;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.cancelled) {
      selectedImages = result.uri
        ? [{ uri: result.uri }]
        : result.selected.reverse().slice(0, 10);
    }

    if (!result.cancelled) {
      let newImages = [];
      images.map((image) => {
        newImages.push(image);
      });

      selectedImages.map((image) => {
        newImages.push(image.uri);
      });

      setImages(newImages);
    } else {
      setImages(images);
    }
    setIsLoadingImages(false);
  };

  const textsRemoveImage = {
    title: "Remover",
    description: "Deseja remover esta imagem?",
    optionYes: "Sim",
    optionNo: "Não",
  };

  const removeImage = (uri) => {
    setIsLoadingImages(true);
    Alert.alert(textsRemoveImage.title, textsRemoveImage.description, [
      {
        text: textsRemoveImage.optionNo,
        onPress: () => {
          return;
        },
      },
      {
        text: textsRemoveImage.optionYes,
        onPress: () => {
          let newImages = [];

          images.map((image) => {
            if (image !== uri) {
              newImages.push(image);
            }
          });
          setIsLoadingImages(false);
          setImages(newImages);
        },
      },
    ]);
  };

  const pickImagesByCamera = async () => {
    setIsLoadingImages(true);
    closeActionsSheet();
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão",
        "Você se recusou a permitir que este aplicativo acesse sua câmera!"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true });

    let capturedImage;
    if (!result.cancelled) {
      capturedImage = result.uri;
    }
    if (!result.cancelled) {
      let newImages = [];
      images.map((image) => {
        newImages.push(image);
      });
      newImages.push(capturedImage);
      setImages(newImages);
    } else {
      setImages(images);
    }
    setIsLoadingImages(false);
  };


  const checkForm=()=>{
    setIsLoading(true)
    let objProduct=null
    if(id == ''
      ||images == []
      ||price==''
      ||title==''
      ||inventory==''
      ||dateText==''
      ||unit==''
      ||category==''
      ){
        Alert.alert('Informações',"por favor preencha todas as informações antes de continuar")
        setIsLoading(false)
        return
      }

    
     objProduct= {
         nome_usuario: "string",
         nome: title,
         categoria: category,
         descricao: description,
         unidade: unit,
         estoque: parseInt(inventory),
         produtor:"Manuel gomes",
         bestbefore:bestBefore,
         validade:dateText.split('/',3).reverse().join('-'),
         avaliacao: "1",
         comentarios:'não há comentarios',
         preco:parseFloat(price),
         imagem_url: images
     }

     if(id===null){
        addProduct(objProduct)
     }else{
      objProduct.id=id
      updateProduct(objProduct)
     }

    console.log(objProduct);
    setIsLoading(false)
  }
  

  const addProduct=async(objProduct)=>{
    await apiFeiraKit.post('/products',objProduct)
    .then(response =>console.log(response))
    .catch((error)=>{
      console.log(' ====>um erro ocorreu: '+error)
    })
    setIsLoading(false)
  }

  const updateProduct=async(objProduct)=>{
    await apiFeiraKit.post('/products',objProduct)
    .then(response =>console.log(response))
    .catch((error)=>{
      console.log(' ====>um erro ocorreu: '+error)
    })
    setIsLoading(false)
  }

  

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
            mt={"2"}
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
            mt={"2"}
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
            {/* 'fruta', 'legume', 'verdura, hortalicas' */}
            <Select.Item label="Legume" value="legume" />
            <Select.Item label="Fruta" value="fruta" />
            <Select.Item label="Hortaliça" value="hortalicas" />
            <Select.Item label="Verdura" value="verdura" />
          </Select>

          <Heading
            mt={"2"}
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

          <Checkbox isChecked={bestBefore} mt={4} _text={{color:colors.blue[700]}}  onChange={setBestBefore}>O produto será colhido após a compra </Checkbox>
          <HStack justifyContent="space-between" mt={2}>
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
                borderColor={colors.blue[600]}
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
                <Select.Item label="Kilograma" value="kilograma" />
                <Select.Item label="Dúzia" value="duzia" />
                <Select.Item label="Grama" value="grama" />
                <Select.Item label="Uma unidade" value="unidade" />
                <Select.Item label="Cartela" value="cartela" />
                <Select.Item label="Dezena" value="dezena" />
                
              </Select>
            </View>
          </HStack>

          <HStack justifyContent="space-between" mt={2}>
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
                borderColor={colors.blue[600]}
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

          <HStack mt={4}>
            <HStack w="80%" alignItems="center">
              {isLoadingImage ? (
                <LoadingImage />
              ) : (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={images}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity onLongPress={() => removeImage(item)}>
                      <MaterialIcons
                        name="remove-circle"
                        color="#FF0000"
                        style={{
                          alignSelf: "flex-end",
                          position: "absolute",
                          zIndex: 1000,
                        }}
                      ></MaterialIcons>
                      <Image
                        source={{ uri: item }}
                        style={{ width: 50, height: 50, borderRadius: 4 }}
                        ml={2}
                        alt="Imagem do produto,selecionada da galeria"
                      />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <Text color={colors.gray[400]} fontSize="md">
                      Nenhuma imagem selecionada
                    </Text>
                  )}
                />
              )}
            </HStack>
            <TouchableOpacity onPress={() => openActionsSheet(0)} ml={4}>
              <MaterialIcons
                name="add-a-photo"
                size={50}
                color={colors.blue[700]}
              />
            </TouchableOpacity>
          </HStack>

          {images.length !== 0 && (
            <Heading
              size="xs"
              fontFamily="body"
              fontWeight="light"
              color="#FF0000"
            >
              pressione e segure uma imagem para removê-la
            </Heading>
          )}

          <Center mt={8}>
            <Button isLoading={isLoading} disabled={isLoading} rounded={8} px={8} py={2} fontSize={22} onPress={checkForm}>
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

      <BottomSheet
        backgroundStyle={{ backgroundColor: colors.blue[100] }}
        handleIndicatorStyle={{ backgroundColor: colors.blue[800] }}
        handleStyle={{
          borderColor: colors.blue[800],
          borderWidth: 2,
          borderBottomWidth: 0,
          borderRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        onClose={() => setIsSheetOpen[false]}
      >
        <BottomSheetView>
          <CustomBottomSheet
            actionGallery={pickImages}
            actionCamera={pickImagesByCamera}
          />
        </BottomSheetView>
      </BottomSheet>
    </VStack>
    
  );
}
