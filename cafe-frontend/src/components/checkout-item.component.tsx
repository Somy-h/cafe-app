import React, {
  Fragment,
  FunctionComponent,
} from "react";
//import { CartContext, CartContextT } from "../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { 
  removeItemFromCart, 
  increaseQuantity,
  decreaseQuantity,
  selectCartItems 
} from "../store/cart";
import {
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  PlusSmallIcon,
  XMarkIcon,
  MinusSmallIcon,
} from "@heroicons/react/24/outline";

export interface ICheckoutItemProps {
  cartItem: CartItemT;
  itemIndex: number;
}

const CheckoutItem: FunctionComponent<ICheckoutItemProps> = ({
  cartItem,
  itemIndex
}) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const displaySelectedExtraItems =  
    cartItem.extraFormData.selectedExtraItems.map((item: ExtraAddT) => (
      <Typography key={item.name} variant='small' color='gray' className='mx-2'>
        {item.name} (${item.price})
      </Typography>
    ));
  
  const addItemHandler = () => {
    dispatch(increaseQuantity(cartItems, cartItem.categoryItem.id, itemIndex));
  }
  const removeItemHandler = () => {
    if (cartItem.extraFormData.quantity == 1) {
        dispatch(removeItemFromCart(cartItems, cartItem, itemIndex));
    } else
      dispatch(decreaseQuantity(cartItems, cartItem.categoryItem.id, itemIndex));
  }

  return (
    <Fragment>
      <div className='grid grid-cols-10 w-full my-4 p-2'>
        {/* {cartItem.categoryItem.image_url && (
        <img src={cartItem.categoryItem.image_url} alt='cart item image' />
      )} */}
        <div className='col-span-6 flex flex-col'>
          <Typography variant='h6' color='gray' className='mx-1'>
            {cartItem.categoryItem.name} ($
            {Number.parseFloat(cartItem.categoryItem.price).toFixed(2)})
          </Typography>

          {cartItem.extraFormData.selectedExtraItems &&
            displaySelectedExtraItems}
          <Typography variant='h6' color='gray' className='mx-1'>
            ${Number.parseFloat(cartItem.extraFormData.totalPrice).toFixed(2)}
          </Typography>
        </div>
        <div className='col-span-3 flex items-center gap-2'>
          <IconButton
            variant='outlined'
            size='sm'
            color='green'
            onClick={removeItemHandler}
          >
            <MinusSmallIcon className='h-5 w-5 mx-2' />
          </IconButton>
          <span className='value'>{cartItem.extraFormData.quantity}</span>

          <IconButton
            variant='outlined'
            size='sm'
            color='green'
            onClick={addItemHandler}
          >
            <PlusSmallIcon className='h-5 w-6 mx-5' />
          </IconButton>
        </div>
        <div className='col-span-1'>
          <IconButton
            variant='text'
            color='green'
            size='sm'
            onClick={() => dispatch(removeItemFromCart(cartItems, cartItem, itemIndex))}
          >
            <XMarkIcon className='h-5 w-5 mx-2' />
          </IconButton>
        </div>
      </div>
    </Fragment>
  );
};
export default CheckoutItem;