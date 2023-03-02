import React, { Fragment, FunctionComponent, useState, useContext  } from "react";
import SignUpBody from "./sign-up-body.component";

import {
  Dialog
} from "@material-tailwind/react";

type handleOpenFn = () => void;
export interface ISignUpDialogProps {
  open : boolean;
  handleOpen: handleOpenFn;
  handleClose: handleOpenFn;
}

export const SignUpDialog:FunctionComponent<ISignUpDialogProps> = ({open, handleOpen, handleClose}) => {
  
  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen} size="md" className='min-w-fit'>
        <SignUpBody handleClolse={handleOpen} />
      </Dialog>
    </Fragment>
  );
}
export default SignUpDialog;