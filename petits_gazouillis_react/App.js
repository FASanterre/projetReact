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
import { Formik } from 'formik'
import * as yup from 'yup'

import logo from './assets/LogoPetitsGazouillis.png'
import anonyme from './assets/icon.png'

const validationSchema = yup.object().shape({
  nom: yup
    .string()
    .required('Veuillez entrer votre nom.')
    .label('nom'),
  mdp: yup
    .string()
    .required('Veuillez entrer votre mot de passe.')
    .label('mdp')
})

/*export default class ExempleDeFetch extends React.Component{

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
}*/

async function chargerUtilisateur(thisRef){
  if( thisRef.state.jeton != ""){
    alert("charger jeton")

    var url = "http://127.0.0.1:5000/api/jeton_user/" + thisRef.state.jeton

    var obj={
      method : 'GET',
      headers : {
        Accept : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + thisRef.jeton
      },
    };
  }
}

export default class ExFormix extends React.Component{
  constructor(props){
      super(props);

      this.state ={flash:"", jeton:"", utilisateur:"", enChargement:false, anonyme:true};
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    if(this.state.anonyme && this.state.jeton != ""){
      this.setState({anonyme :false})
      chargerUtilisateur(this)
    }
  }

  chargerJeton(valeurs,thisRef){
    var nom_mdp = valeurs["nom"] + ":" + valeurs["mdp"];
    var nom_mdp_base64 = btoa(nom_mdp);

    var url = "http://127.0.0.1:5000/api/jeton"
    var obj = {
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic' + nom_mdp_base64
      },
    };
    alert(nom_mdp)

    var reponse = getJson(url, obj, thisRef, "Utilisateur et mot de passe valides", "jeton")
  }

  quitterSession(thisRef){
    thisRef.setState({anonyme:true})
    thisRef.setState({jeton:""})
    thisRef.setState({utilisateur:""})
    thisRef.setState({flash:""})

  }

  render(){
      if(this.state.anonyme || typeof this.state.utilisateur === 'undefined'){
          return(
              <View style={styles.container}>
                  <Image source={logo} style={styles.logo}/>
                  <Image source={anonyme} style={styles.avatar}/>
                  <Text style={styles.flash} >Flash : {this.state.flash}</Text><br />

                  <Formik
                  initialValues={{ nom: '', mdp:''}}
                  onSubmit={(values, actions) =>{
                    this.chargerJeton(values, this)
                  }}

                  validationSchema={validationSchema}
                  >
                    {formikProps =>(
                      <React.Fragment>
                        <View style={styles.inputView}>
                          <TextInput style={styles.inputText} placeholder="Utilisateur..." placeholderTextColor="#bbbbbb" onChangeText={formikProps.handleChange('nom')} />
                        </View>
                        <Text style={styles.erreur}>{formikProps.errors.nom}</Text>
                        <View style={styles.inputView}>
                          <TextInput secureTextEntry={true} style={styles.inputText} placeholder="Mot de passe..." placeholderTextColor="#bbbbbb" onChangeText={formikProps.handleChange('mdp')}/>
                        </View>
                        <Text style={styles.erreur}>{formikProps.errors.mdp}</Text>
                        <TouchableOpacity>
                          <Text style={styles.nouvelUtilisateur}>Nouvel utilisateur</Text>
                        </TouchableOpacity>

                          {this.state.enChargement ? (<ActivityIndicator />) : (
                            <TouchableOpacity style={styles.loginBtn}>
                              <Text style={styles.loginText} onPress={formikProps.handleSubmit}>Établir une session</Text>
                            </TouchableOpacity>
                          )}
                      </React.Fragment>
                    )}
                  </Formik>
              </View>
          )
      }
      else{
        return(
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Image source={this.state.utilisateur.avatar} style={styles.avatar} />
            <Text style={styles.flash}>Flash : {this.state.flash}</Text>
            <Text style={styles.flash}>Utilisateur : {this.state.utilisateur.nom}</Text>
            <Text style={styles.jeton}>Jeton : {this.state.jeton}</Text>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText} onPress={ () => this.quitterSession(this)}>Quitter la session</Text>
            </TouchableOpacity>
          </View>
        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e4256",
    margin:10,
    width:1080,
    height:1920
  },
  logo:{
    width:600,
    height:250,
    margin:50
  },
  avatar:{
    width:256,
    height:256,
    margin:50
  },
  flash:{
    fontSize:50,
    color:"black"
  },
  inputView:{
    width:"80%",
    backgroundColor:"#00a0d3",
    borderRadius:25,
    height:80,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white",
    fontSize:50
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#00a0d3",
    borderRadius:25,
    height:80,
    alignItems:"center",
    marginTop:40,
    marginTop:10,
    justifyContent:"center"
  },
  loginText:{
    fontSize:50
  },
  nouvelUtilisateur:{
    fontSize:50,
    color:"white"
  },
  jeton:{
    fontSize:30,
    color:"black"
  },
  erreur:{
    fontSize:50,
    color:"red"
  }
})

/*async function getJson(url,obj,etats,etat){
  try{
    let reponse = await fetch(url, obj );
    let reponseJson = await reponse.json();
    setEtats(etats,etat,reponseJson)
    return(reponseJson);
  }catch(erreur){
    console.log(erreur)
  }
}*/

async function getJson(url, obj, thisRef, message, etat){
  try{
    thisRef.setState({enChargement :true})
    thisRef.setState({flash :""})
    thisRef.setState({[etat] :""})
    let reponse = await fetch(url, obj)
    let reponseJson = await reponse.json()
    thisRef.setState({enChargement :false})
  
    if(typeof reponseJson.erreur === 'undefined'){
      thisRef.setState({[etat] :reponseJson[etat]})
      thisRef.setState({flash :message})
    }
    else {
      thisRef.setState({flash: reponseJson.erreur})
    }
    return (reponseJson) 
  } 
  catch(erreur) {
    console.error(erreur)
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