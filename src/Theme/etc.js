import { StyleSheet } from 'react-native'
import layout from './layout'
import colors from './colors'

export default StyleSheet.create({
    avatar_locked: {
        ...layout.centered,
        backgroundColor: colors.grey
    },
    lock_icon: {
        fontSize: 100,
        color: colors.white
    }
})