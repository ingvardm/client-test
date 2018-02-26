import React, { Component } from 'react'
import {
    Text,
    View,
} from 'react-native'
import FBSDK from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import Icon from 'react-native-vector-icons/Foundation'
import { GoogleLoginButton } from '../components'
import { widgets } from '../Theme';

export default class LoginWidget extends Component {
    componentDidMount() {
        this.setupGoogleSignin()
    }

    googleAuth = () => {
        GoogleSignin.signIn()
            .then((user) => {
                this.props.onSuccess(user)
            })
            .catch(e => {
                this.props.onError && this.props.onError(e)
            })
            .done()
    }

    async setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true })
            GoogleSignin.configure({
                webClientId: '348983491451-mctpnhse5uepbe12k3nnlfnsvpotc4pk.apps.googleusercontent.com',
                offlineAccess: false
            })
        }
        catch (err) {
            console.log("Google signin error", err.code, err.message)
        }
    }

    render() {
        return (
            <View style={widgets.login_widget}>
                <Text>Please login using one of the following methods</Text>
                <GoogleLoginButton onPress={this.googleAuth}/>
                <GoogleLoginButton onPress={this.googleAuth}/>
            </View>
        )
    }
}

LoginWidget.defaultProps = {
    onSuccess: function(){},
    onError: null
}