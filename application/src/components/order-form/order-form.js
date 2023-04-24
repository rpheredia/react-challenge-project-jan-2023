import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Template } from '../../components';
import { connect } from 'react-redux';
import './orderForm.css';
import { addOrder, editOrder } from '../../redux/actions/orderActions'

const mapActionsToProps = dispatch => ({
    addOrder(order_item, quantity, ordered_by) {
      dispatch(addOrder(order_item, quantity, ordered_by))
    },
    editOrder(id, order_item, quantity, ordered_by) {
        dispatch(editOrder(id, order_item, quantity, ordered_by))
    }
  })

const OrderForm = (props) => {
    const params = props.history.location.state;
    const orderItemParam = params ? (params.order_item ? params.order_item : "") : "";
    const quantityParam = params ? (params.quantity ? params.quantity : "") : "";
    const id = params ? (params._id ? params._id : "") : "";
    const isEdit = id ? true : false;

    const [orderItem, setOrderItem] = useState(orderItemParam);
    const [quantity, setQuantity] = useState(quantityParam);

    const menuItemChosen = (event) => setOrderItem(event.target.value);
    const menuQuantityChosen = (event) => setQuantity(event.target.value);

    const auth = useSelector((state) => state.auth);

    const submitOrder = () => {
        if (orderItem === "") return;
        isEdit ? props.editOrder(id, orderItem, quantity, auth.email || 'Unknown!') : 
        props.addOrder(orderItem, quantity, auth.email || 'Unknown!');
    }

    return (
        <Template>
            <div className="form-wrapper">
                <form>
                    <label className="form-label">{isEdit ? 'Edit Order' : `I'd like to order...`}</label><br />
                    <select
                        value={orderItem}
                        onChange={(event) => menuItemChosen(event)}
                        className="menu-select"
                    >
                        <option value="" defaultValue disabled hidden>Lunch menu</option>
                        <option value="Soup of the Day">Soup of the Day</option>
                        <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                        <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                        <option value="Chili Con Carne">Chili Con Carne</option>
                    </select><br />
                    <label className="qty-label">Qty:</label>
                    <select value={quantity} onChange={(event) => menuQuantityChosen(event)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button type="button" className="order-btn" onClick={() => submitOrder()}>{isEdit ? 'Update' : 'Order It!'}</button>
                </form>
            </div>
        </Template>
    )
}

export default connect(null, mapActionsToProps)(OrderForm);