const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class ListePublications extends React.Component{
    
    constructor(props){
        super(props)
        this.state={}
    }
    
    render(){
        return(
            <View>
                <Text>Publications</Text>
            </View>
        )
    }
}