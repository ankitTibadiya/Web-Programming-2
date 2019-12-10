import firebase  from '../../index'
import { firestore } from 'firebase'

export const login = (credentials) => {
    return (dispatch, getState) => {
        
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({type: 'LOGIN_FAILURE', err})
        })
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        
        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS' })
        })
    }
}

export const signUp = (newUser) => {
    console.log('newUser',newUser)
    return (dispatch, getState) => {
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore().collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch(err => {
            dispatch({type: 'SIGNUP_FAILURE', err})
        })
    }
}