import React from 'react';
import { View, Text, Image } from 'react-native';


export default class ExempleDeFetch extends React.Component{

  constructor(props){
    super(props);
    this.state = { enChargementJeton: true, reponseJsonJeton: "vide", enChargementUtilisateurs: true, reponseJsonUtilisateurs: "vide", enChargementPublications: true, reponseJsonPublications:"vide"}
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
    if(this.state.enChargementJeton){
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
    )
  }
}

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