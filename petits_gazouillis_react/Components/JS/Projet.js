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
  flexbox:{
    display: "flex",
    flexDirection: "row",
    flexWrap:"wrap"
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
  miniAvatar:{
    width:100,
    height:100,
    margin:20
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
  },
  scrollView:{
    maxHeight: 600,
    maxWidth: 920
  }
})

export const etiquettes={
  ENCHARGEMENT: "CHARGEMENT"
}

export function setStateParent(etat, valeur){
  this.setState({[etat]: valeur})
}

export function afficherStateParent(etat){
  alert("afficher parent etat:" + etat + " valeur:" + this.state[etat])
}

export function naviguer(destination){
  this.setState({"layout": destination})
}

export function changerFiltre(thisRef){
  if(thisRef.state.filtre == "tout"){
    thisRef.setState({filtre: "miennes"})
  }
  else if(thisRef.state.filtre == "miennes"){
    thisRef.setState({filtre: "suivies"})
  }else{
    thisRef.setState({filtre: "tout"})
  }
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

    var reponse = getJson(url, obj, thisRef, "Utilisateur et mot de passe valides", "jeton")
}



export async function chargerUtilisateur(thisRef){
    if( thisRef.state.jeton != ""){
      alert("charger utilisateur")

      var url = "http://127.0.0.1:5000/api/jeton_user/" + thisRef.state.jeton
  
      var obj={
        method : 'GET',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + thisRef.state.jeton
        },
      };
      var reponse = getJson(url,obj, thisRef, "Utilisateur chargé.", "utilisateur")
    }else{
      this.setState({flash:"impossible de charger un utilisateur. Pas de jeton."})
    }
  }

  export async function chargerTousLesUtilisateurs(thisRef){
    if( this.props.jeton != ""){
      alert("charger liste des utilisateurs "  + this.props.jeton)
  
      var url = "http://127.0.0.1:5000/api/utilisateurs"
  
      var obj={
        method : 'GET',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.jeton
        },
      };
      var reponse = getJson(url, obj, thisRef, "Utilisateurs chargés.", "utilisateurs")
    }else{
      this.setState({flash:"impossible de charger la liste des utilisateurs. Pas de jeton."})
    }
  }

  export async function chargerToutesLesPublications(thisRef){
    if( this.props.jeton != ""){
      alert("charger liste des publications")
  
      var url = "http://127.0.0.1:5000/api/publications"
  
      var obj={
        method : 'GET',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.jeton
        },
      };
      var reponse = getJson(url,obj, thisRef, "Publications chargées.", "publications")
    }else{
      this.setState({flash:"impossible de charger la liste des publications. Pas de jeton."})
    }
  }

  export async function getJson(url, obj, thisRef, message, etat){
    try{
      thisRef.setState({enChargement: true})
      thisRef.setState({flash:""})
      thisRef.setState({[etat] :etiquettes.ENCHARGEMENT})
      let reponse = await fetch(url, obj)
      let reponseJson = await reponse.json()
      thisRef.setState({enChargement :false})
      if(typeof reponseJson.erreur === 'undefined'){
        thisRef.setState({[etat] :reponseJson[etat]})
        thisRef.setState({flash :message})
        //alert(reponseJson[etat] + " " + etat)
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