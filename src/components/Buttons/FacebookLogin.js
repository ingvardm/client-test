import React from 'react'
import Button from './Button'
import { buttons, colors } from '../../Theme'

export default function(props){
    return <Button
        icon='sc-facebook'
        {...props}
        style={[buttons.facebook, props.style]}/>
}