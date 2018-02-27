import React, { Component } from 'react'
import {
    Text,
    View,
    PanResponder,
    Animated,
    Easing,
    Dimensions,
    StyleSheet,
    Vibration
} from 'react-native'
import FBSDK, { LoginManager, AccessToken, setAvatar } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import { GoogleLoginButton, DraggableLock, FacebookLoginButton } from '../components'
import { widgets, colors, buttons, layout } from '../Theme'
import { FACEBOOK_API, GOOGLE_WEBCLIENT_ID } from '../config'

const screenWidth = Dimensions.get('window').width
const handleWidth = StyleSheet.flatten(buttons.social).width
const containerPadding = StyleSheet.flatten(widgets.login_widget).padding
const handleCenterToScreenEdgeLimit = containerPadding + handleWidth * 1.5
const handleThreshold = screenWidth / 2 - handleCenterToScreenEdgeLimit
const handleThresholdOffset = 10
const handleThresholdWithOffset = handleThreshold + handleThresholdOffset
const triggerOffset = handleThreshold + handleThresholdOffset / 2

const positiveCornerRadiusInterpolation = {
    inputRange: [handleThreshold, handleThresholdWithOffset],
    outputRange: [handleWidth / 2, 0],
    extrapolate: 'clamp'
}

const negativeCornerRadiusInterpolation = {
    inputRange: [-handleThresholdWithOffset, -handleThreshold],
    outputRange: [0, handleWidth / 2],
    extrapolate: 'clamp'
}

const googleButtonColorInterpolation = {
    inputRange: [handleThreshold, handleThresholdWithOffset],
    outputRange: [colors.grey, colors.google_red],
    extrapolate: 'clamp'
}

const facebookButtonColorInterpolation = {
    inputRange: [-handleThresholdWithOffset, -handleThreshold],
    outputRange: [colors.facebook_blue, colors.grey],
    extrapolate: 'clamp'
}

const handleColorInterpolation = {
    inputRange: [-handleThresholdWithOffset, 0, handleThresholdWithOffset],
    outputRange: [colors.facebook_blue, colors.google_green, colors.google_red],
    extrapolate: 'clamp'
}

export default class LoginWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offset: new Animated.ValueXY(),
        }
        this.canVibrate = true
        this.handleSticky = false
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this.onHandleMove,
            onPanResponderRelease: this.onHandleRelease
        })
    }

    onHandleMove = (e, gesture) => {
        let absoluteDelta = Math.abs(gesture.dx)
        let dxSign = Math.sign(gesture.dx)
        let dx = Math.min(absoluteDelta, handleThresholdWithOffset) * dxSign

        if (absoluteDelta > triggerOffset) {
            if(this.canVibrate){
                this.canVibrate = false
                Vibration.vibrate(25)
            }
            if(!this.handleSticky){
                this.handleSticky = true
                Animated.timing(
                    this.state.offset,
                    {
                        toValue: {x: handleThresholdWithOffset * dxSign, y: 0},
                        duration: 100,
                        easing: Easing.linear
                    }
                ).start()
            } else {
                dx = handleThresholdWithOffset * dxSign
            }
        } else if (absoluteDelta < handleThreshold) {
            this.canVibrate = true
            this.handleSticky = false
        }

        Animated.event([null, {dx: this.state.offset.x}])(e, {dx})
    }

    onHandleRelease = (e, gesture) => {
        if (gesture.dx > triggerOffset) {
            this.googleAuth()
        }
        else if (gesture.dx < -triggerOffset) {
            this.facebookAuth()
        }
        Animated.spring(
            this.state.offset,
            { toValue: { x: 0, y: 0 } }
        ).start()
    }

    componentDidMount() {
        this.setupGoogleSignin()
    }

    facebookAuth = async () => {
        let result = await LoginManager.logInWithReadPermissions(['public_profile'])
        if (!result.isCancelled) {
            let { accessToken } = await AccessToken.getCurrentAccessToken()
            this.initUser(accessToken)
        }
    }

    initUser = async token => {
        let response = await fetch(FACEBOOK_API + token).catch(error => {
            this.props.onError && this.props.onError(error)
        })
        let { error, name, id, picture } = await response.json()
        if(error) his.props.onError && this.props.onError(error)
        let user = {
            name,
            photo: picture.data.url,
            signInMethod: 'Facebook'
        }
        this.props.onSuccess(user)
    }

    googleAuth = async () => {
        let {name, photo, error} = await GoogleSignin.signIn()
        if(error && this.props.onError) return this.props.onError(error)
        this.props.onSuccess({name, photo, signInMethod: 'Google'})
    }

    async setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true })
            GoogleSignin.configure({
                webClientId: GOOGLE_WEBCLIENT_ID,
                offlineAccess: false
            })
        }
        catch (error) {
            alert("Google signin error " + error.message)
        }
    }

    render() {
        return (
            <View style={widgets.login_widget}>
                <FacebookLoginButton animated onPress={this.facebookAuth}
                    style={{
                        backgroundColor: this.state.offset.x.interpolate(facebookButtonColorInterpolation),
                        borderTopRightRadius: this.state.offset.x.interpolate(negativeCornerRadiusInterpolation),
                        borderBottomRightRadius: this.state.offset.x.interpolate(negativeCornerRadiusInterpolation)
                    }} />

                <DraggableLock
                    {...this.panResponder.panHandlers}
                    style={{
                        transform: this.state.offset.getTranslateTransform(),
                        backgroundColor: this.state.offset.x.interpolate(handleColorInterpolation),
                        borderTopLeftRadius: this.state.offset.x.interpolate(negativeCornerRadiusInterpolation),
                        borderBottomLeftRadius: this.state.offset.x.interpolate(negativeCornerRadiusInterpolation),
                        borderTopRightRadius: this.state.offset.x.interpolate(positiveCornerRadiusInterpolation),
                        borderBottomRightRadius: this.state.offset.x.interpolate(positiveCornerRadiusInterpolation)
                    }}
                    horizontal />

                <GoogleLoginButton animated onPress={this.googleAuth}
                    style={{
                        backgroundColor: this.state.offset.x.interpolate(googleButtonColorInterpolation),
                        borderTopLeftRadius: this.state.offset.x.interpolate(positiveCornerRadiusInterpolation),
                        borderBottomLeftRadius: this.state.offset.x.interpolate(positiveCornerRadiusInterpolation),
                    }} />
            </View>
        )
    }
}

LoginWidget.defaultProps = {
    onSuccess: function () { },
    onError: null
}