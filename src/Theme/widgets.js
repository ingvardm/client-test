import { StyleSheet } from 'react-native'
import layout from './layout'

const widgets = StyleSheet.create({
    login_widget: {
        ...layout.padding_thick,
        ...layout.container,
        ...layout.centered,
        ...layout.row,
        flex:1,
        justifyContent: 'space-between'
    }
})

export default widgets