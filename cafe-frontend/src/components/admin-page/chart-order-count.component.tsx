import { FunctionComponent } from 'react';
import { OrderCountForWeekT, useDailyOrderCountForWeek } from "../../hooks";
import StatisticsChart from "./statistics-chart.component";
import chartsConfig from "./charts-config";
import { dateString } from "./utils";
import { Typography } from "@material-tailwind/react";
import {
  CurrencyDollarIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
  UserIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";


// const dateString = (dateString: string) : string => {
//   const order_date = new Date(dateString);
//   return `${order_date.getMonth()+1}/${order_date.getDate()}`;
// }

export const ChartOrderCount: FunctionComponent = () => {
  const {
    status,
    data: orderCountData,
    refetch,
  } = useDailyOrderCountForWeek<OrderCountForWeekT[]>();

  console.log(status);

  console.log("orderCountData:", orderCountData);

  //console.log(orderCountData?.map(item => item?.order_count));

  const orderCountChart = {
    type: "bar",
    height: 220,
    options: {
      ...chartsConfig,
      colors: "#fff",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: orderCountData?.map((item) => dateString(item.order_date)),
      },
    },
    series: [
      {
        name: "Counts",
        data: orderCountData?.map((item) => item?.order_count),
      },
    ],
  };

  return(
    
    <StatisticsChart
      
      title='daily order counts'
      chart={orderCountChart}
      description='daily order counts for a week'
      
    />
  );
}
export default ChartOrderCount;