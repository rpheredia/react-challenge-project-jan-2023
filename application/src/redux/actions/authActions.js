import { LOGIN, LOGOUT, LOGIN_ERR, LOGIN_RESET } from './types';
import axios from 'axios';
import { SERVER_IP } from '../../private'

const finishLogin = (email, token) => {
    return {
        type: LOGIN,
        payload: {
            email,
            token,
        }
    }
}

const loginError = (err) => {
    return {
        type: LOGIN_ERR,
        payload: err
    }
}

export const loginUser = (email, password) => {
    return async (dispatch) => {
        await fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(response => {
            if (response.success) {
                dispatch(finishLogin(response.email, response.token));
            } else {
                dispatch(loginError(response.error));
            }
        }).catch(error => {
            dispatch(loginError(error.message));
        })
    };
}

export const logoutUser = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}

export const resetLogin = () => {
    return {
        type: LOGIN_RESET,
        payload: null,
    }
}

export const createUser = (email, password) => {

    return async (dispatch) => {
        const account = {
            email: email,
            password: password
        };
        await axios.post(`${SERVER_IP}/api/add-account`, account)
            .then(response => console.log('resp' + response))
            .catch(error => console.error('err' + error));
    };
}