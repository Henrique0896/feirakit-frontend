import React from "react";
import { VStack, Skeleton, Center, HStack } from "native-base";

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
      <Skeleton h="8" w={'58%'} alignSelf="flex-start" fadeDuration={0.2} />
      <VStack
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



export function LoadingImage() {
  return (
    <>
        <Skeleton w={50} h={50} mr={2}/>
        <Skeleton w={50} h={50} mr={2}/>
        <Skeleton w={50} h={50} mr={2}/>
        <Skeleton w={50} h={50} mr={2}/>
        <Skeleton w={50} h={50} mr={2}/> 
    </>
  );
}