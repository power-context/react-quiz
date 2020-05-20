//import axios from 'axios'
import fire from '../../fireConfig'
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

export default function auth(email, password, isLogin){
    return async dispatch => {
    // const authData = {
    //   email,
    //   password,
    //   //returnSecureToken: true
    // }

    //let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxKu0C6JpPx8tDFf_YDieuEfMwChf3r80`

    // if(isLogin){
    //     url = `https://identitytoolkit.googleapis.com/v1accounts:signInWithPassword?key=AIzaSyCxKu0C6JpPx8tDFf_YDieuEfMwChf3r80`
    // }
    
    //const responce = await axios.post(url, authData)

    await fire.auth().signInWithEmailAndPassword(email, password)
    .then(r => {
        const idToken = r.user.i.u
        const signTime = new Date(r.user.metadata.lastSignInTime).getTime()
        const userId = r.user.$.W
        const expiresIn = 3600
        const expirationDate = +signTime + expiresIn * 1000

        addDataToLocaleStorage(idToken, userId, expirationDate)

        console.log(idToken)
        console.log(signTime)
        console.log(userId)

        dispatch(authSuccess(idToken))
        dispatch(autoLogout(expiresIn))
    })
    .catch(e => console.log(e))
    }

    function addDataToLocaleStorage(idToken, userId, expirationDate){
        localStorage.setItem('Token', idToken)
        localStorage.setItem('UserID', userId)
        localStorage.setItem('Expiration date', expirationDate)
    }
    
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

export function logout(){
    localStorage.removeItem('Token')
    localStorage.removeItem('UserID')
    localStorage.removeItem('Expiration date')
    return{
        type: AUTH_LOGOUT
    }
}

export function autoLogout(timer){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timer * 1000)
    }
}