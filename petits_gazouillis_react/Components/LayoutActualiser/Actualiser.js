import React from 'react'
import{
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import io from 'socket.io-client'
import * as Projet from '../JS/Projet.js'

const SOCKET_URL = 'http://127.0.0.1:5000/chat'

export default class Actualiser extends React.Component{
    constructor(props){
        super(props)
        this.state={message:"?", connected:false, nouveau:false, id:99, nb_nouvelles:0}
        this.u = this.props.utilisateurs
        this.socket = this.initialiser()
    }

    actualiser(){
        this.setState({nouveau:false, nb_nouvelles:0, message:"aucun nouveau message"})
        this.props.action()
    }

    initialiser(){
        var socket = null
        socket = io(SOCKET_URL)

        return socket;
    }

    componentDidMount(){
        this.connexion()
    }

    connexion = () =>{
        if(this.socket){
            this.setState({
                message:"connexion établie",
                connected:true
            })

            this.socket.on('nouvelle_publication', data =>{
                var n = this.state.nb_nouvelles + 1
                this.setState({
                    message:data.corps,
                    id:data.id,
                    nouveau:true,
                    nb_nouvelles:n
                })
            })
        }
        else {
            this.setState({
                message:"problème deconnexion",
                connected: false
            })
        }
    }

    render(){
        var id = this.state.id
        var listUser = []
        if(this.state.u != null && this.state.u != Projet.etiquettes.ENCHARGEMENT){
            listUser.push(this.state.u.items)
        }
        return(
            <View>
                {this.state.nouveau == false ? (<TouchableOpacity style={Projet.styles.btnSocketGreen} disabled={true} onPress={() => {
                        this.actualiser()
                    }}>
                    <Text  style={Projet.styles.txtPage}>{this.state.message}</Text>
                </TouchableOpacity>) : (
                    <TouchableOpacity style={Projet.styles.btnSocketRed} onPress={() => {
                        this.actualiser()
                    }}>
                        {/*<Image style={Projet.styles.miniAvatar} source={listUser[id - 1].avatar}/>*/}
                        <Text  style={Projet.styles.txtPage}>{this.state.message} ({this.state.nb_nouvelles})</Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}