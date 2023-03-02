import { post } from "./http-service";
import { API_URL } from "./auth-service";

import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export const createPaymentIntent = async (orderTotal:number) => {
  try {
    return await post(`${API_URL}/payment`, { amount: Number.parseInt(orderTotal) });
  } catch (err) {
    return {
      data: [],
      error: err,
    };
  }
};
