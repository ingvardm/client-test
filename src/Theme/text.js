import fonts from './fonts'
import colors from './colors'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    title: {
        fontSize: 32,
        color: colors.black
    },
    small: {
        fontSize: 12
    },
    large: {
        fontSize: 18
    },
    medium: {
        fontSize: 14
    },
    centered: {
        textAlign: 'center'
    }
})