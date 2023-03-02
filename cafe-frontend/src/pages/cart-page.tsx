//import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   CartContext,
//   CartContextT,
//   CartItemT,
// } from "../contexts/cart.context";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectOrderType,
  selectDeliveryDate,
} from "../store/cart";

import CheckoutItem from "../components/checkout-item.component";

import { Sidenav, OrderNavbar } from "../components/layout";
import CartSideView from "../components/cart-side-view.component";
import PaymentForm from "../components/payment-form.component";
import { TAX } from "./checkout.page";
import {
  useMaterialTailwindController,
  setOpenCartView,
} from "../contexts/tailwind.context";
import {
  Alert,
  Button,
  Typography,
} from "@material-tailwind/react";



//import { CartItemT, useQueryClientData, useQueryCartData } from "../hooks";

export function CartPage() {

  // const {
  //   orderType,
  //   cartItems,
  //   cartTotal,
  //   deliveryDate,
  // } = useContext(CartContext) as CartContextT;
  const orderType = useSelector(selectOrderType);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const deliveryDate = useSelector(selectDeliveryDate);

  const navigate = useNavigate();

  // const displaySelectedExtraItems = (cartItem) => {
  //   cartItem.extraFormData.selectedExtraItems.map((item: ExtraAddT) => (
  //     <Typography key={item.name} variant='small' color='gray' className='mx-2'>
  //       {item.name} (${item.price})
  //     </Typography>
  //   ));
  // }

  //const deleteCartItem = (cartItem: CartItemT) => {};

   
  const displayCartItems = cartItems.map((cartItem: CartItemT, idx: number) => (
    <CheckoutItem key={cartItem.categoryItem.id} cartItem={cartItem} itemIndex={idx}/>
  ));

  const displayMessage = () => {
    if (cartItems && cartItems.length === 0) {
      return "Your shopping bag is empty";
    } 
    if (orderType) {
      return "Your delivery time: " + deliveryDate.toLocaleString("en-US");
    } else {
      return "Your pick up time: " + deliveryDate.toLocaleString("en-US");
    }
  }

  const handleCheckout = () => {
    navigate("/order/checkout");
  }

   return (
     <>
       <div className='min-h-screen bg-[#81bb95]/20'>
         <div className='p-8'>
           {/* <div className='p-4 xl:ml-80'> */}
           <OrderNavbar />

           <div className='grid grid-cols-1 lg:grid-cols-3 w-full '>
             <div className='lg:col-span-2'>
               <Typography variant='h3' color='black' className='my-4'>
                 Shopping Bag
               </Typography>
               <Alert color='green' className='lg:w-5/6'>{displayMessage()}</Alert>

               <div className='divide-gray-400 divide-y'>
                 {cartItems && cartItems.length === 0 ? (
                   <img src='/images/empty-bag.svg' alt='empty bag' className='w-32 h-32 m-auto my-5'/>
                 ) : (
                   displayCartItems
                 )}
               </div>
             </div>
             <div className='bg-[#81bb95]/10 rounded-md my-4 w-[320px] divide-gray-400 justify-self-center'>
               <Typography variant='h5' color='black' className='m-4'>
                 Order Summary
               </Typography>
               <hr />
               <div className='flex justify-between'>
                 <Typography variant='paragraph' color='black' className='m-4'>
                   Subtotal
                 </Typography>
                 <Typography variant='paragraph' color='black' className='m-4'>
                   ${Number.parseFloat(cartTotal).toFixed(2)}
                 </Typography>
               </div>
               <div className='flex justify-between'>
                 <Typography variant='paragraph' color='black' className='m-4'>
                   Shipping
                 </Typography>
                 <Typography variant='paragraph' color='black' className='m-4'>
                   ${Number.parseFloat(0).toFixed(2)}
                 </Typography>
               </div>
               <div className='flex justify-between'>
                 <Typography variant='paragraph' color='black' className='m-4'>
                   Tax
                 </Typography>
                 <Typography variant='paragraph' color='black' className='m-4'>
                   ${Number.parseFloat(cartTotal * 0.0875).toFixed(2)}
                 </Typography>
               </div>
               <hr />
               <div className='flex justify-between'>
                 <Typography variant='h6' color='black' className='m-4'>
                   Order total
                 </Typography>
                 <Typography variant='h6' color='black' className='m-4'>
                   ${Number.parseFloat(cartTotal + (cartTotal * TAX / 100)).toFixed(2)}
                 </Typography>
               </div>
               <Button
                 variant='gradient'
                 color='green'
                 fullWidth
                 disabled={cartTotal > 0 ? false : true}
                 onClick={handleCheckout}
                 className='text-sm hover:text-yellow-300'
               >
                 Checkout ${Number.parseFloat(cartTotal * 1.0875).toFixed(2)}
               </Button>
             </div>
           </div>
         </div>
       </div>
     </>
   );
}
