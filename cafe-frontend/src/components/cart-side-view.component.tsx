import  { FunctionComponent, useState } from "react";
import SelectPickup from "./select-pickup.component";
import CartItem from "./cart-item.component";
import SignInDialog from "./sign-in-dialog.component";
import SignUpDialog from "./sign-up-dialog.component";
//import { UserContext, UserContextT} from "../contexts/user.context";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user";
import { setOrderType } from "../store/cart";

// import {
  //   CartContext,
  //   CartContextT
  // } from "../contexts/cart.context";
import { selectCartItems, selectOrderType, selectCartTotal, selectDeliveryDate } from "../store/cart";

import { useNavigate } from "react-router-dom";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenCartView,
} from "../contexts/tailwind.context";


export const CartSideView: FunctionComponent = () => {
  //const { currentUser } = useContext(UserContext) as UserContextT;
  const cartDispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // const {
  //   orderType,
  //   setOrderType,
  //   cartItems,
  //   cartTotal,
  //   deliveryDate,
  //   setDeliveryDate,
  // } = useContext(CartContext) as CartContextT;

  const cartItems = useSelector(selectCartItems);
  const orderType = useSelector(selectOrderType);
  const cartTotal = useSelector(selectCartTotal);
  const deliveryDate = useSelector(selectDeliveryDate);


  const [controller, dispatch] = useMaterialTailwindController();
  const { openCartView } = controller;

  const [openSigninDialog, setOpenSigninDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const navigate = useNavigate();

  const handleOrderType = (e) => {
    //setOrderType((prevValue) => !prevValue);
    cartDispatch(setOrderType((prevValue) => !prevValue));
  };

  const handleCheckout = () => {
    if (!currentUser) {
      console.log("you not logged in yet");
      setOpenSigninDialog(!openSigninDialog);
    }
    else {
      console.log(currentUser.user_name);
      console.log(deliveryDate.toString());

      setOpenCartView(dispatch, false);
      navigate("/order/cart");
    }
    
  };

  const handleSignInOpen = () => {
    //e.stopPropagation();
    setOpenSigninDialog(!openSigninDialog);
  };

  const handleSignUpOpen = () => {
    //e.stopPropagation();
    setOpenSigninDialog(!openSigninDialog);
    setOpenSignupDialog(!openSignupDialog);
  };

 const handleSignUpClose = () => {
   setOpenSignupDialog(!openSignupDialog);
 };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openCartView ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <SignInDialog
        open={openSigninDialog}
        handleOpen={handleSignInOpen}
        handleSignUpOpen={handleSignUpOpen}
      />
      <SignUpDialog
        open={openSignupDialog}
        handleOpen={handleSignUpOpen}
        handleClose={handleSignUpClose}
      />
      <div className='flex items-start justify-between px-6 pt-8 pb-6'>
        <div>
          <Typography variant='h5' color='blue-gray' className=''>
            {currentUser ? `${currentUser.user_name}'s` : "Your"} orders
          </Typography>
          {!currentUser && (
            <Typography variant='small' color='blue-gray' className=''>
              Please{" "}
              <Button variant='text' className='p-1' onClick={handleSignInOpen}>
                sign in
              </Button>{" "}
              first.
            </Typography>
          )}
        </div>

        <IconButton
          variant='text'
          color='blue-gray'
          onClick={() => setOpenCartView(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className='h-5 w-5' />
        </IconButton>
      </div>
      <div className='py-4 px-6'>
        <div className='mb-12'>
          <hr />
          <div className='flex items-center justify-between py-5'>
            <Typography variant='h6' color='blue-gray'>
              Pickup
            </Typography>
            <Switch
              color='green'
              name='orderType'
              checked={!orderType}
              onChange={handleOrderType}
            />
          </div>
          <hr />

          <Typography variant='h6' color='blue-gray' className='pt-5'>
            {orderType  ? "Delivery" : "Pickup"} From
          </Typography>
          <Typography variant='small' className=' text-blue-gray-600'>
            Little Pecks 123 Address, CA
          </Typography>
          <Typography variant='h6' color='blue-gray' className='pt-5'>
            {orderType  ? "Delivery" : "Pickup"} Time
          </Typography>

          <SelectPickup />
        </div>
        <div className='mb-12'>
          <Typography variant='small' color='gray'>
            {cartItems &&
              cartItems.map((item) => <CartItem key={item.categoryItem.id} cartItem={item} />)}
          </Typography>
        </div>
        <div className='mb-12'>
          <hr />

          <div className='my-8 flex flex-col gap-4'>
            <Button
              variant='gradient'
              color='green'
              fullWidth
              disabled={cartTotal > 0 ? false : true}
              onClick={handleCheckout}
              className='text-sm hover:text-yellow-300'
            >
              Checkout ${Number.parseFloat(cartTotal).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CartSideView;
