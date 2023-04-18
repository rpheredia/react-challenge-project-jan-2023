import { ActionTypes } from './types';
import axios from 'axios';
import { SERVER_IP } from '../../private'


const setOrders = (orders) => {
    return {
        type: ActionTypes.SET_ORDERS,
        payload: orders
    };
};

export const fetchOrders = () => {
    return async (dispatch) => {
        const response = await axios
            .get(`${SERVER_IP}/api/current-orders`)
            .catch((err) => {
                console.log('Error getting orders1');
            });
        if (response.data.success) {
            dispatch(setOrders(response.data.orders));
        } else {
            console.log('Error getting orders');
        }
    };
}

export const addOrder = (orderItem, quantity, email) => {
    return async (dispatch) => {
        const order = {
            order_item: orderItem,
            quantity,
            ordered_by: email || 'Unknown!',
        };
        await axios.post(`${SERVER_IP}/api/add-order`, order)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    };
}

export const editOrder = (id, orderItem, quantity, email) => {
    return async (dispatch) => {
        const order = {
            id: id,
            order_item: orderItem,
            quantity,
            ordered_by: email || 'Unknown!',
        };
        await axios.post(`${SERVER_IP}/api/edit-order`, order)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    };
}


export const deleteOrder = (id, orders) => {
    return (dispatch) => {
        axios.post(`${SERVER_IP}/api/delete-order`, { id: id })
            .then(response => {
                const filteredOrders = orders.filter(order => order._id !== id);
                setOrders(filteredOrders);
            })
            .catch(error => console.error(error));
    };

}