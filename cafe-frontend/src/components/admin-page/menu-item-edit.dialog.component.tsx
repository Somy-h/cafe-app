import { Fragment, useState } from "react";
import PropTypes from "prop-types";
//import { CategoryItemT, ExtraAddT, useExtraAddsData } from "../hooks";
import { CategoryItemT } from "../hooks";
import MenuItemEdit from "./menu-item-edit.component";
import {

  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  
} from "@material-tailwind/react";
//import { XCircleIcon } from "@heroicons/react/24/outline";

export default function OrderDetailDialog({
  open,
  categoryItem,
  handleClose
}) {

  return (
    <Dialog open={open} size='md'>
      {
        // className={
        //   categoryItem.image_url
        //     ? `bg-[url("${categoryItem.image_url}")]`
        //     : "bg-green-50"
        //  + ' flex-col'}
      }
      
      <DialogBody divider className='px-10 overflow-y-auto'>
        <MenuItemEdit categoryItem={categoryItem} handleClose={handleClose} />
      </DialogBody>
      
    </Dialog>
  );
}
