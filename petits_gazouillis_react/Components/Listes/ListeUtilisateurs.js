const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';

import * as Projet from '../JS/Projet.js'

export default class ListeUtilisateurs extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
            return(
                <View>
                    <Text></Text>
                </View>
                /*<View>
                <FlatList 
                style={{marginTop: 12, flex: 1}}
                data={this.props.utilisateurs.items}
                renderItem={({item}) => 
                    <View>
                        <Image source={item.avatar} style={Projet.styles.miniAvatar}/>
                        <Text style={Projet.styles.flash}>Nom: {item.nom}</Text><br/>
                    </View>}
                /></View>*/
            )
    }
}