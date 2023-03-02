import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../api-services/auth-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  selectCurrentUser,
  USER_TYPE
} from "../store/user";

import {
  ALERT_TYPE,
  CollapseAlert,
} from "../components/collapseAlert.component";
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

import { UserDataT } from "../contexts/user.context";
//import { signupFormDataT, defaultSingupFormData} from "./sign-up.page";
import { signupFormDataT, defaultSingupFormData} from "../components/sign-up-body.component";

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextT;
  const [profileFormData, setProfileFormData] =
    React.useState <signupFormDataT>({
      ...defaultSingupFormData,
      id: currentUser.id,
    });

  useEffect (() => {

    const fetchProfile = async() => {
      const data = await getUserProfile(currentUser.id);
      if (data) {
        console.log("useEffect: ", data);
        const token = data.jwt;
        if (!token) {
          displayErrorMessage(true, data);
          return;
        }
        const payload = JSON.parse(window.atob(token.split(".")[1]));
        console.log(payload);
        setProfileFormData({ ...payload });
      }
    }
    fetchProfile();
  }, []);

  const handleFormChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;

    setProfileFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const verifyFormData = () => {

    if (!profileFormData) {
      displayErrorMessage(true, "Please enter user information");
      return false;;
    }
    if (profileFormData.first_name.trim().length === 0 ||
      profileFormData.last_name.trim().length === 0 
    ) {
      displayErrorMessage(true, "Please enter a valid name");
      return false;
    }
    if (profileFormData.email.trim().length === 0) {
      displayErrorMessage(true, "Please enter a valid email");
      return false;
    }
    
    if (profileFormData.pwd !== profileFormData.pwd2) {
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

  const handleUpdateProfile = async () => {

    try {
      if (! verifyFormData()) {
        return;
      }

      console.log("forData: ", profileFormData);
      const data = await updateUserProfile(profileFormData);
      
      if (data && data.success === false) {
        displayErrorMessage(true, data.message);
        return;
      }

      if (data && data.jwt) {
        const token = data.jwt;
        // display error message
        // if (!token) {
        //   displayErrorMessage(true, data);
        //   return;
        // }

        //set Jwt
        //setJwt(token);

        //set current user
        const payload = JSON.parse(window.atob(token.split(".")[1]));
        console.log(payload);
        //setCurrentUser({ ...payload });
        dispatch(setCurrentUser({ ...payload }));

        //check if user is customer or admin
        if (currentUser && currentUser.role === USER_TYPE.ADMIN) {
          navigate("/admin");
        }else {
          navigate("/order");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    navigate("/order");
  }

  return (
    <>
    <div className='container mx-auto p-4'>
      <img
        src='/images/hero.jpg'
        className='absolute inset-0 z-0 h-full w-full object-cover'
      />
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
            Profile
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
                  value={profileFormData.first_name}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='Last name'
                  name='last_name'
                  value={profileFormData.last_name}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='email'
                  label='Email'
                  size='lg'
                  name='email'
                  value = {profileFormData.email}
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='password'
                  label='Password'
                  name='pwd'
                  value={profileFormData.pwd}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='password'
                  label='Confirm Password'
                  name='pwd2'
                  value={profileFormData.pwd2}
                  size='lg'
                  onChange={handleFormChange}
                />
               <Input
                  variant='standard'
                  type='phone'
                  label='Phone number'
                  size='lg'
                  name='phone'
                  value = {profileFormData.phone}
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
                  value={profileFormData.unit_num}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='Street number'
                  name='street_num'
                  value={profileFormData.street_num}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='Address1'
                  size='lg'
                  name='addr1'
                  value = {profileFormData.addr1}
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='Address2'
                  name='addr2'
                  value={profileFormData.addr2}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='City'
                  name='city'
                  value={profileFormData.city}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='State'
                  name='state'
                  value={profileFormData.state}
                  size='lg'
                  onChange={handleFormChange}
                />
                <Input
                  variant='standard'
                  type='text'
                  label='Postal code'
                  name='postal_code'
                  value={profileFormData.postal_code}
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
            onClick={handleUpdateProfile}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div> 
    </>
  );
}
