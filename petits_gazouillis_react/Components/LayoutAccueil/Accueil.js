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
        this.state={flash:"", utilisateurs:null, publications:null, utilisateur:this.props.utilisateur, jeton:this.props.jeton, filtre:"tout", page:1, actualiser:"", newPost:""}
        this.uneFois = true;
        this.chargerTousLesUtilisateurs = Projet.chargerTousLesUtilisateurs.bind(this)
        this.chargerTousLesUtilisateurs(this)
        this.chargerToutesLesPublications = Projet.chargerToutesLesPublications.bind(this)
        this.chargerToutesLesPublications(this, this.state.page)
        this.pageSuivante = Projet.pageSuivante.bind(this)
        this.pagePrecedente = Projet.pagePrecedente.bind(this)
    }


    render(){
        return(
            <View style={Projet.styles.container}>
                <View>
                    <Image source={this.props.utilisateur.avatar} style={Projet.styles.avatar} />
                    <Text style={Projet.styles.flash} > {this.props.utilisateur.nom}</Text>
                    
                    <View style={Projet.styles.inputView}>
                          <TextInput style={Projet.styles.inputText} placeholder="Message de la publication..." placeholderTextColor="#bbbbbb" onChangeText={(text) => this.setState({newPost:text})} />
                    </View>
                    <TouchableOpacity style={Projet.styles.btnPage} onPress={() => Projet.creerPublication(this,this.state.newPost)} style={Projet.styles.btnPage}>
                            <Text style={Projet.styles.txtPage}>Publier</Text>
                    </TouchableOpacity>
                    {this.state.utilisateurs == null && this.state.utilisateurs != Projet.etiquettes.ENCHARGEMENT ? (<ActivityIndicator />) : (
                            <ListeUtilisateurs  utilisateurs={this.state.utilisateurs} utilisateur={this.state.utilisateur} jeton={this.state.jeton} />
                    )}
                    <View style={Projet.styles.flexbox}>
                        <Text style={Projet.styles.txtPage}>Filtre :</Text>
                        <TouchableOpacity onPress={() => Projet.changerFiltre(this)} style={Projet.styles.btnPage}>
                            {this.state.filtre == "tout"  ? 
                            <Text style={Projet.styles.txtPage} >Tout</Text> 
                            : this.state.filtre == "miennes" ? <Text style={Projet.styles.txtPage} >Miennes</Text>
                            : <Text style={Projet.styles.txtPage} >Suivies</Text>}
                        </TouchableOpacity>
                    </View>
                    {this.state.publications == null && this.state.publications != Projet.etiquettes.ENCHARGEMENT  ? (<ActivityIndicator />) : (
                        this.state.publications != null && this.state.publications !=Projet.etiquettes.ENCHARGEMENT && this.state.filtre == "tout" ? <View style={Projet.styles.flexbox}>
                        <Text style={Projet.styles.txtPage}>Page {this.state.publications._meta.page} de {this.state.publications._meta.total_pages}</Text><br></br>
                        <TouchableOpacity style={Projet.styles.btnPage}>
                            {this.state.publications._links.precedent == null  ? 
                            <Text style={Projet.styles.txtPage}>Précédent</Text> 
                            : <Text style={Projet.styles.txtPage} onPress={() => this.pagePrecedente(this)}>Précédent</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={Projet.styles.btnPage}>
                            {this.state.publications._links.suivant == null  ? 
                            <Text style={Projet.styles.txtPage}>Suivant</Text> 
                            : <Text style={Projet.styles.txtPage} onPress={() => this.pageSuivante(this)}>Suivant</Text>}
                        </TouchableOpacity><br></br>
                    </View> : <Text><br></br></Text>
                    )}
                    <View>
                        <TouchableOpacity style={Projet.styles.btnActualiser}>
                            <Text style={Projet.styles.txtPage} >Actualiser</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={Projet.styles.scrollView}>
                        
                        {this.state.publications == null && this.state.publications != Projet.etiquettes.ENCHARGEMENT ? (<ActivityIndicator />) : (
                            this.state.filtre == "tout" ? <ListePublications publications={this.state.publications} utilisateurs={this.state.utilisateurs} filtre={this.state.filtre}/>
                            : this.state.filtre == "miennes" ? <ListePublications publications={this.state.utilisateur.publications} utilisateurs={this.state.utilisateurs} filtre={this.state.filtre} utilisateur={this.state.utilisateur}/>
                            : <ListePublications publications={this.state.utilisateur.publications} utilisateurs={this.state.utilisateurs} filtre={this.state.filtre}/>
                        )}
                    </ScrollView>
                    <TouchableOpacity style={Projet.styles.quitButton}>
                        <Text style={Projet.styles.txtPage} onPress={() => this.props.quitterSession()}>Quitter la session</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }

}