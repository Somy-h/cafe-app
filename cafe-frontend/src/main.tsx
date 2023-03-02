import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from 'react-redux';

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "./api-services/payment-service.ts"

import App from "./App";

import { store } from './store/store';

// import { UserProvider } from "./contexts/user.context";
// import { CartProvider } from "./contexts/cart.context";
import { MaterialTailwindControllerProvider } from "./contexts/tailwind.context";


import "./index.css";

export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MaterialTailwindControllerProvider>
          <BrowserRouter>
            {/* <CartProvider> */}
              {/* <UserProvider> */}
                {/* devtools */}
                <ReactQueryDevtools initialIsOpen={true} />
                <Elements stripe={stripePromise}>
                  <App />
                </Elements>
              {/* </UserProvider> */}
            {/* </CartProvider> */}
          </BrowserRouter>
        </MaterialTailwindControllerProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
