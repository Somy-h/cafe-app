export type CartItemT = {
  categoryItem: CategoryItemT;
  extraFormData: ExtraFormDataT;
};



export enum OrderType {
  PICKUP = 0,
  DELIVERY,
}

export const ORDER_TYPE: OrderType = {
  PICKUP: 0,
  DELIVERY: 1,
};

export const CART_ACTION_TYPE = {
  SET_CART_ITEMS: "cart/SET_CART_ITEMS",
  SET_CART_COUNT: "cart/SET_CART_COUNT",
  SET_CART_TOTAL: "cart/SET_CART_TOTAL",
  SET_ORDER_TYPE: "cart/SET_ORDER_TYPE",
  SET_DELIVERY_DATE: "cart/SET_DELIVERY_DATE",
  INCREASE_QTN: "cart/INCREASE_QTN",
  DECREASE_QTN: "cart/DECREASE_QTN",
};
