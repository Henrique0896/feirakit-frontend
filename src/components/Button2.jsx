import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

export default function Button() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnContainer}>
                <Text style={styles.title}>COMPRAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnContainer:{
        width: '80%',
        height: 70,
        backgroundColor: '#038C8C',
        borderRadius: 15,
        marginVertical: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#F2f2f2',
        fontFamily: 'Montserrat_700Bold'
    }
})