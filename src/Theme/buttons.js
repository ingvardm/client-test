import colors, { facebook_blue, google_red } from './colors'
import { StyleSheet } from 'react-native'
import layout from './layout'

const buttons = {
    wrapper:{
        ...layout.row,
        height: 45,
    },
    content: {
        ...layout.row,
        ...layout.centered,
        flex:1
    },
    icon: {
        height: 35,
        width: 35,
        fontSize:32,
        color: colors.white
    },
    title: {
        color: colors.white,
        fontSize: 18,
        lineHeight: 18
    }
}

const round = {
    borderRadius: 22.5,
}

const social = {
    ...round,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent'
}

const facebook = {
    ...social,
    borderColor: colors.facebook_blue,
}

const google = {
    ...social,
    borderColor: colors.google_red,
}

export default StyleSheet.create({
    ...buttons,
    facebook,
    google
})