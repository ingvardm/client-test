import React, { PureComponent } from 'react'
import { fonts, text } from '../Theme'
import { Text } from 'react-native'

export default class _Text extends PureComponent {
    render(){
        return <Text {...this.props} style={[fonts.regular, this.props.style]}/>
    }
}