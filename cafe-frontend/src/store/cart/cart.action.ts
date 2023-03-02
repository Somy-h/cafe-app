import { CART_ACTION_TYPE, CartItemT } from "./cart.types";

const addCartItem = (cartItems: CartItemT[], newCartItem: CartItemT) => {
  return [...cartItems, { ...newCartItem }];
};

const removeCartItem = (
  cartItems: CartItemT[],
  removeItem: CartItemT,
  removeIndex: number
) => {
  return cartItems.filter((cartItem, idx) => idx !== removeIndex);
};

const getNewTotalPrice = (
  total: number,
  qnt: number,
  newQnt: number
): number => {
  return (total * newQnt) / qnt;
};

export const addItemToCart = (cartItems: CartItemT[], newCartItem: CartItemT) => {
  const updatedCartItem = addCartItem(cartItems, newCartItem);
  return ({
    type: CART_ACTION_TYPE.SET_CART_ITEMS,
    payload: updatedCartItem,
  });
}

export const removeItemFromCart = (
  cartItems: CartItemT[],
  removeItem: CartItemT,
  removeIndex: number
) => {
  const updatedCartItem = removeCartItem(cartItems, removeItem, removeIndex);
  return {
    type: CART_ACTION_TYPE.SET_CART_ITEMS,
    payload: updatedCartItem,
  };
}; 

export const clearItemFromCart = () => ({
  type: CART_ACTION_TYPE.SET_CART_ITEMS,
  payload: [],
});

export const setOrderType = (orderTypeValue:number) => ({
  type: CART_ACTION_TYPE.SET_ORDER_TYPE,
  payload: orderTypeValue,
});

export const setDeliveryDate = (dateValue: Date) => ({
  type: CART_ACTION_TYPE.SET_DELIVERY_DATE,
  payload: dateValue,
});

export const increaseQuantity = (
  cartItems: CartItemT[],
  itemId: number,
  itemIndex
) => {
  const updatedCartItem = cartItems.map((cartItem: CartItemT, idx: number) =>
    idx === itemIndex && cartItem.categoryItem.id === itemId
      ? {
          ...cartItem,
          extraFormData: {
            ...cartItem.extraFormData,
            quantity: cartItem.extraFormData.quantity + 1,
            totalPrice: getNewTotalPrice(
              cartItem.extraFormData.totalPrice,
              cartItem.extraFormData.quantity,
              cartItem.extraFormData.quantity + 1
            ),
          },
        }
      : cartItem
  );
  return {
    type: CART_ACTION_TYPE.SET_CART_ITEMS,
    payload: updatedCartItem,
  };
}; 

export const decreaseQuantity = (
  cartItems: CartItemT[],
  itemId: number,
  itemIndex
) => {
  const updatedCartItem = cartItems.map((cartItem: CartItemT, idx: number) =>
    idx === itemIndex && cartItem.categoryItem.id === itemId
      ? {
          ...cartItem,
          extraFormData: {
            ...cartItem.extraFormData,
            quantity: cartItem.extraFormData.quantity - 1,
            totalPrice: getNewTotalPrice(
              cartItem.extraFormData.totalPrice,
              cartItem.extraFormData.quantity,
              cartItem.extraFormData.quantity - 1
            ),
          },
        }
      : cartItem
  );
  return {
    type: CART_ACTION_TYPE.SET_CART_ITEMS,
    payload: updatedCartItem,
  };
}; 