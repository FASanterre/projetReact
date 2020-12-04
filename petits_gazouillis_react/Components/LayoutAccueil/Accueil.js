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
        this.state={premierefois:true, flash:"",utilisateurs:null, publications:null}
        this.chargerTousLesUtilisateurs = Projet.chargerTousLesUtilisateurs.bind(this)
        this.chargerTousLesUtilisateurs()
        this.chargerToutesLesPublications = Projet.chargerToutesLesPublications.bind(this)
        this.chargerToutesLesPublications()
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
      

    }

    render(){
        return(
            <View style={Projet.styles.container}>
                <View>
                    <Text style={Projet.styles.flash}>Accueil</Text>
                    <Image style={Projet.styles.logo} source={logo} />
                    <Image source={this.props.utilisateur.avatar} style={Projet.styles.avatar} />
                    <Text style={Projet.styles.flash} > Flash : {this.state.flash}</Text>
                    <Text style={Projet.styles.flash} > Utilisateur : {this.props.utilisateur.nom}</Text>
                    <Text style={Projet.styles.jeton} > Jeton : {this.props.jeton}</Text>
                    <ScrollView style={Projet.styles.ScrollView}>
                        {this.state.utilisateurs === null ? (<ActivityIndicator />) : (
                            <ListeUtilisateurs utilisateurs={this.state.utilisateurs} />
                        )}
                        {this.state.publications === null ? (<ActivityIndicator />) : (
                            <ListePublications publications={this.state.publications} />
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