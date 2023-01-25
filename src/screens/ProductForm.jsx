import React, { useState, useCallback, useRef, useEffect } from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LoadingForm, LoadingImage } from "../components/Loading";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { CustomBottomSheet } from "../components/CustomBottomSheet";
import { useSelector } from "react-redux";
import apiFeiraKit from "../services/ApiFeiraKit";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showMessage } from "react-native-flash-message";
import { storage } from "../../firebaseConfig.js";
import * as yup from "yup";
import { LogoFeira } from "../components/LogoFeira";

export function ProductForm() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const { colors } = useTheme();
  const HeaderText = product ? "Editar Produto" : "Adicionar Produto";
  const ButtonText = product ? "Confirmar" : "Adicionar";
  const producerId = product
    ? product.produtor_id
    : useSelector((state) => state.AuthReducers.userData).id;

  const ObjDate = new Date();
  let dayDate =
    ObjDate.getDate() < 10 ? "0" + ObjDate.getDate() : ObjDate.getDate();
  let monthDate =
    ObjDate.getMonth() < 10 ? ObjDate.getMonth() : ObjDate.getMonth();

  const id = product ? product.id : null;

  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(ObjDate);
  const [showDate, setShow] = useState(false);
  const [dateText, setDateText] = useState(
    product
      ? product.validade.split("-", 3).reverse().join("/")
      : dayDate + "/" + monthDate + 1 + "/" + ObjDate.getFullYear()
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [dataProduct,setDataProduct]=useState({})
  const filenames =[]
  const [isLoadingImage, setIsLoadingImages] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [unities, setUnities] = useState([]);
  const [formLoaded, setFormLoaded] = useState(false);

  const productSchema = yup.object({
    nome: yup.string().required("informe o nome do produto"),
    categoria: yup.string().required("selecione a categoria do produto"),
    descricao: yup.string().required("Adicione uma descrição para o produto"),
    unidade: yup.string().required("selecione o tipo de unidade"),
    estoque: yup
      .string()
      .required("informe a quantidade de produtos em estoque"),
    preco: yup.string().required("informe o preço do produto"),
    imagem_url: yup.array().required("Adicione uma imagem"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nome: product ? product.nome : "",
      descricao: product ? product.descricao : "",
      preco: product ? product.preco.toString() : "",
      categoria: product ? product.categoria : "",
      estoque: product ? product.estoque.toString() : "",
      unidade: product ? product.unidade : "",
      bestbefore: product ? product.bestbefore : false,
      produtor_id: producerId,
      imagem_url: product && product.imagem_url,
    },
    resolver: yupResolver(productSchema),
  });

  const handleNewProduct = (data) => {
    let objProduct = {
      ...data,
      imagem_url: uploadedImages,
      validade: dateText.split("/", 3).reverse().join("-"),
      preco: parseFloat(data.preco),
      estoque: parseInt(data.estoque),
    };

  

    if (id === null) {
      addProduct(JSON.stringify(objProduct));
    } else {
      objProduct.id = id;
      updateProduct(JSON.stringify(objProduct));
    }
  };

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
      setValue("imagem_url", newImages);
      setEmptyImage(false);
    } else {
      setImages(images);
      setValue("imagem_url", images);
      setEmptyImage(false);
    }
    setIsLoadingImages(false);
  };

  const textsRemoveImage = {
    title: "Remover",
    description: "Deseja remover esta imagem?",
    optionYes: "Sim",
    optionNo: "Não",
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
      setValue("imagem_url", newImages);
    } else {
      setImages(images);
      setValue("imagem_url", images);
    }
    setIsLoadingImages(false);
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
          setValue("imagem_url", newImages);
          if (newImages.length === 0) {
            setEmptyImage(true);
          }
        },
      },
    ]);
  };
  const uploadImages =(data) => {
    setDataProduct(data)
    setIsLoading(true);
    const promises = [];
    images.map(async(image) => {
      const response =await fetch(image);
      const blob =await response.blob();
      const fileName = image.substring(image.lastIndexOf("/") + 1);
      const uploadTask = storage.ref(`images/${fileName}`).put(blob);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.log(error);
        }
         ,
         async () => {
           await storage
              .ref("images")
               .child(fileName)
               .getDownloadURL()
               .then((urls) => {
                 setUploadedImages((prevState) => [...prevState, urls]);
             });
             
         }
       
      );
    });
    
   Promise.all(promises)
      .then()
      .catch((e) => {
        console.log(e);
      });
    
  };

  const addProduct=async(objProduct) => {
    let jsonProduct = objProduct;
     await apiFeiraKit
       .post("/products", jsonProduct)
       .then((response) => {
         navigation.goBack();
         showMessage({
           message: "Produto adicionado com sucesso",
           type: "success",
         });
       })
       .catch((error) => {
         alert("Algo deu errado,tente novamente");
         console.log(" ====>um erro ocorreu: " + error);
       });
    setIsLoading(false);
  }
  const updateProduct = async (objProduct) => {
    let jsonProduct = objProduct;
    await apiFeiraKit
      .put("/products", jsonProduct)
      .then((response) => {
        showMessage({
          message: "Produto Atualizado com sucesso",
          type: "success",
        });
        navigation.goBack();
      })
      .catch((error) => {
        alert("Algo deu errado,tente novamente");
        console.log(" ====>um erro ocorreu: " + error);
      });
    setIsLoading(false);
  };
  

  useEffect(() => {
    if(uploadedImages.length===images.length && uploadedImages.length >=1 ){
      handleNewProduct(dataProduct)
    }
  }, [uploadedImages]);


  useEffect(() => {
    apiFeiraKit
      .get(`/products/units`)
      .then(({ data }) => {
        setCategories(data.categorias);
        setUnities(data.unidades);
        setFormLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <VStack>
      <ButtonBack />
      <LogoFeira />
      {!formLoaded ? (
        <LoadingForm />
      ) : (
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

            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, value } }) => (
                <Input
                  borderColor={
                    errors.nome ? colors.purple[500] : colors.blue[600]
                  }
                  placeholderTextColor={
                    errors.nome ? colors.purple[500] : colors.blue[500]
                  }
                  placeholder="Nome do Produto"
                  fontSize="md"
                  fontWeight="thin"
                  fontFamily="body"
                  value={value}
                  onChangeText={onChange}
                  color={colors.blue[700]}
                  _focus={{
                    backgroundColor: colors.gray[200],
                    borderWidth: 2,
                  }}
                />
              )}
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

            <Controller
              control={control}
              name="categoria"
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholderTextColor={
                    errors.categoria ? colors.purple[500] : colors.blue[600]
                  }
                  color={colors.blue[600]}
                  borderColor={
                    errors.categoria ? colors.purple[500] : colors.blue[500]
                  }
                  selectedValue={value}
                  placeholder="Selecione a categoria do produto"
                  fontSize="md"
                  accessibilityLabel="Escolha a categoria do produto"
                  onValueChange={onChange}
                >
                  {categories.map((categories) => (
                    <Select.Item
                      key={categories}
                      label={categories}
                      value={categories}
                    />
                  ))}
                </Select>
              )}
            />

            <Heading
              mt={"2"}
              size="md"
              color={colors.blue[700]}
              fontFamily="body"
              fontWeight="semibold"
            >
              Descrição:
            </Heading>

            <Controller
              control={control}
              name="descricao"
              render={({ field: { onChange, value } }) => (
                <TextArea
                  borderColor={
                    errors.descricao ? colors.purple[500] : colors.blue[600]
                  }
                  placeholderTextColor={
                    errors.descricao ? colors.purple[500] : colors.blue[500]
                  }
                  placeholder="descrição do produto"
                  flexWrap="wrap"
                  fontSize="md"
                  value={value}
                  onChangeText={onChange}
                  fontWeight="thin"
                  fontFamily="body"
                  color={colors.blue[700]}
                  _focus={{
                    backgroundColor: colors.gray[200],
                    borderWidth: 2,
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="bestbefore"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  isChecked={value}
                  mt={4}
                  _text={{ color: colors.blue[700] }}
                  onChange={onChange}
                >
                  O produto será colhido após a compra{" "}
                </Checkbox>
              )}
            />

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

                <Controller
                  control={control}
                  name="preco"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      borderColor={
                        errors.preco ? colors.purple[500] : colors.blue[600]
                      }
                      placeholder="0,00"
                      placeholderTextColor={
                        errors.preco ? colors.purple[500] : colors.blue[500]
                      }
                      type="text"
                      fontSize="md"
                      value={value}
                      onChangeText={onChange}
                      color={colors.blue[700]}
                      keyboardType="decimal-pad"
                      _focus={{
                        backgroundColor: colors.gray[200],
                        borderWidth: 2,
                      }}
                    />
                  )}
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

                <Controller
                  control={control}
                  name="unidade"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholderTextColor={
                        errors.unidade ? colors.purple[500] : colors.blue[500]
                      }
                      color={colors.blue[700]}
                      borderColor={
                        errors.unidade ? colors.purple[500] : colors.blue[600]
                      }
                      selectedValue={value}
                      placeholder="tipo de unidade"
                      fontSize="md"
                      accessibilityLabel="Escolha o tipo de unidade"
                      onValueChange={onChange}
                    >
                      {unities.map((unit) => (
                        <Select.Item key={unit} label={unit} value={unit} />
                      ))}
                    </Select>
                  )}
                />
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

                <Controller
                  control={control}
                  name="estoque"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      borderColor={
                        errors.estoque ? colors.purple[500] : colors.blue[600]
                      }
                      placeholder="0"
                      placeholderTextColor={
                        errors.estoque ? colors.purple[500] : colors.blue[500]
                      }
                      type="text"
                      fontSize="md"
                      color={colors.blue[700]}
                      keyboardType="numeric"
                      onChangeText={onChange}
                      value={value}
                      _focus={{
                        backgroundColor: colors.gray[200],
                        borderWidth: 2,
                      }}
                    />
                  )}
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

            <Controller
              control={control}
              name="imagem_url"
              render={() => (
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
                          <TouchableOpacity
                            onLongPress={() => removeImage(item)}
                          >
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
                          <Text
                            color={
                              errors.imagem_url
                                ? colors.purple[500]
                                : colors.gray[400]
                            }
                            fontSize="md"
                          >
                            {emptyImage
                              ? "Adicione uma imagem"
                              : "Nenhuma imagem selecionada"}
                          </Text>
                        )}
                      />
                    )}
                  </HStack>
                  <TouchableOpacity onPress={() => openActionsSheet(0)} ml={4}>
                    <MaterialIcons
                      name="add-a-photo"
                      size={50}
                      color={
                        errors.imagem_url
                          ? colors.purple[500]
                          : colors.blue[700]
                      }
                    />
                  </TouchableOpacity>
                </HStack>
              )}
            />

            {images.length !== 0 && (
              <Heading
                size="xs"
                fontFamily="body"
                fontWeight="light"
                color="#4a4a4a"
              >
                pressione e segure uma imagem para removê-la
              </Heading>
            )}

            <Center mt={8}>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                rounded={8}
                px={8}
                py={2}
                fontSize={22}
                onPress={handleSubmit(uploadImages)}
              >
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
      )}

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