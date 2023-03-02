import React, { FunctionComponent } from "react";
import "./home-title.style.css";
import {
Typography,
} from "@material-tailwind/react";
export const HomeTitle: FunctionComponent = () => {
  return (
    <div className='main--container'>
      <div className='main-para absolute bottom-10 flex flex-col items-center'>
        <Typography color='white' className='font-bold text-4xl lg:text-5xl'>
          TROY’S FAVORITE
        </Typography>
        <Typography color='white' className='font-bold text-3xl lg:text-4xl'>
          all-day caf&#233;
        </Typography>
        <Typography variant='h6' color='white'>
          SUNDAY-TUESDAY 8AM-3PM
        </Typography>
        <Typography variant='h6' color='white'>
          WEDNESDAY-SATURDAY 8AM-9PM
        </Typography>
      </div>
    </div>
  );
}