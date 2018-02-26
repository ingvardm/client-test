import { StyleSheet } from 'react-native'
import layout from './layout'

const widgets = StyleSheet.create({
    login_widget: {
        ...layout.padding_thick,
        ...layout.container,
    }
})

export default widgets