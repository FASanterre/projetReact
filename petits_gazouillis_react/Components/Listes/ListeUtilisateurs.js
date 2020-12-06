const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import * as Projet from '../JS/Projet.js'

export default class ListeUtilisateurs extends React.Component{
    constructor(props){
        super(props)
        this.state={suivre:"", liste:[], start:0}
    }


    render(){
        var listUser = []
        var listCurrentUser = []
        if(this.props.utilisateurs != null && this.props.utilisateurs != Projet.etiquettes.ENCHARGEMENT){
            listUser.push(this.props.utilisateurs)
            listCurrentUser.push(this.props.utilisateur)
            if(this.state.start == 0){
                alert("Rentre une fois")
                listCurrentUser[0].partisans.forEach(element => {
                    this.state.liste.push(element)
                });
                this.setState({start:1})
            }
            return(
                <View>
                    <Text style={Projet.styles.txtScrollView}>Non partisans ({listUser[0].items.length - this.state.liste.length - 1})</Text>
                    <br></br>
                    <View style={Projet.styles.flexbox}>
                        {listUser.map(util => util.items.map(info => this.state.liste.includes(info.id) || listCurrentUser[0].id == info.id ? null : <View style={Projet.styles.flexbox}><TouchableOpacity onPress={() => Projet.suivreUtilisateur(this,info.id)}><Image  style={Projet.styles.miniAvatarListe} source={info.avatar} /></TouchableOpacity></View> ))}
                    </View>
                    <Text style={Projet.styles.txtScrollView}>Partisans ({this.state.liste.length})</Text>
                    <br></br>
                    <View style={Projet.styles.flexbox}>
                        {listUser.map(util => util.items.map(info => this.state.liste.includes(info.id) ? <View style={Projet.styles.flexbox}><TouchableOpacity onPress={() => Projet.ne_plus_suivre(this,info.id)}><Image  style={Projet.styles.miniAvatarListe} source={info.avatar} /></TouchableOpacity></View> : null ))}
                    </View>
                    <br></br>
                </View>
            )
        }else{
            return(
                <Text>Erreur</Text>
            )
        }
    }
}