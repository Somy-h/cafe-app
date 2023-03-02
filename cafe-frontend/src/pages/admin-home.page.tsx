import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
//import { UserContext, USER_TYPE } from "../contexts/user.context";
import { useSelector } from "react-redux";
import { selectCurrentUser, USER_TYPE } from "../store/user";
import Navbar from "../components/layout/navbar";
import CardOrderCount from "../components/admin-page/card-order-count.component";
import CardOrderSale from "../components/admin-page/card-order-sale.component";
import ChartOrderCount from "../components/admin-page/chart-order-count.component";
import ChartDailySales from "../components/admin-page/chart-daily-sales.component";
import TableOrderHistory from "../components/admin-page/table-order-history.component";
import { Typography } from "@material-tailwind/react";

export function AdminHomePage() {
  //const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);


  if (!currentUser || currentUser.role !== USER_TYPE.ADMIN) {
    return (
      <div className=" flex justify-center items-center h-screen">
      <Typography variant='h1' color='blue-gray'>
        Authorization is failed.{" "}
        <Link to='/auth/sign-in' className='underline text-blue-500 hover:text-blue-200'>
          Sign-in
        </Link>
      </Typography>
      </div>
    );
  }

  return (
    <div className='bg-green-200 p-4 h-screen'>
      <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4'>
        <Navbar />
      </div>
      <div className='mt-32'>
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2'>
          <CardOrderCount />
          <CardOrderSale />
        </div>
        <div className='mb-8 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2'>
          <ChartOrderCount />
          <ChartDailySales />
        </div>
        <div className='mt-12 grid grid-cols-1 gap-6'>
          <TableOrderHistory />
        </div>
      </div>
    </div>
  );
}
