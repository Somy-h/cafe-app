
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderHistoryToday, OrderHistoryTodayT} from "../../hooks";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
} from "@material-tailwind/react";

export const TableOrderHistory: FunctionComponent = () => {
  const navigate = useNavigate();

  const {
    status,
    data: orderHistoryData,
    error,
  } = useOrderHistoryToday<OrderHistoryTodayT[]>();

  if (status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  console.log("order history data: ", orderHistoryData);

  const handleOrderHistoryDetail = (e, onlineOrder: OrderHistoryT) => {
    e.preventDefault();
    console.log(onlineOrder);
    navigate("/order/history-detail", {
      state: {
        onlineOrder: onlineOrder,
      },
    });
  };

  return (
    <Card>
      <CardHeader variant='gradient' color='green' className='mb-8 p-6'>
        <Typography variant='h6' color='white'>
          Today's Orders
        </Typography>
      </CardHeader>
      <CardBody className='overflow-x-scroll px-0 pt-0 pb-2'>
        <table className='w-full min-w-[640px] table-auto'>
          <thead>
            <tr>
              {[
                "user",
                "order#",
                "total",
                "order date",
                "status",
                "order_type",
                "pickup date",
              ].map((el) => (
                <th
                  key={el}
                  className='border-b border-blue-gray-50 py-3 px-5 text-left'
                >
                  <Typography
                    variant='small'
                    className='text-[11px] font-bold uppercase text-blue-gray-400'
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orderHistoryData.map(
              (
                {
                  first_name,
                  last_name,
                  id,
                  order_num,
                  user_id,
                  total_price,
                  delivery_addr_id,
                  order_date,
                  order_status,
                  order_type,
                  delivery_datetime,
                }: OrderHistoryTodayT,
                idx: number
              ) => {
                const className = `py-3 px-5 ${
                  idx === orderHistoryData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={order_num}>
                    <td className={className}>
                      <Typography className='text-xs font-semibold text-blue-gray-500'>
                        {first_name + " " + last_name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as='a'
                        onClick={(e) =>
                          handleOrderHistoryDetail(e, {
                            id,
                            order_num,
                            total_price,
                            order_date,
                            order_status,
                            order_type,
                            delivery_datetime,
                          })
                        }
                        variant='small'
                        color='blue-gray'
                        className='cursor-pointer underline text-xs font-semibold text-blue-gray-600 hover:text-blue-400'
                      >
                        {order_num}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className='text-xs font-semibold text-blue-gray-500'>
                        ${Number.parseFloat(total_price).toFixed(2)}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className='text-xs font-normal text-blue-gray-600'>
                        {new Date(order_date).toLocaleString()}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant='gradient'
                        color={order_status === 0 ? "green" : "blue-gray"}
                        value={order_status === 0 ? "processing" : "done"}
                        className='py-0.5 px-2 text-[11px] font-medium'
                      />
                    </td>
                    <td className={className}>
                      <Chip
                        variant='gradient'
                        color={order_type === 0 ? "blue" : "yellow"}
                        value={order_type === 0 ? "pickup" : "delivery"}
                        className='py-0.5 px-2 text-[11px] font-medium'
                      />
                    </td>
                    <td className={className}>
                      <Typography className='text-xs font-normal text-blue-gray-600'>
                        {new Date(delivery_datetime).toLocaleString()}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
export default TableOrderHistory;
