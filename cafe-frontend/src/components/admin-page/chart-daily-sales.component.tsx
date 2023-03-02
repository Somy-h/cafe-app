import { FunctionComponent } from "react";
import { DailySalesT, useDailySales } from "../../hooks";
import StatisticsChart from "./statistics-chart.component";
import chartsConfig from "./charts-config";
import { dateString } from "./utils";
import { Typography } from "@material-tailwind/react";

export const ChartDailySales: FunctionComponent = () => {
  const {
    status,
    data: dailySalesData,
  } = useDailySales<DailySalesT[]>();

  console.log(status);

  console.log("dailySalesData:", dailySalesData);


  const dailySalesChart = {
    type: "bar",
    height: 220,
    options: {
      ...chartsConfig,
      colors: "#fff",
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: dailySalesData?.map((item: DailySalesT) =>
          dateString(item.order_date)
        ),
      },
    },
    series: [
      {
        name: "Sales",
        data: dailySalesData?.map((item: DailySalesT) => item?.daily_sales),
      },
    ],
  };

  return (
    <StatisticsChart
      color='red'
      title='daily sales'
      chart={dailySalesChart}
      description='daily sales for a week'
    />
  );
};
export default ChartDailySales;
