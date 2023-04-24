import { combineReducers } from 'redux';
import TempReducer from './tempReducer';
import authReducer from './authReducer';
import OrderReducer from './orderReducer';

export default combineReducers({
  temp: TempReducer,
  auth: authReducer,
  order: OrderReducer
});