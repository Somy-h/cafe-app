import { useState, useContext } from "react";
//import { CartContext, CartContextT } from "../contexts/cart.context";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryDate, selectDeliveryDate } from "../store/cart";
import { Select, Option } from "@material-tailwind/react";

type optionT = {
  name: string,
  value: string
}

const SelectPickup = () => {
  const dispatch = useDispatch();
  //const { deliveryDate,  setDeliveryDate} = useContext(CartContext) as CartContextT;
  const deliveryDate = useSelector(selectDeliveryDate);

  const makeDateOptionStrings = () : optionT[] => {
    const dayOptions: optionT[] = [];
    // dayOptions.push("Today")
    // dayOptions.push("Tomorrow")

    const today = Date.now();
    for(let i: number = 0; i < 5; i++) {
      const followingDay = new Date(today + 86400000 * i)
      if (i === 0) {
        dayOptions.push({name: "Today", value: followingDay.toDateString()});
      } else if (i === 1) {
        dayOptions.push({ name: "Tomorrow", value: followingDay.toDateString() });
      } else { 
        dayOptions.push({name: followingDay.toDateString(), value: followingDay.toDateString()});
      }
    }
    //console.log(dayOptions);

    return dayOptions;
  }

  const displayDateOptions = makeDateOptionStrings().map((day: optionT) => <Option key={day.name} value={day.value}>{day.name}</Option>);

  const makeTimeOptionStrings = (): optionT[] => {
    const timeOptions: optionT[] = [];
  
    const today: Date = new Date(Date.now());
    today.setHours(9, 0, 0, 0);
    //console.log("time option:", today.toString());
    for (let i: number = 0; i < 24; i++) {
      const followingTime = new Date(today.getTime() + 900000 * i);
      timeOptions.push(
        {name: followingTime.toLocaleTimeString("en-US"), value: followingTime.toString()}
      );
    }
    
    //console.log(timeOptions);
    return timeOptions;
  };

  const displayTimeOptions = makeTimeOptionStrings().map(
    (time: optionT, i: number) => (
      <Option key={time.name} value={time.value}>
        {time.name}
      </Option>
    )
  );


  const handleSelectDateChange = (e) => { 
    
    const selectedDate = new Date(e);
    if (deliveryDate) {
      selectedDate.setHours(
        deliveryDate.getHours(),
        deliveryDate.getMinutes(),
        deliveryDate.getSeconds()
      );
    } 
    console.log("select date change: ", selectedDate);
    dispatch(setDeliveryDate(selectedDate));
  }

  const handleSelectTimeChange = (e) => {
    const selectedTime = new Date(e);
    console.log(selectedTime);

    if (deliveryDate) {
      selectedTime.setMonth(deliveryDate.getMonth(), deliveryDate.getDate());
    }
    console.log("select time change: ", selectedTime);
    dispatch(setDeliveryDate(selectedTime));

  }

  return (
    <div className='flex flex-col'>
      <Select
        variant='standard'
        color='teal'
        label='Select date'
        onChange={handleSelectDateChange}
      >
        {displayDateOptions}
      </Select>
      
      <Select
        variant='standard'
        color='teal'
        label='Select time'
        onChange={handleSelectTimeChange}
      >
        {displayTimeOptions}
        {/* <Option disabled>9:00 AM</Option>
        <Option>9:15 AM</Option>
        <Option>9:30 AM</Option>
        <Option>9:45 AM</Option>
        <Option>10:00 AM</Option>
        <Option>10:15 AM</Option>
        <Option>10:30 AM</Option>
        <Option>10:45 AM</Option>
        <Option>11:00 AM</Option>
        <Option>11:15 AM</Option>
        <Option>11:30 AM</Option>
        <Option>11:45 AM</Option>
        <Option>12:00 PM</Option>
        <Option>12:15 PM</Option>
        <Option>12:30 PM</Option>
        <Option>12:45 PM</Option>
        <Option>1:00 PM</Option>
        <Option>1:15 PM</Option>
        <Option>1:30 PM</Option>
        <Option>1:45 PM</Option>
        <Option>2:00 PM</Option>
        <Option>2:15 PM</Option>
        <Option>2:30 PM</Option>
        <Option>2:45 PM</Option> */}
      </Select>
    </div>
  );
};

export default SelectPickup;
