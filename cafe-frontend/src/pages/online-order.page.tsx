import { Routes, Route, Navigate } from "react-router-dom";
import { Sidenav, OrderNavbar, Footer } from "../components/layout";
import CartSideView from "../components/cart-side-view.component";
import MenuList from "../components/menu-list.component";
import { CartPage, CheckoutPage } from "./index";
import { useMaterialTailwindController, setOpenCartView } from "../contexts/tailwind.context";

import {
  useCategoriesData,
} from "../hooks";

export function OnlineOrderPage() {
  const { status, data: categories, error } = useCategoriesData();

  if (status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className='min-h-screen bg-[#81bb95]/20'>
      <Sidenav categories={categories} />
      <div className='p-4 xl:ml-80'>
        <OrderNavbar />
        <CartSideView />
        <MenuList categories= {categories}/>
        <div className=''>
          <Footer />
        </div>
      </div>
    </div>
  );
}
