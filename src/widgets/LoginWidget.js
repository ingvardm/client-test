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
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk'
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
        this.handleLocked = false
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this.onHandleMove,
            onPanResponderRelease: this.onHandleRelease
        })
    }

    componentDidMount() {
        this.setupGoogleSignin()
        this.props.onCreated(this)
    }

    onHandleMove = (e, gesture) => {
        if(this.handleSticky || this.handleLocked) return
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
            }
        } else if (absoluteDelta < handleThreshold) {
            this.canVibrate = true
            Animated.event([null, {dx: this.state.offset.x}])(e, {dx})
        }

    }

    onHandleRelease = async (e, gesture) => {
        if(this.handleLocked) return
        let signedIn = false
        if(gesture.dx > triggerOffset) signedIn = await this.googleAuth().catch(e => console.log(e))
        if(gesture.dx < -triggerOffset) signedIn = await this.facebookAuth()
        if(signedIn) return 
        this.reset()
    }

    resetHandle(){
        Animated.spring(
            this.state.offset,
            { toValue: { x: 0, y: 0 } }
        ).start()
    }

    reset = () => {
        this.handleLocked = false,
        this.handleSticky = false,
        this.canVibrate = true
        this.resetHandle()
    }

    logOut = signInMethod => {
        if(signInMethod === 'Google'){
            return new Promise((res, rej) => {
                GoogleSignin.signOut()
                .then(() => {
                    this.reset()
                    res(true)
                })
                .catch(e => rej(e))
            })
        }
        else LoginManager.logOut()
        this.reset()
        return true
    }

    facebookAuth = async () => {
        let result = await LoginManager.logInWithReadPermissions(['public_profile'])
        if (!result.isCancelled) {
            let { accessToken } = await AccessToken.getCurrentAccessToken()
            return this.initUser(accessToken)
        }
    }

    initUser = async token => {
        let response = await fetch(FACEBOOK_API + token).catch(error => {
            this.props.onError(error)
            return false
        })
        let { error, name, id, picture } = await response.json()
        if(error){
            this.props.onError(error)
            return false
        }
        let user = {
            name,
            photo: picture.data.url,
            signInMethod: 'Facebook'
        }
        this.props.onSuccess(user)
        this.handleLocked = true
        return true
    }

    googleAuth = () => {
        return new Promise((res, rej) => {
            GoogleSignin.signIn()
                .then(({name, photo}) => {
                    res(true)
                    this.props.onSuccess({name, photo, signInMethod: 'Google'})
                    this.handleLocked = true
                })
                .catch(e => rej(e))
            }
        )
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
                <FacebookLoginButton animated onPress={this.facebookAuth} disabled={this.props.stickTo !== 'Facebook'}
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

                <GoogleLoginButton animated onPress={this.googleAuth} disabled={this.props.stickTo !== 'Google'}
                    style={{
                        backgroundColor: this.state.offset.x.interpolate(googleButtonColorInterpolation),
                        borderTopLeftRadius: this.state.offset.x.interpolate(positiveCornerRadiusInterpolation),
                        borderBottomLeftRadius: this.state.offset.x.interpolate(positiveCornerRadiusInterpolation),
                    }} />
            </View>
        )
    }
}

const noop = function(){}

LoginWidget.defaultProps = {
    onSuccess: noop,
    onError: noop,
    onCreated: noop
}