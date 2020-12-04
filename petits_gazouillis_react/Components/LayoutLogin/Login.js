import React from 'react'
import{
    View,
    TextInput,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'

import { Formik } from 'formik'

import * as Projet from '../JS/Projet.js'

import logo from '../../assets/LogoPetitsGazouillis.png'
import anonyme from '../../assets/icon.png'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={anonyme:true, logue: false, flash:"",jeton:"", utilisateur:null, enChargement:false};
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
      if(this.state.anonyme && this.state.jeton != ""){
        var jeton = this.state.jeton
        this.props.setStateParent("jeton", jeton)
        this.setState({anonyme: false})
        Projet.chargerUtilisateur(this)
      }

      if( (this.state.logue == false) && (this.state.utilisateur != null) && (typeof this.state.utilisateur !== 'undefined')){
        this.state({logue:true})

        var utilisateur = this.state.utilisateur
        this.props.setStateParent("utilisateur", utilisateur)
        this.props.setStateParent("layout", "accueil")
      }
    }

    render(){
          return(
              <View style={Projet.styles.container}>
                  <Image source={logo} style={Projet.styles.logo}/>
                  {/*<Image source={anonyme} style={Projet.styles.avatar}/>*/}
                  <Text style={Projet.styles.flash} >Flash : {this.state.flash}</Text><br />

                  <Formik
                  initialValues={{ nom: '', mdp:''}}
                  onSubmit={(values, actions) =>{
                    Projet.chargerJeton(values, this)
                  }}

                  validationSchema={Projet.validationSchema}
                  >
                    {formikProps =>(
                      <React.Fragment>
                        <View style={Projet.styles.inputView}>
                          <TextInput style={Projet.styles.inputText} placeholder="Utilisateur..." placeholderTextColor="#bbbbbb" onChangeText={formikProps.handleChange('nom')} />
                        </View>
                        <Text style={Projet.styles.erreur}>{formikProps.errors.nom}</Text>
                        <View style={Projet.styles.inputView}>
                          <TextInput secureTextEntry={true} style={Projet.styles.inputText} placeholder="Mot de passe..." placeholderTextColor="#bbbbbb" onChangeText={formikProps.handleChange('mdp')}/>
                        </View>
                        <Text style={Projet.styles.erreur}>{formikProps.errors.mdp}</Text>
                        <TouchableOpacity>
                          <Text style={Projet.styles.nouvelUtilisateur}>Nouvel utilisateur</Text>
                        </TouchableOpacity>

                          {this.state.enChargement ? (<ActivityIndicator />) : (
                            <TouchableOpacity style={Projet.styles.loginBtn}>
                              <Text style={Projet.styles.loginText} onPress={formikProps.handleSubmit}>Établir une session</Text>
                            </TouchableOpacity>
                          )}
                      </React.Fragment>
                    )}
                  </Formik>
              </View>
          )
      }
}