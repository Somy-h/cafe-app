import React, { FunctionComponent, useState } from "react";
import PropTypes from "prop-types";
import { CategoryItemT, ExtraAddT } from "../hooks";
import OrderDetailDialog, {
  ExtraFormDataT,
} from "./order-detail-dialog.component";
import MenuItemEditDialog from "./admin-page/menu-item-edit.dialog.component";
//import { CartContext, CartContextT } from "../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, USER_TYPE } from "../store/user";
import { addItemToCart, selectCartItems } from "../store/cart";
import {
  Avatar,
  Typography
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";

export interface CategoryItemProps {
  categoryItem: CategoryItemT;
}

export const CategoryItem: FunctionComponent<CategoryItemProps> = ({
  categoryItem,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  //const { addItemToCart } = useContext(CartContext) as CartContextT;

  const displayPopular = (
    <span className='flex h-4 w-auto text-pink-300 text-xs'>
      <StarIcon /> Popular
    </span>
  );

  //categoryItem.image_url="/images/coffee.jpeg"
  //categoryItem.image_url=null;
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleAddToCart = (
    e: React.MouseEvent,
    extraFormData: ExtraFormDataT
  ): void => {
    e.stopPropagation();
    console.log("click add to cart");
    console.log(categoryItem, extraFormData);

    dispatch(addItemToCart(cartItems, { categoryItem, extraFormData }));

    setOpen(!open);
  };

  const handleOpenExtraAdd = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      {currentUser?.role === USER_TYPE.ADMIN ? (
        <MenuItemEditDialog
          open={open}
          categoryItem={categoryItem}
          handleClose={handleClose}
        />
      ) : (
        <OrderDetailDialog
          open={open}
          categoryItem={categoryItem}
          handleClose={handleClose}
          handleAddToCart={handleAddToCart}
        />
      )}

      <div
        className='w-full h-full cursor-pointer rounded-md shadow-md border border-blue-gray-50 p-4 bg-white hover:bg-[#81bb95]/10'
        onClick={handleOpenExtraAdd}
      >
        <div className='flex flex-row justify-between'>
           <Typography variant='h6' color='blue-gray'>
            {categoryItem.name}
          </Typography>{categoryItem.image_url ? (
            <Avatar src={categoryItem.image_url} size='xl' />
          ) : null}
         
        </div>

        {/* { categoryItem.image_url ? <Avatar src={categoryItem.image_url} size='xxl' /> : null} */}

        <div className='flex flex-col'>
          <Typography variant='paragraph' color='gray'>
            {categoryItem.description}
            {/* {categoryItem.category_id} */}
          </Typography>

          <div className='flex justify-between'>
            <Typography variant='paragraph' color='gray'>
              ${categoryItem.price}
            </Typography>
            {categoryItem.popular ? displayPopular : null}
          </div>
        </div>
      </div>
    </>
  );
};

CategoryItem.propTypes = {
  categoryItem: PropTypes.object.isRequired,
};
