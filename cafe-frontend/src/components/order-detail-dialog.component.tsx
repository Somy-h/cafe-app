import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { CategoryItemT, ExtraAddT, useExtraAddsData } from "../hooks";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
//import { XCircleIcon } from "@heroicons/react/24/outline";

export type ExtraFormDataT = {
  selectedExtraItems: Array<ExtraAddT>;
  quantity: number;
  totalPrice: number;
  specialNote: string;
};
 
export default function OrderDetailDialog({
    open,
    categoryItem,
    handleClose,
    handleAddToCart,
  }) {
  
  const defaultExtraFormData: ExtraFormDataT = {
    selectedExtraItems: [],
    quantity: 1,
    totalPrice: categoryItem.price,
    specialNote: ""
  };
  
  const [extraFormData, setExtraFormData] = useState<ExtraFormDataT>(defaultExtraFormData);

  // useQuery to get extra adds based on menu item 
  const { status, data: extraAdds, error } = useExtraAddsData(categoryItem.id);

  if (status === "loading") {
    return <span>Loading ...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }


  const handleFormChange = (event: InputChangeEvent) => {
    const { name, value, type, checked } = event.target;
    console.log(name, value, type, checked);

    if (type === "checkbox") {
      const [item]: Array<ExtraAddT> = extraAdds.filter(extra => extra.id == name);

      if (checked) {
        const items = extraFormData.selectedExtraItems;
        items.push(item);
        
        // calculate total price
        const total:number = +extraFormData.totalPrice  + item.price * extraFormData.quantity;
        console.log(items, total);
        setExtraFormData((prevFormData) => ({
          ...prevFormData,
          selectedExtraItems: items,
          totalPrice: total
        }));

      } else {
        const extras = extraFormData.selectedExtraItems.filter(extra => extra.id != name);

        // calculate total price
        const total: number = +extraFormData.totalPrice  - item.price * extraFormData.quantity;
        setExtraFormData((prevFormData) => ({
          ...prevFormData,
          selectedExtraItems: extras,
          totalPrice: total
        }));
      }

    } else if (name === "quantity") {
      console.log(name, type, extraFormData.totalPrice, value);

      const total: number = +extraFormData.totalPrice * value / extraFormData.quantity;
            
      console.log(total);

      setExtraFormData((prevFormData) => ({
        ...prevFormData,
        [name] : value,
        totalPrice: total
      }));

    } else {
      setExtraFormData((prevFormData) => ({
      ...prevFormData,
      [name] : value,
    }));
    }
  };

  const displayExtraAdds = extraAdds?.map((extraItem) => (
    <Checkbox key={extraItem.id} label={`${extraItem.name} ($${extraItem.price})`} name={extraItem.id} onChange={handleFormChange} className='m-0'/>
  ));

  const displayImage = (
    <Avatar src={categoryItem.image_url ?? '/images/drink.png'} alt={categoryItem.name} size='xxl' />
  );


  return (
    <Dialog
      open={open}
      size='xl'
      onClick={(e) => e.stopPropagation()}
      className=' overflow-y-auto'
    >
      <DialogHeader className='bg-green-50 '>
        <div className='relative flex items-center gap-4'>
          {displayImage}
          <div className='flex flex-col'>
            <Typography variant='h6'>{categoryItem.name}</Typography>
            <Typography variant='paragraph' color='gray'>
              {categoryItem.description}
            </Typography>
            <Typography variant='paragraph' color='gray'>
              ${categoryItem.price}
            </Typography>
          </div>
        </div>
      </DialogHeader>
      <DialogBody divider className='px-10  overflow-scroll overflow-visible '>
        <div className='overflow-y-auto h-3/4'>
          <div className='flex flex-col'>{displayExtraAdds}</div>
          <Typography variant='h6' className='mt-2'>
            Special Requests
          </Typography>
          <Typography variant='small' color='gray'>
            Requests requiring a price adjustment will be charged to your order.
          </Typography>
          <Textarea
            name='specialNote'
            value={extraFormData.specialNote}
            color='teal'
            label='Hold the onions? Sauce on the side?'
            onChange={handleFormChange}
          />
        </div>
      </DialogBody>
      <DialogFooter className='flex justify-between px-10 mb-4'>
        <div className='flex items-center'>
          <Typography variant='small' className='mr-1'>
            Quantity :
          </Typography>
          <input
            type='number'
            name='quantity'
            className='py-1 pl-2 border border-gray-400 rounded-md w-20 active:border active:ontline-none active:border-teal-500'
            min='0'
            default='0'
            value={extraFormData.quantity}
            onChange={handleFormChange}
          />
        </div>
        <div className='flex'>
          <Button
            variant='text'
            color='red'
            onClick={handleClose}
            className='mr-2'
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant='gradient'
            color='green'
            onClick={(e) => handleAddToCart(e, extraFormData)}
          >
            <span className='text-sm'>
              Add To Order $
              {Number.parseFloat(extraFormData.totalPrice).toFixed(2)}
            </span>
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}

OrderDetailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  categoryItem: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};