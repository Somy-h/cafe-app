import { FunctionComponent } from "react";
import { DaySalesT, useTodaySales } from "../../hooks";
import StatisticsCard from "./statistics-card.component";
import { Typography } from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export const CardOrderSale: FunctionComponent = () => {
  const { status, data: daySalesData, refetch } = useTodaySales<DaySalesT>();

  console.log(status);

  console.log("daySalesData:", daySalesData);
  return (
    <>
      <StatisticsCard
        title="Today's Sales"
        icon={<CurrencyDollarIcon className='w-6 h-6 text-white' />}
        value={`$${daySalesData?.day_sales ?? 0}`}
        footer={
          <Typography className='font-normal text-blue-gray-600'>
            <strong className='green'>${daySalesData?.day_sales ?? 0}</strong>
          </Typography>
        }
      />
    </>
  );
};
export default CardOrderSale;
