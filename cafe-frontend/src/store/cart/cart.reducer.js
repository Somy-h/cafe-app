import { CART_ACTION_TYPE, ORDER_TYPE } from './cart.types';

const CART_INITIAL_STATE = {
  cartItems: [],
  orderType: ORDER_TYPE.PICKUP,
  deliveryDate: new Date(Date.now()),
};


export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPE.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPE.SET_ORDER_TYPE:
      return {
        ...state,
        orderType: payload,
      };
    case CART_ACTION_TYPE.SET_DELIVERY_DATE:
      return {
        ...state,
        deliveryDate: payload,
      };
    default:
      return state;
  }
};
