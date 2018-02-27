import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'
import { colors, layout, text } from '../Theme'
import Icon from 'react-native-vector-icons/EvilIcons'
import { Text } from '../components'

export default class UserDetails extends PureComponent {
    render(){
        return <View style={{...layout.container, ...layout.centered, ...layout.padding_thick}}>
            {this.props.loggedIn
                ? <Image source={{uri: this.props.user.photo}} style={{height: 100, width: 100, borderRadius: 50}}/>
                : <View style={{
                    ...layout.centered,
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    marginBottom: layout.padding_thick.padding,
                    backgroundColor: colors.grey}}><Icon name={'lock'} style={{
                    fontSize: 100,
                    color: colors.white}}/></View>}
            <Text style={[text.centered, text.medium]}>{this.props.user.name || 'To sign in, drag the lock onto an authentication method of your choise'}</Text>
            <Text style={[text.centered, text.small]}>{`Signed in with ${this.props.user.signInMethod}`}</Text>
        </View>
    }
}

UserDetails.defaultProps = {
    user: {},
    loggedIn: false
}