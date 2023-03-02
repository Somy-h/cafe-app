import { 
  OrderCountT, 
  useTodayOrderCount,
} from '../../hooks';
import { FunctionComponent } from 'react';
import StatisticsCard from './statistics-card.component';
import {
  Typography,
} from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export const CardOrderCount: FunctionComponent = () => {

  const {
    status,
    data: orderCountData,
    refetch,
  } = useTodayOrderCount<OrderCountT>();

  console.log(status);

  console.log("orderCountData:", orderCountData);
  return (
    <>
      <StatisticsCard
        title="Today's Order"
        icon={<ShoppingBagIcon className='w-6 h-6 text-white' />}
        value={orderCountData?.order_count ?? 0}
        footer={
          <Typography className='font-normal text-blue-gray-600'>
            <strong className='green'>{orderCountData?.order_count ?? 0}</strong>
          </Typography>
        }
      />
    </>
  );
}
export default CardOrderCount;