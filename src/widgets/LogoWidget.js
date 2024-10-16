import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { widgets, text } from '../Theme'
import { Text } from '../components'

export default class LogoWidget extends PureComponent {
    render(){
        return <View style={widgets.logo_widget}>
            <Text style={text.title}>Jusmin</Text>
            <Text style={text.small}>JUst Sign Me IN!</Text>
            <Text style={text.small}>Made with ❤ by Igor.</Text>
        </View>
    }
}