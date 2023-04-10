import React from 'react';
import { Link } from "react-router-dom";
import { SERVER_IP } from '../../private';

const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;
const OrdersList = (props) => {
    let { orders } = props;
    if (!props || !props.orders || !props.orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    const deleteOrder = (id) => {
        if (id === "") return;
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                orders = orders.filter((order) => order._id !== id);
                console.log("Success", JSON.stringify(response))
            })
            .catch(error => console.error(error));
    }

    return orders.map(order => {
        const createdDate = new Date(order.createdAt);
        return (
            <div className="row view-order-container" key={order._id}>
                <div className="col-md-4 view-order-left-col p-3">
                    <h2>{order.order_item}</h2>
                    <p>Ordered by: {order.ordered_by || ''}</p>
                </div>
                <div className="col-md-4 d-flex view-order-middle-col">
                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                    <p>Quantity: {order.quantity}</p>
                </div>

                <div className="col-md-4 view-order-right-col">
                    <Link to={{ pathname: "/order", state: order }} >
                        <button className="btn btn-success">Edit</button>
                    </Link>
                    <button onClick={() => deleteOrder(order._id)} className="btn btn-danger">Delete</button>
                </div>
            </div>
        );
    });
}

export default OrdersList;