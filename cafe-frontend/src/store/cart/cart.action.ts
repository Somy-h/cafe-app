import { CART_ACTION_TYPE, CartItemT } from "./cart.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../utils/reducer.utils";

const addCartItem = (cartItems: CartItemT[], newCartItem: CartItemT) : CartItemT[] => {
  return [...cartItems, { ...newCartItem }];
};

const removeCartItem = (
  cartItems: CartItemT[],
  removeItem: CartItemT,
  removeIndex: number
) : CartItemT[] => {
  return cartItems.filter((cartItem, idx) => idx !== removeIndex);
};

const getNewTotalPrice = (
  total: number,
  qnt: number,
  newQnt: number
): number => {
  const fixedString = Number.parseFloat((total * newQnt) / qnt).toFixed(2);
  return Number.parseFloat(fixedString);
}; 

export type addItemToCartT = ActionWithPayoad<CART_ACTION_TYPE.SET_CART_ITEMS, CartItemT[], CartItemT>;
export type setCartItemsT = ActionWithPayoad<CART_ACTION_TYPE.SET_CART_ITEMS, CartItemT[], CartItemT, number>;
export type clearItemFromCartT = ActionWithPayload<CART_ACTION_TYPE.SET_CART_ITEMS, []>;
export type setOrderTypeT = ActionWithPayload<CART_ACTION_TYPE.SET_ORDER_TYPE, number>;
export type setDeliveryDateT = ActionWithPayload<CART_ACTION_TYPE.SET_DELIVERY_DATE, Data>;


export const setCartItems = withMatcher((cartItems: CartItemT[]) =>
  createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems));

export const addItemToCart =  (cartItems: CartItemT[], newCartItem: CartItemT) => {
  const updatedCartItem = addCartItem(cartItems, newCartItem);
  // return createAction(
  //   CART_ACTION_TYPE.SET_CART_ITEMS,
  //   updatedCartItem
  // );
  return setCartItems(updatedCartItem);
}

export const removeItemFromCart = (
  cartItems: CartItemT[],
  removeItem: CartItemT,
  removeIndex: number
) => {
  const updatedCartItem = removeCartItem(cartItems, removeItem, removeIndex);
  // return createAction(
  //   CART_ACTION_TYPE.SET_CART_ITEMS,
  //   updatedCartItem
  // );
  return setCartItems(updatedCartItem);
}; 

// export const clearItemFromCart = () => createAction(
//   type: CART_ACTION_TYPE.SET_CART_ITEMS,
//   payload: []
// );

// export const clearItemFromCart = withMatcher (() => createAction(
//   CART_ACTION_TYPE.SET_CART_ITEMS, []
// ));

export const clearItemFromCart = () => setCartItems([]);

export const setOrderType = withMatcher ((orderTypeValue:number) => createAction(
  CART_ACTION_TYPE.SET_ORDER_TYPE,
  orderTypeValue
));

export const setDeliveryDate = withMatcher ((dateValue: Date) => createAction(
  CART_ACTION_TYPE.SET_DELIVERY_DATE,
  dateValue
));

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
  // return createAction(
  //   CART_ACTION_TYPE.SET_CART_ITEMS,
  //   updatedCartItem
  // );
  return setCartItems(updatedCartItem);
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
  // return createAction(
  //   CART_ACTION_TYPE.SET_CART_ITEMS,
  //   updatedCartItem
  // );
  return setCartItems(updatedCartItem);
};