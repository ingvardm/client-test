import colors, { facebook_blue, google_red } from './colors'
import { StyleSheet } from 'react-native'
import layout from './layout'

const buttons = {
    wrapper:{
        ...layout.row,
        height: 60,
    },
    content: {
        ...layout.row,
        ...layout.centered,
        flex:1
    },
    icon: {
        fontSize: 40,
        color: colors.white,
    },
    title: {
        color: colors.white,
        fontSize: 18,
        lineHeight: 18
    }
}

const round = {
    borderRadius: 30,
}

const social = {
    ...round,
    width: 60,
}

const facebook = {
    ...social,
    backgroundColor: colors.facebook_blue,
}

const google = {
    ...social,
    backgroundColor: colors.google_red,
}

const draggable_lock = {
    ...social,
    ...layout.centered,
    height: buttons.wrapper.height
}

export default StyleSheet.create({
    ...buttons,
    facebook,
    google,
    social,
    draggable_lock
})