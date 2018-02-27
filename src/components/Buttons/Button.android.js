import React, { PureComponent } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import { buttons, layout, colors } from '../../Theme'

export default class Button extends PureComponent {
    render(){
        return (
            <Animated.View style={[buttons.wrapper, this.props.style]}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(this.props.color, true)} onPress={this.props.onPress}>
                    <View style={buttons.content}>
                        {this.props.icon && <Icon style={[buttons.icon, {color: this.props.color}]} name={this.props.icon} />}
                        {this.props.title && <Text style={[buttons.title, {color: this.props.color}]}>{this.props.title}</Text>}
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        )
    }
}

Button.defaultProps = {
    onPress: function(){},
    title: null,
    icon: null,
    style: null,
    color: colors.white
}