import React, { useEffect,  } from 'react';
import { Template } from '../../components';
import OrdersList from './ordersList';
import './viewOrders.css';
import { useDispatch } from 'react-redux';
import { fetchOrders } from '../../redux/actions/orderActions'


export default function ViewOrders(props){
    const dispatch = useDispatch();

    useEffect((orders) => {
        const loadOrders = async () => {
            dispatch(fetchOrders());
          };
          loadOrders();

    }, [dispatch]);

    return (
        <Template>
            <div className="container-fluid">
                <OrdersList />
            </div>
        </Template>
    );
}