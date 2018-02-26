import React, { Component } from 'react'
import { View } from 'react-native'
import { layout } from '../Theme'
import { LoginWidget } from '../widgets'

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            user: {}
        }
    }

    _onSuccess = user => {
        this.setState({
            loggedIn: true,
            user
        })
    }

    render() {
        return (
            <View style={{...layout.container}}>
                <LoginWidget onSuccess={this._onSuccess}/>
            </View>
        )
    }
}
