const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import * as Projet from '../JS/Projet.js'

export default class ListePublications extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        var listUser = []
        if(this.props.utilisateurs != null && this.props.utilisateurs != Projet.etiquettes.ENCHARGEMENT){
            listUser.push(this.props.utilisateurs)
            return(
                <View>
                <FlatList style={{marginTop: 12, flex: 1}} data={this.props.publications} renderItem={({item}) =>
                    <View style={Projet.styles.flexbox}>
                        <Text style={Projet.styles.flash}>ID: {item.id}</Text>
                        {listUser.map(util => util.items.map(info => info.id == item.utilisateur_id ? <View style={Projet.styles.flexbox}><Image style={Projet.styles.miniAvatar} source={info.avatar} ></Image> <Text style={Projet.styles.flash}>{info.nom}</Text></View> : <Text></Text>))}
                        <View>
                            <Text>dit: {item.corps}</Text>
                        </View>
                    </View>}
                /></View>
            )
        }else{
            return(
                <Text>Erreur1</Text>
            )
        }
    }
}