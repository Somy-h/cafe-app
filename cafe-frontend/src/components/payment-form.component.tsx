import React, {
  Fragment,
  FunctionComponent,
  useState,
  useContext,
  useEffect
} from "react";
import { CartItemT, CartContext } from "../contexts/cart.context";
//import { UserContext } from "../contexts/user.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user";
import { selectCartItems, selectCartTotal, selectOrderType, selectDeliveryDate } from "../store/cart";
import {
  addressT, 
  OnlineOrderT,
  createOrder,
} from "../api-services/order-service";
import { TAX} from "../pages";
import {
  CardElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../api-services/payment-service";
import {
  Button,
  IconButton,
  Typography,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

type PaymentFormDataT = {
  name: string;
  email: string;
};

const defaultPaymentFormData: PaymentFormDataT = {
  name: "",
  email: ""
};

type handleSucessFn = () => void;
export interface IPaymentFormProp {
  //amount: number;
  handleSucess: handleSucessFn;
}

export const PaymentForm: FunctionComponent<IPaymentFormProp> = ({
  //amount,
  handleSucess,
}) => {
  
  const [paymentFormData, setPaymentFormData] =
    React.useState<PaymentFormDataT>(defaultPaymentFormData);

  const [open, setOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  //const {currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);

  //const {cartItems, cartTotal, orderType, deliveryDate} = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const orderType = useSelector(selectOrderType);
  const deliveryDate = useSelector(selectDeliveryDate);


  const [orderData] = useState<OnlineOrderT>({
    user_id: currentUser?.id,
    totalPrice: cartTotal,
    orderType: orderType,
    address: {id: currentUser?.address_id},
    deliveryDate: deliveryDate,
    cartItems: cartItems,
  });

  const stripe = useStripe();
  const elements = useElements();

  const handleFormChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setPaymentFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    console.log(orderData);

    if (!stripe || !elements) {
      return;
    }
    //display spinning icon with processing...
    setIsProcessingPayment(true);

    const total = Number.parseFloat(cartTotal + (cartTotal * TAX) / 100).toFixed(2);

    console.log("total", Number.parseFloat(total));
      const response = await createPaymentIntent(Number.parseFloat(total) * 100);

    const { clientSecret } = response;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: paymentFormData.name,
          email: paymentFormData.email,
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      
      if (paymentResult.paymentIntent.status === "succeeded") {
        try {
          console.log("success");
          console.log(orderData);
          const orderNum = await createOrder(orderData) ;
          setOrderNumber(orderNum);

          //display spinning icon with processing...
          setIsProcessingPayment(true);
          setOpen(!open);
        } catch (err) {
          console.log(err);
        }
      }
    }
    
  };

  const handleOpen = () => {
    setOpen(!open);
    handleSucess();
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Fragment>
      <div className='h-[200px]   w-[390px] mt-6'>
        <Typography variant='h4' color='black' className='my-6'>
          Credit Card Payment:
        </Typography>
        <CardElement className='my-4' />
        {/* <PaymentElement id='payment-element' options={paymentElementOptions} /> */}
        <Input
          size='md'
          label='Name on Card'
          className='mb-2'
          name='name'
          value={paymentFormData.name}
          onChange={handleFormChange}
        ></Input>
        <Input
          size='md'
          label='Email'
          name='email'
          value={paymentFormData.email}
          className='my-2'
          onChange={handleFormChange}
        ></Input>
        {cartItems?.length > 0 ?
          <Button
            variant='gradient'
            color='green'
            disabled={isProcessingPayment}
            fullWidth
            onClick={handlePayment}
            className='mt-4'
          >
            {isProcessingPayment ? (
              <ArrowPathIcon className='animate-spin inline-block w-5 h-5 mr-2'></ArrowPathIcon>
            ) : null}
            {isProcessingPayment ? "Processing... " : "Pay now"}
          </Button>
        : null}
      </div>
      <Dialog open={open}>
        <DialogHeader>Payment Sucess</DialogHeader>
        <DialogBody divider>
          <Typography variant='h6' color='black' className='my-6'>
            Your order# : {orderNumber}
          </Typography>
          <Typography variant='paragraph' color='black' className='my-6'>
            Thank you for your order.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button variant='gradient' color='green' onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};

export default PaymentForm;