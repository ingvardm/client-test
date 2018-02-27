import React from 'react'
import Button from './Button'
import { buttons, colors } from '../../Theme'

export default function(props){
    return <Button
        icon='sc-google-plus'
        {...props}
        style={[buttons.google, props.style]}/>
}