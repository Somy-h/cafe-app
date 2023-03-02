import { post } from "./http-service";

import { loadStripe } from "@stripe/stripe-js";
import { API_URL } from "./auth-service";
import { cartItemT } from "../contexts/cart.context";

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export type addressT = {
  id: number;
  unit_num: string;
  street_num:string;
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  postal_code: string;
}

export type OnlineOrderT = {
  user_id: number;
  totalPrice: number;
  orderType: number;
  address: addressT;
  deliveryDate: Date;
  cartItems: CartItemT[];
}

export const createOrder = async (online_order: OnlineOrderT) : Promise<string> => {
  try {
    console.log(online_order.totalPrice);
    const {orderNumber} = await post(`${API_URL}/orders`, online_order);
    return orderNumber;
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};
