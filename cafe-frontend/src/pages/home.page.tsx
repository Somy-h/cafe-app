import { Navbar } from "../components/layout";

import { HomeTitle } from "../components/home-page/home-title.component";
import { OrderOnlineAd } from "../components/home-page/order-online-ad.component";
import { FoodMenu } from "../components/home-page/food-menu.component";
import { DrinkViveAd } from "../components/home-page/drink-vive-ad.component";
import { DrinkMenu } from "../components/home-page/drink-menu.component";
import "./home.style.css";

export function HomePage() {
  return (
    <>
      <div id='home' className='init--screen'>
        <img className='left-bird-img' src='/images/leftBird.jpg' />
        <img className='right-bird-img' src='/images/rightBird.jpg' />
      </div>
      <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4'>
        <Navbar />
      </div>
      <HomeTitle />
      <OrderOnlineAd />
      <FoodMenu />
      <DrinkViveAd />
      <DrinkMenu />
    </>
  );
}
