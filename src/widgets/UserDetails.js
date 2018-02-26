import React, { PureComponent } from 'react'
import { View, Image } from 'react-native'

export default class UserDetails extends PureComponent {
    render(){
        return <View>
            <Image source={this.props.user.image}/>
            <Text>{this.props.user.name}</Text>
        </View>
    }
}