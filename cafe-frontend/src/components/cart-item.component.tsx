import React, { FunctionComponent } from 'react';
import { CartItemT } from "../contexts/cart.context";
import { ExtraAddT } from "../hooks";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/outline";

export interface ICartItemProp {
  cartItem : CartItemT;
}


export const CartItem : FunctionComponent<ICartItemProp> = ({ cartItem}) => {
  
  const {
    categoryItem: { name, price },
    extraFormData: { selectedExtraItems, quantity, totalPrice },
  } = cartItem;
  
  console.log(name, selectedExtraItems, quantity, totalPrice);

  const displaySelectedExtraItems = selectedExtraItems.map(
    (item: ExtraAddT) => (
      <Typography key={item.name} variant='small' color='gray' className='mx-2'>
        {item.name}${item.price}
      </Typography>
    )
  );

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <div className='relative flex items-center'>
          <Typography variant='h6' color='gray' className='mx-1'>
            {name} (${Number.parseFloat(price).toFixed(2)})
          </Typography>
          <IconButton variant='text' size='sm' color='green' className=''>
            <XCircleIcon />
          </IconButton>
        </div>
        <Typography variant='paragraph' color='gray' className='mx-1'>
          {quantity} x ${Number.parseFloat(totalPrice).toFixed(2)}
        </Typography>
      </div>
      <div>
        {selectedExtraItems && displaySelectedExtraItems }
      </div>
    </div>
  );
};

export default CartItem;
