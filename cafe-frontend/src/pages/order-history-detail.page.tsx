import { useContext, FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useOrderHistoryDetailData,
  useOrderHistoryDetailExtraData,
  OrderHistoryDetailT,
  OrderHistoryT,
  OrderHistoryDetailExtraT,
} from "../hooks";
import { OrderNavbar } from "../components/layout";
import { UserContext } from "../contexts/user.context";
import { TAX } from './checkout.page';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Chip,
} from "@material-tailwind/react";


export function OrderHistoryDetailPage() {

  const navigate = useNavigate();
  const location = useLocation();


  const onlineOrder: OrderHistoryT = location.state.onlineOrder;
  
  //console.log("historyDetail page: ", onlineOrder);
  const {
    status,
    data: orderHistoryDetailsData
  } = useOrderHistoryDetailData(onlineOrder.id);
  
  const {
    status: extra_status,
    data: orderHistoryDetailExtraData,
  } = useOrderHistoryDetailExtraData(onlineOrder.id);

  if (status === "loading" || extra_status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error" || extra_status === "error") {
    return <span>Error: {error.message}</span>;
  }
  //console.log("order history detail data: ", orderHistoryDetailsData);
  //console.log("order history detail extra data: ", orderHistoryDetailExtraData);

  const displayExtraItems = (detailId: number)=> {

    const extraItems = orderHistoryDetailExtraData.filter(
      (extra: OrderHistoryDetailExtraT) => 
        detailId === extra.order_detail_id);
          
    return extraItems.map((extra: OrderHistoryDetailExtraT) => (
      <Typography
        key={extra.id}
        variant='small'
        color='gray'
        className='mx-2'
      >
        {extra.extra_name} (${extra.extra_price})
      </Typography>
    ));
  }


  return (
    <div className='min-h-screen bg-[#81bb95]/20'>
      <div className='p-8'>
        <OrderNavbar />
        <div className='mt-12 mb-8 flex flex-col gap-12'>
          <Card>
            <CardHeader variant='gradient' color='green' className='mb-8 p-6'>
              <Typography variant='h4' color='white'>
                Order# {onlineOrder.order_num}
              </Typography>
              <Typography variant='h6' color='white'>
                {onlineOrder.order_type === 0
                  ? "Pickup time: "
                  : "Delivery date: "}
                {new Date(onlineOrder.delivery_datetime).toLocaleString()}
              </Typography>
            </CardHeader>
            <CardBody className='overflow-x-scroll px-0 pt-0 pb-2'>
              <Typography variant='small' color='black'>
                {orderHistoryDetailsData &&
                  orderHistoryDetailsData.map(
                    (item: OrderHistoryDetailT) => (
                      <div
                        key={item.online_order_id}
                        className='grid grid-cols-1 gap-y-2 gap-x-2 md:grid-cols-2 p-4 rounded-md shadow-sm bg-green-100/10 m-4'
                      >
                        <div className='flex flex-col'>
                          <Typography
                            variant='h6'
                            color='gray'
                            className='mx-1'
                          >
                            {item.menu_name} (${item.menu_price})
                          </Typography>
                          {displayExtraItems(item.order_detail_id)}
                        </div>
                        <Typography variant='h6' color='gray' className='mx-1'>
                          x {item.quantity} = ${item.order_price}
                        </Typography>
                        <Typography variant='h6' color='red' className='mx-1'>
                          {item.special_note
                            ? `Special note: ${item.special_note}`
                            : null}
                        </Typography>
                      </div>
                    )
                  )}
              </Typography>
            </CardBody>
            <CardFooter className='flex justify-center'>
              <div className='bg-[#81bb95]/10 rounded-md  w-[320px] divide-gray-400 justify-self-center'>
                <Typography variant='h5' color='black' className='m-4'>
                  Order Summary
                </Typography>
                <hr />
                <div className='flex justify-between'>
                  <Typography
                    variant='paragraph'
                    color='black'
                    className='mx-4'
                  >
                    Subtotal
                  </Typography>
                  <Typography
                    variant='paragraph'
                    color='black'
                    className='mx-4'
                  >
                    ${Number.parseFloat(onlineOrder.total_price).toFixed(2)}
                  </Typography>
                </div>
                <div className='flex justify-between'>
                  <Typography
                    variant='paragraph'
                    color='black'
                    className='mx-4'
                  >
                    Shipping
                  </Typography>
                  <Typography
                    variant='paragraph'
                    color='black'
                    className='mx-4'
                  >
                    ${Number.parseFloat(0).toFixed(2)}
                  </Typography>
                </div>
                <div className='flex justify-between'>
                  <Typography
                    variant='paragraph'
                    color='black'
                    className='mx-4'
                  >
                    Tax
                  </Typography>
                  <Typography
                    variant='paragraph'
                    color='black'
                    className='mx-4'
                  >
                    $
                    {Number.parseFloat(
                      onlineOrder.total_price * (TAX / 100)
                    ).toFixed(2)}
                  </Typography>
                </div>
                <hr />
                <div className='flex justify-between'>
                  <Typography variant='h6' color='black' className='m-4'>
                    Order total
                  </Typography>
                  <Typography variant='h6' color='black' className='m-4'>
                    $
                    { Number.parseFloat(onlineOrder.total_price +
                        (onlineOrder.total_price * (TAX / 100))
                      ).toFixed(2)
                    }
                  </Typography>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}