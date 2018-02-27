import { StyleSheet } from 'react-native'
import layout from './layout'

const widgets = StyleSheet.create({
    login_widget: {
        ...layout.padding_thick,
        ...layout.centered,
        ...layout.row,
        width: '100%',
        justifyContent: 'space-between'
    },
    user_details_widget: {
        ...layout.container,
        ...layout.centered,
        ...layout.padding_thick
    },
    logo_widget: {
        ...layout.centered,
        ...layout.padding_thick
    }
})

export default widgets