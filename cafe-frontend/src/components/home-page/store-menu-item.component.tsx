import React, {FunctionComponent} from "react";
import { CategoryItemT } from "../hooks";
import "./store-menu-item.style.css";

import { Typography } from "@material-tailwind/react";
interface IStoreMenuItemProps {
  item: CategoryItemT;
  color: string;
}

export const StoreMenuItem: FunctionComponent<IStoreMenuItemProps> = ({
  item,
  color,
}) => {
  return (
    <div className={`menu-item-container flex mt-2 mb-6 pl-4 ${color}`}>
      <div className='w-full mb-4 flex flex-col'>
        <div className='flex flex-row justify-between mb-1'>
          <Typography variant='h5'>{item.name}</Typography>
          <div className='fill-dots'></div>
          <Typography variant='h6' className='text-end'>
            ${item.price}
          </Typography>
        </div>
        <div className='small'>{item.description}</div>
      </div>
    </div>
  );
};

export default StoreMenuItem;