import { StyleSheet } from 'react-native';
import * as yup from 'yup';

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2326E6",
    margin:10,
    width:1080,
    height:1920
  },
  containerAccueil:{
    backgroundColor: "#2326E6",
    margin:10,
    width:1080,
    height:1920
  },
  publications:{
    backgroundColor:"white",
    display: "flex",
    flexDirection: "row",
    flexWrap:"wrap",
    textAlignVertical:"center",
    margin:5
  },
  flexbox:{
    display: "flex",
    flexDirection: "row",
    flexWrap:"wrap",
    textAlignVertical:"center"
  },
  logo:{
    width:600,
    height:250,
    margin:50
  },
  avatar:{
    width:256,
    height:256,
    borderRadius:"50%"
  },
  miniAvatar:{
    width:100,
    height:100,
    margin:20,
    borderRadius: "50%"
  },
  miniAvatarListe:{
    width:80,
    height:80,
    margin:8,
    borderRadius: "50%"
  },
  flash:{
    fontSize:50,
    color:"white"
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
  quitButton:{
    width:"50%",
    backgroundColor:"#00a0d3",
    borderRadius:25,
    height:80,
    alignItems:"center",
    marginTop:40,
    marginTop:10,
    justifyContent:"center",
    fontSize:50,
    padding: 20,
    marginLeft: 240
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
    maxHeight: 650,
    height:650,
    width:1000,
    maxWidth: 950
  },
  txtPublications:{
    fontSize: 26,
    color: "blue",
    paddingTop: 50
  },
  nomPublication:{
    fontSize: 26,
    color: "#1BD6D9",
    paddingTop: 50
  },
  txtScrollView:{
    fontSize: 26,
    color: "grey",
    paddingTop: 50
  },
  txtPage:{
    fontSize:26,
    color:"white",
    textAlign:"center",
    paddingTop: 10
  },
  btnPage:{
    borderRadius:25,
    backgroundColor:"#00a0d3",
    display: "inline-block",
    padding: 5,
    height:50
  },
  btnActualiser:{
    borderRadius:25,
    backgroundColor:"#00a0d3",
    padding: 5,
    height:50,
    width:150
  },
  btnSocketGreen:{
    borderRadius:25,
    backgroundColor:"green",
    display: "inline-block",
    padding: 5,
    height:50,
    width:"80%"
  },
  btnSocketRed:{
    borderRadius:25,
    backgroundColor:"red",
    display: "inline-block",
    padding: 5,
    height:50,
    width:"80%"
  }
})

export const etiquettes={
  ENCHARGEMENT: "CHARGEMENT"
}

export var listUser = []
export var listCurrentUser = []
export var listPartisans = []

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

      var url = "http://127.0.0.1:5000/api/jeton_user/" + thisRef.state.jeton + "?page=2"
  
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

  export async function chargerToutesLesPublications(thisRef, page){
    if( this.props.jeton != ""){
      //alert("charger liste des publications ")
  
      var url = "http://127.0.0.1:5000/api/publications?page=" + page
      thisRef.setState({page: page})
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

  export async function suivreUtilisateur(thisRef, id){
    if(thisRef.props.jeton != ""){
      
      this.listPartisans.push(id)

      var url = "http://127.0.0.1:5000/api/suivre/" + id
      var obj={
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + thisRef.props.jeton
        },
      };
      var reponse = getJson(url,obj, thisRef, "Utilisateur suivi", "suivre")
    }
    else{
      this.setState({flash:"Impossible de suivre l'utilisateur selectionné"})
      alert("NON")
    }
  }

  export async function ne_plus_suivre(thisRef, id){
    if(thisRef.props.jeton != ""){
      for(var i = 0; i < this.listPartisans.length; i++){
        if(this.listPartisans[i] == id){
          this.listPartisans.splice(i,1)
        }
      }


      var url = "http://127.0.0.1:5000/api/ne_plus_suivre/" + id
      var obj={
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + thisRef.props.jeton
        },
      };
      var reponse = await getJson(url,obj, thisRef, "Utilisateur n'est plus suivi", "suivre")
    }
    else{
      this.setState({flash:"Impossible de suivre l'utilisateur selectionné"})
    }
  }

  export async function creerPublication(thisRef, id){
    if(thisRef.props.jeton != "" && id.trim() != ""){
      alert("YES")
      var url = "http://127.0.0.1:5000/api/publicationsCreer/\"" + id + "\""
      var obj={
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + thisRef.props.jeton
        },
      };
      var reponse = getJson(url,obj, thisRef, "Ajout de la publication", "suivre")
    }
    else{
      this.setState({flash:"Ajout non réussi"})
    }
  }

  export async function publier(thisRef, corps){
    if(thisRef.state.jeton != "" && corps.trim() != ""){
      var url = "http://127.0.0.1:5000/api/publications"
      var obj={
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + thisRef.state.jeton
        },
        body:JSON.stringify({
          jeton:thisRef.state.jeton,
          corps:corps
        })
      };
      var reponse = getJson(url, obj, thisRef, "publier " + corps, "suivre")
    }
    else {
      this.setState({flash: "Ajout non réussi"})
    }
  }

  export async function getJson(url, obj, thisRef, message, etat){
    try{
      thisRef.setState({flash:"",enChargement: true, [etat] :etiquettes.ENCHARGEMENT})
      let reponse = await fetch(url, obj)
      let reponseJson = await reponse.json()
      thisRef.setState({enChargement :false})
      if(typeof reponseJson.erreur === 'undefined'){
        thisRef.setState({[etat] :reponseJson[etat], flash :message})
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

  export function pageSuivante(thisRef){
    thisRef.chargerToutesLesPublications(thisRef, thisRef.state.page +1)
  }

  export function pagePrecedente(thisRef){
    thisRef.chargerToutesLesPublications(thisRef, thisRef.state.page -1)
  }
