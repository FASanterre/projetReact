import { StyleSheet } from 'react-native';
import * as yup from 'yup';

export const styles = StyleSheet.create({
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

export function setStateParent(etat, valeur){
  this.setState({[etat]: valeur})
}

export function afficherStateParent(etat){
  alert("afficher parent etat:" + etat + " valeur:" + this.state[state])
}

export function naviguer(){

}



export function quitterSession(){
    alert("Quitter session")
    this.setState({"layout":"login"})
}

export async function chargerJeton(valeurs,thisRef){
    var nom_mdp = valeurs["nom"] + ":" + valeurs["mdp"];
    var nom_mdp_base64 = btoa(nom_mdp);

    var url = "http://127.0.0.1:5000/api/jeton"
    var obj = {
      method: 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + nom_mdp_base64
      },
    };
    alert(nom_mdp)

    var reponse = getJson(url, obj, thisRef, "Utilisateur et mot de passe valides", "jeton")
}



export async function chargerUtilisateur(thisRef){
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

  export async function getJson(url, obj, thisRef, message, etat){
    try{
      thisRef.setState({enChargement: true})
      thisRef.setState({flash:""})
      thisRef.setState({[etat] :""})
      alert(obj.headers.Authorization)
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

  export const validationSchema = yup.object().shape({
    nom: yup
      .string()
      .required('Veuillez entrer votre nom.')
      .label('nom'),
    mdp: yup
      .string()
      .required('Veuillez entrer votre mot de passe.')
      .label('mdp')
  })