import React from "react";
import { useRef, useEffect, useState, FunctionComponent } from "react";
import { useCategoryItemsData, CategoryItemT } from "../../hooks";
import StoreMenuItem from "./store-menu-item.component";
// import BreakfastData from "./breakfast";
// import AllDayData from "./allDay";
import { Button, Typography } from "@material-tailwind/react";


export const FoodMenu: FunctionComponent = () => {
  const menuRef = useRef();
  const [isVisible, setIsVisible] = useState();
  
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const entry = entries[0];
  //     setIsVisible(entry.intersectionRatio);
  //   });

  //   observer.observe(menuRef.current);
  // }, []);

  const { status, data: breakfastData, error } = useCategoryItemsData(6);
  const {
    status: all_day_status,
    data: allDayData,
    error: all_day_error,
  } = useCategoryItemsData(4);

  if (status === "loading" || all_day_status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error" || all_day_error == "error") {
    return <span>Error: {error.message}</span>;
  }


  const breakfastEl = breakfastData.map((breakfastItem: CategoryItemT) => {
    return <StoreMenuItem key={breakfastItem.id} item={breakfastItem} color='yellow' />;
  });
  const allDayEl = allDayData.map((allDayItem: CategoryItemT) => {
    return <StoreMenuItem key={allDayItem.id} item={allDayItem} color='pink' />;
  });

  return (
    <section
      id='food-menu-section'
      className='bg-gradient-to-r from-yellow-400 to-pink-200 p-20 flex flex-col items-center justify-center'
    >
      <div className='rounded-3xl  bg-white p-14 w-full max-w-[960px]'>
        <Typography
          variant='h1'
          className='flex justify-center items-center mb-4' 
        >
          FOOD MENU
        </Typography>
        
        <div className='food-menu grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className={`grid-item ${isVisible > 0 ? "active" : ""}`}>
            <Typography variant='h3' className='barline menu-yellow'>
              BREAKFAST (8AM-4PM)
            </Typography>
            <div className='font-bold mt-4 mb-5'>{breakfastEl}</div>
          </div>
          <div className={`grid-item ${isVisible > 0 ? "active" : ""}`}>
            {/* <div className="div-block pink"></div> */}
            <Typography variant='h3' className='menu-pink'>
              ALL DAY (M-F 11AM-CLOSE)
            </Typography>
            <div className='food-menu-items'>{allDayEl}</div>
          </div>
        </div>
      </div>
      <Button className='outline outline-4 hover:outline-2 pink mt-4 rounded-full text-lg text-white bg-transparent'>
        order online!
      </Button>
    </section>
  );
};

export default FoodMenu;