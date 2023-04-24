import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = { email: null, token: null, isAuth: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, email: action.payload.login, token: action.payload.token, isAuth: true }
        case LOGOUT:
            return { ...state, email: null, token: null, isAuth: false }
        default:
            return state;
    }
}