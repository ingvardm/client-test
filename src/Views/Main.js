import React, { Component } from 'react'
import { View, BackHandler } from 'react-native'
import { layout } from '../Theme'
import { LoginWidget, UserDetails, LogoWidget } from '../widgets'

const initialState = {
    loggedIn: false,
    user: {
        name: null,
        photo: null,
        signInMethod: null,
    }
}

export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = initialState
        this.LoginWidgetRef = null
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPressed)
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPressed)
    }

    onHardwareBackPressed = async () => {
        if (this.state.loggedIn) {
            let loggedOut = await this.LoginWidgetRef.logOut(this.state.user.signInMethod)
            if(loggedOut) this.reset()
            return true;
        }
        return false
    }
    
    reset = () => {
        this.setState(initialState)
    }

    onSuccess = user => {
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
                <LoginWidget onSuccess={this.onSuccess} onError={alert} onCreated={ref => this.LoginWidgetRef = ref}/>
            </View>
        )
    }
}
