import { AnyAction } from 'redux';

import { ORDER_TYPE, CartItemT } from './cart.types';
import { setCartItems, setOrderType, setDeliveryDate} from './cart.action';

type CartState = {
  cartItems: CartItemT[],
  orderType: ORDER_TYPE,
  deliveryDate: Date
}

export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  orderType: ORDER_TYPE.PICKUP,
  deliveryDate: new Date(Date.now()),
};

export const cartReducer = (
  state = CART_INITIAL_STATE, 
  action = {} as AnyAction 
) => {

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (setOrderType.match(action)) {
    return {
      ...state,
      orderType: action.payload,
    };
  }

  if (setDeliveryDate.match(action)) {
    return {
      ...state,
      deliveryDate: action.payload,
    };
  }

  return state;
};