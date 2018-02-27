import React, { Component } from 'react'
import { Animated } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { colors } from '../Theme';

const radius = 30

export default class DraggableLock extends Component {
    render(){
        return <Animated.View
            {...this.props}
            style={[{
                justifyContent: 'center',
                alignItems: 'center',
                width: radius * 2,
                height: radius * 2,
                backgroundColor:'red',
                borderRadius: radius,
                zIndex: 10,
            }, this.props.style]}>
            <Icon style={{
                fontSize: 40,
                color: colors.white
            }} name='unlock'/>
        </Animated.View>
    }
}
