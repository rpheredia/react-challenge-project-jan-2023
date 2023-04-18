import React from 'react';
import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import { deleteOrder } from '../../redux/actions/orderActions'

const mapActionsToProps = dispatch => ({
    deleteOrder(id, orders) {
        dispatch(deleteOrder(id, orders))
    }
})

const OrdersList = (props) => {
    const orders = useSelector(state => state.order.orders);
    
    if (!orders || !orders.length) return (
        <div className="empty-orders">
            <h2>There are no orders to display</h2>
        </div>
    );

    const deleteOrder = (id) => {
        if (id === "") return;
        props.deleteOrder(id, orders);
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

export default connect(null, mapActionsToProps)(OrdersList);