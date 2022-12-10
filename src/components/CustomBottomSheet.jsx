import React from 'react';
import { Heading, HStack, VStack,useTheme } from 'native-base';
import{MaterialIcons} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';
export function CustomBottomSheet({actionGallery,actionCamera}) {

  const { colors } = useTheme();
  return (
    <HStack justifyContent='center' >
        <VStack w='45%' h='90%' alignItems='center' justifyContent='center'>
          <TouchableOpacity onPress={actionCamera}>
           <MaterialIcons name='camera-alt' size={70} color={colors.blue[700]}/>
           <Heading color={colors.blue[700]}>Câmera</Heading>
           </TouchableOpacity>
        </VStack>
        <VStack w='45%' h='90%' alignItems='center' justifyContent='center'>
          <TouchableOpacity onPress={actionGallery}>
           <MaterialIcons name='photo' size={70} color={colors.blue[700]} />
           <Heading color={colors.blue[700]}>Galeria</Heading>
           </TouchableOpacity>
        </VStack>
    </HStack>
  );
}