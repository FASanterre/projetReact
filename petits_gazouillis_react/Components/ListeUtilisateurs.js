const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
export default class ListeUtilisateurs extends React.Component{
    render(){
        return(
            <View style={{ margin:50 }}>
                <Text style={styles.text}>Harry Potter</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        margin: 5, height:30,padding:5
    },
    image:{
        width:100,height:100
    }
})