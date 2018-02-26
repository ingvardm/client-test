import React from 'react'
import Button from './Button'
import { buttons, colors } from '../../Theme'

export default function(props){
    return <Button
        title='Google'
        icon='social-google-plus'
        style={buttons.google}
        color={colors.google_red}
        {...props}/>
}