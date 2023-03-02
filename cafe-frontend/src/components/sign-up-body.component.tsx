import React, { useState } from "react";

import { registerUser } from "../api-services/auth-service";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/user";
import { setJwt } from "../api-services/jwt-service";
import {
  ALERT_TYPE,
  CollapseAlert,
} from "./collapseAlert.component";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

//import { UserDataT } from "../contexts/user.context";
export type signupFormDataT = {
  first_name: string;
  last_name: string;
  email: string;
  pwd: string;
  pwd2: string;
  unit_num: string;
  street_num: string;
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
};

export const defaultSingupFormData = {
  first_name: "",
  last_name: "",
  email: "",
  pwd: "",
  pwd2: "",
  unit_num: "",
  street_num: "",
  addr1: "",
  addr2: "",
  city: "",
  state: "",
  postal_code: "",
  phone: "",
  role:0
};

type handleFn = () => void;
export interface ISignUpBodyProps {
  handleClose: handleFn;
}

export const  SignUpBody: FunctionComponent<ISignUpBodyProps> = ({
  handleClose,
}) => {
  const dispatch = useDispatch();

  const [signupFormData, setSignupFormData] = React.useState<signupFormDataT>(defaultSingupFormData);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextT;

  const handleFormChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;

    setSignupFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const verifyFormData = () => {

    if (!signupFormData) {
      displayErrorMessage(true, "Please enter user information");
      return false;;
    }
    if (signupFormData.first_name.trim().length === 0 ||
      signupFormData.last_name.trim().length === 0 
    ) {
      displayErrorMessage(true, "Please enter a valid name");
      return false;
    }
    if (signupFormData.email.trim().length === 0) {
      displayErrorMessage(true, "Please enter a valid email");
      return false;
    }
    if (signupFormData.pwd.trim().length === 0) {
      displayErrorMessage(true, "Please enter a valid password");
      return false;
    }
    if (signupFormData.pwd.trim() !== signupFormData.pwd2.trim()) {
      displayErrorMessage(true, "Password does not match");
      return false;
    }

    // success
    displayErrorMessage(false);
    return true;
  }

  const displayErrorMessage = (isErr, errMessage = "") => {
    console.log("Error: " + errMessage);
    setIsError(isErr);
    setErrorMessage(errMessage);
  };

  const resetFormFields = () => { 
    setSignupFormData(defaultSingupFormData);
  }

  const handleSignup = async () => {
    //console.log(loginFormData);
    try {
      if (! verifyFormData()) {
        //reset form fields
        return;
      }

      console.log(signupFormData);
      const data = await registerUser(signupFormData);
      //console.log("data", data);

      if (data && data.success === false) {
        displayErrorMessage(true, data.message);
        return;
      } else {
        displayErrorMessage(false);
      }

      if (data && data.jwt) {
        const token = data.jwt;

        //set Jwt
        setJwt(token);

        //set current user
        const payload = JSON.parse(window.atob(token.split(".")[1]));
        console.log(payload);
        //setCurrentUser({ ...payload });
        dispatch(setCurrentUser({ ...payload }));

        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className='absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4'>
      <CardHeader
        color='green'
        variant='gradient'
        className='mb-4 grid h-28 place-items-center'
      >
        <img
          className='w-40'
          src='/images/logo-imgonly.png'
          alt='logo img'
        />
        <Typography variant='h3' color='white'>
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className='flex flex-col gap-4'>
        <Tabs value= "account">
          <TabsHeader>
              <Tab value= "account">
                Account
              </Tab>
              <Tab value= "address">
                Address
              </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="account">

              <CollapseAlert alertType={ALERT_TYPE.ERROR} isOpen={isError}>
                {errorMessage}
              </CollapseAlert>
              <Input
                variant='standard'
                type='text'
                label='First name'
                name='first_name'
                value={signupFormData.first_name}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='Last name'
                name='last_name'
                value={signupFormData.last_name}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='email'
                label='Email'
                size='lg'
                name='email'
                value = {signupFormData.email}
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='password'
                label='Password'
                name='pwd'
                value={signupFormData.pwd}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='password'
                label='Confirm Password'
                name='pwd2'
                value={signupFormData.pwd2}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='phone'
                label='Phone number'
                size='lg'
                name='phone'
                value = {signupFormData.phone}
                onChange={handleFormChange}
              /> 
                
              
            </TabPanel>
            <TabPanel value="address">
              <CollapseAlert alertType={ALERT_TYPE.ERROR} isOpen={isError}>
                {errorMessage}
              </CollapseAlert>
              <Input
                variant='standard'
                type='text'
                label='Unit number'
                name='unit_num'
                value={signupFormData.unit_num}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='Street number'
                name='street_num'
                value={signupFormData.street_num}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='Address1'
                size='lg'
                name='addr1'
                value = {signupFormData.addr1}
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='Address2'
                name='addr2'
                value={signupFormData.addr2}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='City'
                name='city'
                value={signupFormData.city}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='State'
                name='state'
                value={signupFormData.state}
                size='lg'
                onChange={handleFormChange}
              />
              <Input
                variant='standard'
                type='text'
                label='Postal code'
                name='postal_code'
                value={signupFormData.postal_code}
                size='lg'
                onChange={handleFormChange}
              />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
      <CardFooter className='pt-0 flex gap-2'>
        <Button
          variant='text'
          color='red'
          fullWidth
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant='gradient'
          color='green'
          fullWidth
          onClick={handleSignup}
        >
          Sign up
        </Button>
      </CardFooter>
    </Card>
  );
}
export default SignUpBody;