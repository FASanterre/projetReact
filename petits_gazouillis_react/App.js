import React from 'react'
import{
View,
TextInput,
Button,
ActivityIndicator,
StyleSheet,
Image,
TouchableOpacity,
Text
} from 'react-native'

import * as Projet from "./Components/JS/Projet.js"

import Login from "./Components/LayoutLogin/Login.js"
import Accueil from "./Components/LayoutAccueil/Accueil.js"



export default class PetitGazouillis extends React.Component{
  constructor(props){
      super(props);

      this.state ={jeton:"", utilisateur:"", layout:"login"};

      this.setStateParent = Projet.setStateParent.bind(this)
      this.afficherStateParent = Projet.afficherStateParent.bind(this)
      this.quitterSession = Projet.quitterSession.bind(this)
      this.naviguer = Projet.naviguer.bind(this)
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    
  }


  render(){
      if(this.state.layout == "accueil"){
        return(
          <Accueil utilisateur={this.state.utilisateur} jeton={this.state.jeton} quitterSession={this.quitterSession} naviguer={this.naviguer}/>
        )
      }
      else{
        return(
          <Login setStateParent={this.setStateParent} afficherStateParent={this.afficherStateParent} />
        )
      }
  }
}



