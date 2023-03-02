import {
  Typography,
} from "@material-tailwind/react";


export const Footer = () => {

  return (
    <div className='flex flex-col items-center gap-4 p-4 text-blue-gray-500'>
    <Typography
          variant='h2'
          color='inherit'
          className='capitalize flex justify-center items-center hover:underline font-normal'
        >
          Little Pecks
    </Typography>
    <Typography
          variant='paragraph'
          color='inherit'
          className='capitalize flex justify-center items-center hover:underline font-normal'
        >
          Little Pecks is a neighborhood all-day café with a passion for tasty bites and quality beans. Our menu offers a distinct variety of home-made vegan, vegetarian, and gluten free dishes. Try our home-made tahini butter toast, a breakfast burrito with jalapeno aioli, or a delicious grilled cheese with a spaghetti squash twist!
    </Typography>
    <Typography
          variant='paragraph'
          color='inherit'
          className='capitalize flex justify-center items-center hover:underline font-normal'
        >
          211 Broadway
          Troy, NY, 12180 
    </Typography>
    <Typography
          variant='paragraph'
          color='inherit'
          className='capitalize flex justify-center items-center hover:underline font-normal'
        >
          Little Pecks has been a Mealeo partner since December of 2020. During that time they've accumulated 1,453 ratings, and earned themselves a 97.3% Mealeo Happy-Factor Rating. This rating is based on order volume, order accuracy, on-time deliveries, customer feedback, and overall customer satisfaction.
    </Typography>
    <img src="/images/staticmap.png" alt="Map data" />
  
    </div>
  );
};