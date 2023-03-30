import React from "react";
import {
  VStack,
  Skeleton,
  Center,
  HStack,
  useTheme,
  Progress,
  Heading,
  View,
  Image,
} from "native-base";
import { ActivityIndicator } from "react-native";
export function Loading() {
  return (
    <Center w="100%" pt={10}>
      <VStack
        w="90%"
        maxW="400"
        h="full"
        space={8}
        overflow="hidden"
        rounded="md"
      >
        <Skeleton h="10" w={190} alignSelf="center" fadeDuration={0.2} />
        <Skeleton h="10" w="full" fadeDuration={0.2} fa />

        <HStack>
          <Skeleton h="10" w="2/3" pr={2} fadeDuration={0.2} />
          <Skeleton h="10" w="1/3" fadeDuration={0.2} />
        </HStack>
        <Skeleton.Text
          mt={-4}
          lines={1}
          w="1/2"
          fontSize={"md"}
          fadeDuration={1.5}
        />

        <HStack>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            mr={4}
            fadeDuration={0.4}
          ></Skeleton>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            fadeDuration={0.4}
          ></Skeleton>
        </HStack>
        <HStack>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            mr={4}
            fadeDuration={0.4}
          ></Skeleton>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            fadeDuration={0.4}
          ></Skeleton>
        </HStack>
        <HStack>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            mr={4}
            fadeDuration={0.4}
          ></Skeleton>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            fadeDuration={0.4}
          ></Skeleton>
        </HStack>
      </VStack>
    </Center>
  );
}

export function LoadingProducts() {
  return (
    <Center w="100%" pt={10}>
      <Skeleton h="8" w={"58%"} alignSelf="flex-start" fadeDuration={1.0} />
      <VStack
        zIndex={1}
        w="100%"
        maxW="400"
        h="full"
        space={8}
        overflow="hidden"
        rounded="md"
      >
        <Skeleton.Text
          mt={-4}
          lines={1}
          w="1/2"
          fontSize={"md"}
          fadeDuration={1.0}
        />

        <HStack>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            mr={4}
            fadeDuration={0.4}
          ></Skeleton>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            fadeDuration={0.4}
          ></Skeleton>
        </HStack>
        <HStack>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            mr={4}
            fadeDuration={0.4}
          ></Skeleton>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            fadeDuration={0.4}
          ></Skeleton>
        </HStack>
        <HStack>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            mr={4}
            fadeDuration={0.4}
          ></Skeleton>
          <Skeleton
            rounded="md"
            height={230}
            w={180}
            fadeDuration={0.4}
          ></Skeleton>
        </HStack>
      </VStack>
    </Center>
  );
}

export function LoadingImage() {
  return (
    <>
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
    </>
  );
}

export function LoadingForm() {
  const { colors } = useTheme();
  return (
    <Center mt={"60%"}>
      <ActivityIndicator size={180} color={colors.blue[700]} />
    </Center>
  );
}

export function LoadingUploadImages({ percent }) {
  const { colors } = useTheme();
  return (
    <VStack
      alignItems="center"
      alignSelf="center"
      position="absolute"
      justifyContent="space-evenly"
      zIndex={100}
      bg={colors.gray[100]}
      w="full"
      h="full"
    >
      <Image
        mt={"-20%"}
        source={require("../assets/logo.png")}
        alt="logo do Feira kit"
        style={{ width: 300, height: 90 }}
        resizeMode="contain"
        alignSelf="center"
      />
      <View w="70%">
        <Heading fontSize="md" color={colors.blue[700]} alignSelf="center">
          Fazendo Upload do Produto
        </Heading>
        <Progress value={percent} size="2xl" mb={4} mt="1.5" />
      </View>

      <Heading fontSize="md" color={colors.blue[700]} alignSelf="center">
        ...
      </Heading>
    </VStack>
  );
}

export function FooterListLoader({fetchingProducts}) {
  const { colors } = useTheme();

  return (
    <>
      {fetchingProducts && (
        <ActivityIndicator style={{marginTop:20}} size={30} color={colors.blue[600]} />
      )}
    </>
  );
}
