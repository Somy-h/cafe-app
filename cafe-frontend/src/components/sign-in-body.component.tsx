import React, { FunctionComponent, useState  } from "react";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../store/user'
import { authenticateUser } from "../api-services/auth-service";
import { setJwt } from "../api-services/jwt-service";
import { setSecureStoreService } from "../api-services/secure-store-service";
import { Link, useNavigate } from "react-router-dom";

import { ALERT_TYPE, CollapseAlert } from "./collapseAlert.component";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

type LoginFormDataT = {
  email: string;
  pwd: string;
  remember_me: boolean;
};

const defaultLoginFormData: LoginFormDataT = {
  email: "",
  pwd: "",
  remember_me: false,
};

type handleFn = () => void;

export interface ISignInBodyProps {
  handleClose: handleFn;
}


export const SignInBody: FunctionComponent<ISignInBodyProps> = ({
  handleClose,
}) => {
  const dispatch = useDispatch();

  const [loginFormData, setLoginFormData] =
    React.useState<LoginFormDataT>(defaultLoginFormData);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const { currentUser, setCurrentUser } = useContext(
  //   UserContext
  // ) as UserContextT;

  const handleFormChange = (event: InputChangeEvent) => {
    const { name, value, type, checked } = event.target;
    //console.log(name, value, type, checked);
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const verifyFormData = () => {
    if (!loginFormData === null) {
      displayErrorMessage(true, "Please enter email & password");
      return false;
    }
    if (loginFormData.email.trim().length === 0) {
      displayErrorMessage(true, "Please enter a valid email");
      return false;
    }
    if (loginFormData.pwd.trim().length === 0) {
      displayErrorMessage(true, "Please enter a valid password");
      return false;
    }
    // success
    displayErrorMessage(false);
    return true;
  };

  const displayErrorMessage = (isErr, errMessage = "") => {
    console.log("Error: " + errMessage);
    setIsError(isErr);
    setErrorMessage(errMessage);
    if (isErr) {
      //reset form fields
      resetFormFields();
    }
  };

  const resetFormFields = () => {
    setLoginFormData(defaultLoginFormData);
  };

  const handleLogin = async () => {
    console.log("called component signin");
    try {
      if (!verifyFormData()) {
        //reset form fields
        return;
      }

      console.log(loginFormData);
      const data = await authenticateUser(loginFormData);
      console.log("data", data);

      if (data && data.success === false) {
        displayErrorMessage(true, data.message);
        return;
      } else {
        displayErrorMessage(false);
      }

      if (data && data.jwt) {
        const token = data.jwt;
        //console.log("token: ", token);

        // display error message
        // if (!token) {
        //   displayErrorMessage(true, data);
        //   return;
        // }

        //set Jwt
        setJwt(token);

        //set current user
        const payload = JSON.parse(window.atob(token.split(".")[1]));
        console.log(payload);
        //setCurrentUser({ ...payload });
        dispatch(setCurrentUser(payload));

        // if remember_me is set to true
        if (loginFormData.remember_me) {
          setSecureStoreService(payload);
        }
        handleClose(payload);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = () => {
    navigate("/auth/sign-up");
  };

  return (
    <Card className='absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4'>
      <CardHeader
        color='green'
        variant='gradient'
        className='mb-4 grid h-28 place-items-center'
      >
        <img className='w-40' src='/images/logo-imgonly.png' alt='logo img' />

        <Typography variant='h3' color='white'>
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <CollapseAlert alertType={ALERT_TYPE.ERROR} isOpen={isError}>
          {errorMessage}
        </CollapseAlert>

        <Input
          variant='standard'
          type='email'
          label='Email'
          size='lg'
          autoComplete='off'
          name='email'
          value={loginFormData.email}
          onChange={handleFormChange}
        />
        <Input
          variant='standard'
          type='password'
          label='Password'
          name='pwd'
          value={loginFormData.pwd}
          size='lg'
          onChange={handleFormChange}
        />
        <div className='-ml-2.5'>
          <Checkbox
            label='Remember Me'
            ripple={true}
            name='remember_me'
            value={loginFormData.remember_me ? true : false}
            onChange={handleFormChange}
          />
        </div>
      </CardBody>
      <CardFooter className='pt-0 flex flex-col'>
        <div className='flex'>
          <Button
            variant='text'
            color='red'
            fullWidth
            onClick={handleClose}
            className='mx-4'
          >
            Cancel
          </Button>
          <Button
            variant='gradient'
            color='green'
            fullWidth
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </div>
        <Typography
          variant='h6'
          className='mt-6 flex justify-center items-center'
        >
          Don't have an account?
          <Link to='/auth/sign-up'>
            <Typography
              as='span'
              variant='h6'
              color='green'
              className='ml-1 font-bold hover:underline'
              onClick={handleSignUp}
            >
              Sign up
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default SignInBody;