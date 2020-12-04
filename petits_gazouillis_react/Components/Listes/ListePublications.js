const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import * as Projet from '../JS/Projet.js'

export default class ListePublications extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <FlatList style={{marginTop: 12, flex: 1}} data={this.props.publications.items} renderItem={({item}) =>
            <View>
                <Text style={Projet.styles.flash}>Corps: {item.corps}</Text><br/>
            </View>}/>
        )
    }
}