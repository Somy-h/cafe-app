import React, { FunctionComponent } from "react";
//import { CartContext, CartContextT } from "../contexts/cart.context";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cart";

export const CartIcon: FunctionComponent = () => {
  //const { cartCount } = useContext(CartContext) as CartContextT;
  const cartCount = useSelector(selectCartCount);

  return (
    <div
      className='relative flex items-center justify-center w-12 h-12 cursor-pointer'
    >
      <img
        src='/images/icon-checkout.svg'
        className='w-6 h-6 text-blue-gray-500'
      />
      <span className='absolute text-xs font-medium top-4 right-5 text-white'>
        {cartCount}
      </span>
    </div>
  );  
};

export default CartIcon;