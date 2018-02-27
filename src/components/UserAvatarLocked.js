import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { images, etc, colors } from '../Theme'
import Icon from 'react-native-vector-icons/EvilIcons'

export default class UserAvatarLocked extends PureComponent {
    render(){
        return <View style={[images.avatar, etc.avatar_locked]}>
            <Icon name={'lock'} style={etc.lock_icon}/>
        </View>
    }
}