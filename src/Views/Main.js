import React, { Component } from 'react'
import { View } from 'react-native'
import { layout } from '../Theme'
import { LoginWidget, UserDetails, LogoWidget } from '../widgets'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            user: {}
        }
    }

    _onSuccess = user => {
        console.log(user)
        this.setState({
            loggedIn: true,
            user
        })
    }

    render() {
        return (
            <View style={{...layout.container, justifyContent: 'flex-end'}}>
                <LogoWidget/>
                <UserDetails user={this.state.user} loggedIn={this.state.loggedIn}/>
                <LoginWidget onSuccess={this._onSuccess}/>
            </View>
        )
    }
}
