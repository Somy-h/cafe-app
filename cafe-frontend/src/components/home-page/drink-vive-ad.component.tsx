
import { FunctionComponent, useRef, useEffect, useState } from "react";
import "./drink-vive-ad.style.css"
import { Button, Typography } from "@material-tailwind/react";

export const DrinkViveAd: FunctionComponent = () => {
  const drinkRef = useRef();
  const [isVisible, setIsVisible] = useState<boolean>();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible((prevValue) => entry.isIntersecting);
    });
    observer.observe(drinkRef.current);
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 justify-between mt-16'>
      <div
        className={`flex pr-8 h-[300px] w-full md:w-[110%] rounded-xl shadow-gray-200 bg-gradient-to-r from-green-100 to-cyan-100 drink-container ${
          isVisible ? "ani" : ""
        }`}
      >
        <div className='py-8 px-4 w-[70%] order-1 md:order-2'>
          <Typography variant='h2' color='white' ref={drinkRef}>
            LICENSED TO CHILL
          </Typography>
          <Typography variant='h5' color='white' className='mt-6 mb-4'>
            We like our days &#38; our drinks cold. Stop by and cool off!
          </Typography>
          <Button className='outline outline-4 hover:outline-2 bg-green-100 rounded-full text-lg'>
            DRINK MENU
          </Button>
        </div>
        <div className='relative w-[30%] order-1'>
          <img
            src='./images/drink.png'
            className='absolute w-full min-w-[150px] max-w-[200px] bottom-0 left-0 drink-img order-2 md:order-1'
          />
        </div>
      </div>
      <div className='relative'>
        <img
          src='./images/play.jpeg'
          className={`relative mt-12 md:mt-32 w-[110%] min-h-[300px] max-h-[380px]  rounded-xl shadow-gray-200 object-cover object-left-top vive-img ${
            isVisible > 0 ? "ani" : ""
          }`}
        />
        <div className='absolute bottom-12 right-4 text-start w-[65%]'>
          <Typography variant='h2' color='white' className=''>
            CATCH OUR VIBE
          </Typography>
          <Typography variant='h5' color='white' className='drink-desc'>
            Keep it groovy all day with the little pecks signature Spotify
            playlist!{" "}
          </Typography>
          <Button className='outline outline-4 hover:outline-2 bg-orange-800 rounded-full text-lg mt-4'>
            TUNE IN
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DrinkViveAd;