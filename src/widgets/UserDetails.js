import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { colors, layout, text, widgets } from '../Theme'
import Icon from 'react-native-vector-icons/EvilIcons'
import { Text, UserAvatar, UserAvatarLocked } from '../components'

export default class UserDetails extends Component {
    render(){
        if(this.props.loggedIn) return (
            <View style={widgets.user_details_widget}>
                <UserAvatar source={{uri: this.props.user.photo}}/>
                <Text style={[text.centered, text.medium]}>{this.props.user.name}</Text>
                <Text style={[text.centered, text.small]}>{`Signed in with ${this.props.user.signInMethod}`}</Text>
            </View>
        )
        else return (
            <View style={widgets.user_details_widget}>
                 <UserAvatarLocked/>
                <Text style={[text.centered, text.medium]}>{'To sign in, drag the lock onto an authentication method of your choise'}</Text>
            </View>
        )
    }
}

UserDetails.defaultProps = {
    user: {},
    loggedIn: false
}