import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import { images } from '../Theme'

export default class UserAvatar extends PureComponent {
    render(){
        return <Image {...this.props} style={[images.avatar, this.props.style]}/>
    }
}