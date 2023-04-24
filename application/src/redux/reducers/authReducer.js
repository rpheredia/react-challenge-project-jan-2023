import { LOGIN, LOGOUT, LOGIN_ERR, LOGIN_RESET } from '../actions/types'

const INITIAL_STATE = { email: null, token: null, error: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, email: action.payload.email, token: action.payload.token }
        case LOGOUT:
            return { ...state, ...INITIAL_STATE }
        case LOGIN_ERR:
            return { ...state, error: action.payload }
        case LOGIN_RESET:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}