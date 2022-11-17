import React from 'react';
import {View, StyleSheet, Text } from 'react-native';

export default function SizeButton(props) {
    return (
        <View style={style.container}>
            <Text style={StyleSheet.text}>
                {props.children}

            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: '#D8D8DD',
        borderWidth: 3,
        marginHorizontal: 5,
        marginVertical: 50,
        marginRight: 10,
        marginLeft: 10,


    }

})