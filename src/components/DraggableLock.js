import React, { Component } from 'react'
import { Animated } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { colors, buttons } from '../Theme';

const radius = 30

export default class DraggableLock extends Component {
    render(){
        return <Animated.View {...this.props} style={[buttons.draggable_lock, this.props.style]}>
            <Icon style={buttons.icon} name='unlock'/>
        </Animated.View>
    }
}
