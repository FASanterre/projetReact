import React from 'react'
import{
    View,
    TextInput,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native'

import * as Projet from '../JS/Projet.js'
import logo from "../../assets/LogoPetitsGazouillis.png"
import ListeUtilisateurs from "../../Components/Listes/ListeUtilisateurs.js"
import ListePublications from "../../Components/Listes/ListePublications.js"

export default class Accueil extends React.Component{
    constructor(props){
        super(props)
        this.state={flash:"", utilisateurs:null, publications:null, utilisateur:this.props.utilisateur, jeton:"", filtre:"tout", page:1}
        this.uneFois = true;
        this.chargerTousLesUtilisateurs = Projet.chargerTousLesUtilisateurs.bind(this)
        this.chargerTousLesUtilisateurs(this)
        this.chargerToutesLesPublications = Projet.chargerToutesLesPublications.bind(this)
        this.chargerToutesLesPublications(this, this.state.page)
        this.pageSuivante = Projet.pageSuivante.bind(this)
        this.pagePrecedente = Projet.pagePrecedente.bind(this)
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
      
        
    }

    render(){
        return(
            <View style={Projet.styles.container}>
                <View>
                    <Image source={this.props.utilisateur.avatar} style={Projet.styles.avatar} />
                    <Text style={Projet.styles.flash} > Utilisateur : {this.props.utilisateur.nom}</Text>
                    <View style={Projet.styles.flexbox}>
                        <Text>Filtre :</Text>
                        <TouchableOpacity>
                            {this.state.filtre == "tout"  ? 
                            <Text onPress={() => Projet.changerFiltre(this)}>Tout</Text> 
                            : this.state.filtre == "miennes" ? <Text onPress={() => Projet.changerFiltre(this)}>Miennes</Text>
                            : <Text onPress={() => Projet.changerFiltre(this)}>Suivies</Text>}
                        </TouchableOpacity>
                    </View>
                    {this.state.publications == null && this.state.publications != Projet.etiquettes.ENCHARGEMENT  ? (<ActivityIndicator />) : (
                        this.state.publications != null && this.state.publications !=Projet.etiquettes.ENCHARGEMENT && this.state.filtre == "tout" ? <View style={Projet.styles.flexbox}>
                        <Text>Page {this.state.publications._meta.page} de {this.state.publications._meta.total_pages}</Text><br></br>
                        <TouchableOpacity>
                            {this.state.publications._links.precedent == null  ? 
                            <Text>Précédent</Text> 
                            : <Text onPress={() => this.pagePrecedente(this)}>Précédent</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this.state.publications._links.suivant == null  ? 
                            <Text>Suivant</Text> 
                            : <Text onPress={() => this.pageSuivante(this)}>Suivant</Text>}
                        </TouchableOpacity>
                    </View> : <Text><br></br></Text>
                    )}
                    
                    <ScrollView style={Projet.styles.scrollView}>
                        {/*this.state.utilisateurs == null && this.state.utilisateurs != Projet.etiquettes.ENCHARGEMENT ? (<ActivityIndicator />) : (
                            <ListeUtilisateurs utilisateurs={this.state.utilisateurs} />
                        )*/}
                        {this.state.publications == null && this.state.publications != Projet.etiquettes.ENCHARGEMENT ? (<ActivityIndicator />) : (
                            this.state.filtre == "tout" ? <ListePublications publications={this.state.publications} utilisateurs={this.state.utilisateurs} filtre={this.state.filtre}/>
                            : this.state.filtre == "miennes" ? <ListePublications publications={this.state.utilisateur.publications} utilisateurs={this.state.utilisateurs} filtre={this.state.filtre} utilisateur={this.state.utilisateur}/>
                            : <ListePublications publications={this.state.utilisateur.publications} utilisateurs={this.state.utilisateurs} filtre={this.state.filtre}/>
                        )}
                    </ScrollView>
                    <TouchableOpacity>
                        <Text style={Projet.styles.loginText} onPress={() => this.props.quitterSession()}>Quitter la session</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }

}