import { createSelector } from 'reselect';

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectOrderType = createSelector(
  [selectCartReducer],
  (cart) => cart.orderType
);

export const selectDeliveryDate = createSelector(
  [selectCartReducer],
  (cart) => cart.deliveryDate
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total: number, item: CartItemT) =>
      total + parseInt(item.extraFormData.quantity),
    0
  )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce(
    (total: number, item: CartItemT) =>
      total + parseFloat(item.extraFormData.totalPrice),
    0
  )
);
