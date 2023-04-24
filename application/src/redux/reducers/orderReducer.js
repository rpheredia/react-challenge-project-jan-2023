import { ActionTypes } from '../actions/types';

const initialState = {
    orders: [],
    loading: true
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ORDERS:
            return {
                ...state,
                orders: payload
            };
        default:
            return state;
    };
};

