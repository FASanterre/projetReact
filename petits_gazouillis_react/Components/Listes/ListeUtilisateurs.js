const { Component } = require("react");

import React from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

import * as Projet from '../JS/Projet.js'

export default class ListeUtilisateurs extends React.Component{
    constructor(props){
        super(props)
        this.state={suivre:"", start:0}
    }


    render(){
        if(this.props.utilisateurs != null && this.props.utilisateurs != Projet.etiquettes.ENCHARGEMENT){
            if(this.state.start == 0){
                Projet.listUser.push(this.props.utilisateurs)
                Projet.listCurrentUser.push(this.props.utilisateur)
                alert("Rentre une fois")
                Projet.listCurrentUser[0].partisans.forEach(element => {
                    Projet.listPartisans.push(element)
                });
                this.setState({start:1})
            }
            return(
                <View>
                    <Text style={Projet.styles.txtScrollView}>Non partisans ({Projet.listUser[0].items.length - Projet.listPartisans.length - 1})</Text>
                    <br></br>
                    <View style={Projet.styles.flexbox}>
                        {Projet.listUser.map(util => util.items.map(info => Projet.listPartisans.includes(info.id) || Projet.listCurrentUser[0].id == info.id ? null : <View style={Projet.styles.flexbox}><TouchableOpacity onPress={() => Projet.suivreUtilisateur(this,info.id)}><Image  style={Projet.styles.miniAvatarListe} source={info.avatar} /></TouchableOpacity></View> ))}
                    </View>
                    <Text style={Projet.styles.txtScrollView}>Partisans ({Projet.listPartisans.length})</Text>
                    <br></br>
                    <View style={Projet.styles.flexbox}>
                        {Projet.listUser.map(util => util.items.map(info => Projet.listPartisans.includes(info.id) ? <View style={Projet.styles.flexbox}><TouchableOpacity onPress={() => Projet.ne_plus_suivre(this,info.id)}><Image  style={Projet.styles.miniAvatarListe} source={info.avatar} /></TouchableOpacity></View> : null ))}
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