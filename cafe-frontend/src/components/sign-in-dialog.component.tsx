import React, { Fragment, FunctionComponent, useState, useContext  } from "react";


import SignInBody from './sign-in-body.component';

import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";

type handleOpenFn = () => void;

export interface ISignInDialogProps {
  open : boolean;
  handleOpen: handleOpenFn;
  handleSignUpOpen: handleOpenFn;
}

export const SignInDialog:FunctionComponent<ISignInDialogProps>  = ({open, handleOpen, handleSignUpOpen}) => {

  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>  
          <SignInBody  handleClose={handleOpen} />
      </Dialog>
    </Fragment>
  );
}

export default SignInDialog;