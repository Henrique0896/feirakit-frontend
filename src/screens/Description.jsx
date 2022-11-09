import { Box, VStack } from 'native-base';
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SizeButton from '../components/sizebutton/index';


export function Description() {


    return (
        <VStack style={styles.container}>
            <View/>
            <Image
        source={require('../assets/banana.png')}
        style={styles.image}
        resizeMode="cover"
        />
            <View style={{flexDirection: 'row', width: '100%'}}>
                <ScrollView horizontal>
                    <SizeButton>1</SizeButton>
                    <SizeButton bgColor= "#4B94F2" >2</SizeButton>
                    <SizeButton>3</SizeButton>
                    <SizeButton>4</SizeButton>
                    <SizeButton>5</SizeButton>
                </ScrollView>
            </View>
        <VStack>
            <Text style={[styles.banana, {fontSize: 30 }]}>Banana</Text>
        </VStack>
                <View>
                    <Text style={styles.valor}>R$ 8,00</Text>
                </View>


        
        
        
        
        
        
        
        
        </VStack>

        

        

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        backgroundColor: '#FFF'

    },
    image:{
        width: '100%',
        height: '30%',
        resizeMode: 'center',
        marginTop: 160


    },
    valor:{
        fontFamily: 'Montserrat_400Regular',
        fontSize: 30,
        paddingLeft: 450,
        marginTop: -60

        


    },
    banana:{
        fontFamily: 'Montserrat_400Regular',

        paddingLeft: 20,
        marginTop: -60



    }

});