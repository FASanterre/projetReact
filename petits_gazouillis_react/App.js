import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import logo from './assets/LogoPetitsGazouillis.png'


export default class ExempleDeFetch extends React.Component{

  constructor(props){
    super(props);
    this.state = { enChargementJeton: true, reponseJsonJeton: "vide", enChargementUtilisateurs: true, reponseJsonUtilisateurs: "vide", enChargementPublications: true, reponseJsonPublications:"vide", utilisateur: "", motdepasse: ""}
  }

  componentDidMount(){
    var url = "http://127.0.0.1:5000/api/jeton"
    var infos = btoa("Ron:Password1");
    var obj = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/jason',
        'Authorization': 'Basic ' + infos,
      },
    };
    var jeton = getJson(url, obj, this, "jeton")
  }

  componentDidUpdate(){
    if(this.state.enChargementPublications){
      alert("did update:" + this.state.reponseJsonJeton.jeton)
      var url = "http://127.0.0.1:5000/api/publications"

      var obj = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/jason',
          'Authorization': 'Bearer ' + this.state.reponseJsonJeton.jeton,
        },
      };
      var publications = getJson(url, obj, this, "publications")

      var url = "http://127.0.0.1:5000/api/utilisateurs"

      var obj = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/jason',
          'Authorization': 'Bearer ' + this.state.reponseJsonJeton.jeton,
        },
      };
      var utilisateurs = getJson(url, obj, this, "utilisateurs")
    }
  }

  render(){
    /*if(this.state.enChargementJeton){
      alert("jeton en Chargement");
      return(
        <View>
          <Text>En chargement...</Text>
        </View>
      );
    }
    if((this.state.enChargementPublications == true) || (this.state.enChargementUtilisateurs == true)){
      alert("jeton chargé");
      return(
        <View>
          <Text>{this.state.reponseJsonJeton.jeton}</Text>
        </View>
      );
    }
    alert("jeton utilisateurs et publications chargés")
    return(
      <View>
        <Text>{this.state.reponseJsonJeton.jeton}</Text>
        <Text>Utilisateurs[0]:{this.state.reponseJsonUtilisateurs.items[0].nom}</Text>
        <Image style={{width:400, height:300}} source={this.state.reponseJsonUtilisateurs.items[0].avatar} />
        <Text>Publications[0]:{this.state.reponseJsonPublications.items[0].corps}</Text>
      </View>
    )*/
    return (
      <View style={styles.container}>
        <Image
          source={logo} style={styles.logo}        
        />

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Utilisateur..."
            placeholderTextColor="#bbbbbb"
            onChangeText={text => this.setState({utilisateur:text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput 
            style={styles.inputText}
            placeholder="Mot de passe..."
            placeholderTextColor="#bbbbbb"
            onChangeText={text => this.setState({motdepasse:text})}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.nouvelUtilisateur}>Nouvel utilisateur</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Établir une session</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e4256",
    margin:10,
    width:540,
    height:960
  },
  logo:{
    width:300,
    height:125,
    margin:25
  },
  inputView:{
    width:"80%",
    backgroundColor:"#00a0d3",
    borderRadius:13,
    height:40,
    marginBottom:10,
    justifyContent:"center",
    padding:10
  },
  inputText:{
    height:25,
    color:"white",
    fontSize:25
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#00a0d3",
    borderRadius:13,
    height:40,
    alignItems:"center",
    marginTop:20,
    marginTop:5,
    justifyContent:"center"
  },
  loginText:{
    fontSize:25
  },
  nouvelUtilisateur:{
    fontSize:25,
    color:"white"
  }
})

async function getJson(url,obj,etats,etat){
  try{
    let reponse = await fetch(url, obj );
    let reponseJson = await reponse.json();
    setEtats(etats,etat,reponseJson)
    return(reponseJson);
  }catch(erreur){
    console.log(erreur)
  }
}

function setEtats(etats, etat, reponseJson){
  switch(etat){
    case("jeton"):
      etats.setState(
        {
          enChargementJeton: false,
          reponseJsonJeton: reponseJson
        },
        function(){}
      );
      break;
      case("utilisateurs"):
        etats.setState(
        {
          enChargementUtilisateurs: false,
          reponseJsonUtilisateurs: reponseJson
        },
        function(){}
        );
        break;
      case("publications"):
        etats.setState(
        {
          enChargementPublications: false,
          reponseJsonPublications: reponseJson
        },
        function(){}
        );
        break;
  }
}