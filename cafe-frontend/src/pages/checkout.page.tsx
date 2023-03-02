import { useNavigate } from "react-router-dom";
//import { CartContext, CartContextT, CartItemT } from "../contexts/cart.context";
//import { UserContext, UserContextT } from "../contexts/user.context";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user";
import {
  selectCartItems,
  selectCartTotal,
  selectOrderType,
  selectDeliveryDate,
  clearItemFromCart,
} from "../store/cart";

import CheckoutItem from "../components/checkout-item.component";

import { Sidenav, OrderNavbar } from "../components/layout";
import CartSideView from "../components/cart-side-view.component";
import PaymentForm from "../components/payment-form.component";

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

export const TAX = 8.75;

export function CheckoutPage() {
    
  const dispatch = useDispatch();
 
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const orderType = useSelector(selectOrderType);
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

    const displayCartItems = cartItems.map(
      (cartItem: CartItemT, idx: number) => (
        <CheckoutItem
          key={cartItem.categoryItem.id}
          cartItem={cartItem}
          itemIndex={idx}
        />
      )
    );

    const displayMessage = () => {
      if (cartItems && cartItems.length === 0) {
        return "Your shopping bag is empty";
      }
      if (orderType) {
        return "Your delivery time: " + deliveryDate.toLocaleString("en-US");
      } else {
        return "Your pick up time: " + deliveryDate.toLocaleString("en-US");
      }
    };

    const handleSucess = () => {
      dispatch(clearItemFromCart());
      navigate("/order");
    };

    return (
      <>
        <div className='min-h-screen bg-[#81bb95]/20'>
          <div className='p-8'>
            {/* <div className='p-4 xl:ml-80'> */}
            <OrderNavbar />

            <div className='grid grid-cols-1 w-full '>
              <div className=''>
                <Typography variant='h3' color='black' className='my-4'>
                  Payment
                </Typography>
                <Alert color='green' className='lg:w-5/6'>
                  {displayMessage()}
                </Alert>
              </div>
              <div className='bg-[#81bb95]/10 rounded-md my-4 w-[320px] divide-gray-400 justify-self-center'>
                <div className='flex justify-between'>
                  <Typography variant='h6' color='black' className='m-4'>
                    Order total
                  </Typography>
                  <Typography variant='h6' color='black' className='m-4'>
                    ${Number.parseFloat(cartTotal + (cartTotal * TAX / 100)).toFixed(2)}
                  </Typography>
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <PaymentForm
                handleSucess={handleSucess}
              />
            </div>
          </div>
        </div>
      </>
    );
  }