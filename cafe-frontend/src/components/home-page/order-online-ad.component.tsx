import React, { FunctionComponent, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./order-oline-ad.style.css";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
export const OrderOnlineAd: FunctionComponent = () => {
  const imgRef = useRef();
  const [isImgVisible, setIsImgVisible] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsImgVisible(entry.intersectionRatio);
    });

    observer.observe(imgRef.current);
  }, []);

  const handleOrderOnline = () => {
    navigate('/order/home');
  }

  return (
    <div className='order--container bg-white grid justify-between'>
      <div className={`order-para px-12 ${isImgVisible > 0 ? "ani" : ""}`}>
        <Typography variant='h1'>
          <span className='text-[#ffc1be]'>EAT, </span>
          <span className='text-[#f38d88]'>DRINK </span>
          <br></br>
          <span className='text-[#f77474]'>WORK</span>
          <span className='text-[#ffc1be]'>, </span>
          <span className='text-[#f55a5a]'>PLAY</span>
        </Typography>
        <Typography variant='h5' className='text-black/70'>
          Little Pecks is a neighborhood all-day cafe with a passion for tasty
          bites and quality beans. We're also the perfect place to meet up with
          friends, take care of business, or just kick back and relax!
        </Typography>
        <Button className='solid-button pink mt-4 rounded-full text-lg' onClick={handleOrderOnline}>order online</Button>
      </div>
      <img
        className={`rounded-xl w-full md:w-[110%] min-h-[400px] max-h-[700px] order-image ${isImgVisible > 0 ? "ani" : ""}`}
        src='/images/coffee.jpeg'
        ref={imgRef}
      ></img>
    </div>
  );

}