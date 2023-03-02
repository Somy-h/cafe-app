import { useRef, useEffect, useState, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryItemsData, CategoryItemT } from "../../hooks";
import StoreMenuItem from "./store-menu-item.component";

import { Button, Typography } from "@material-tailwind/react";

export const DrinkMenu: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState<boolean>();
  const navigate = useNavigate();

  const { status, data: drinkData, error } = useCategoryItemsData(2);

  if (status === "loading" ) {
    return <span>Loading ...</span>;
  }

  if (status === "error" ) {
    return <span>Error: {error.message}</span>;
  }

  const drinkEl = drinkData.map(
    (drinkItem: CategoryItemT) => {
      return <StoreMenuItem key={drinkItem.id} item={drinkItem} color='green' />;
    }
  );

  const handleOrderOnline = () => {
    navigate('/order/home')
  }

  return (
    <section
      id='drink-menu-section'
      className='bg-gradient-to-r from-green-200 to-yellow-600 p-20 flex flex-col items-center justify-center mt-12'
    >
      <div className='rounded-3xl  bg-white p-14 w-full max-w-[960px]'>
        <Typography
          variant='h1'
          className='flex justify-center items-center mb-4'
        >
          DRINK MENU
        </Typography>

        <Typography variant='h3' className='barline menu-yellow'>
          COFFEE & BEVERAGES
        </Typography>
        
        <div
          className={`food-menu grid grid-cols-1 md:grid-cols-2 gap-2 grid-item ${
            isVisible > 0 ? "active" : ""
          }`}
        >
            {drinkEl}
        </div>
        
      </div>
      <Button className='outline outline-4 hover:outline-2 pink mt-4 rounded-full text-lg text-white bg-transparent' onClick={handleOrderOnline}>
        order online!
      </Button>
    </section>
  );
};

export default DrinkMenu;
