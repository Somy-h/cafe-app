import React from 'react';
//import { useContext } from 'react';
import { useLocation, Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   UserContext,
//   UserContextT,
//   USER_TYPE,
// } from "../../contexts/user.context";
import CartIcon from "../cart-icon.component";
import { removeSecureStoreService } from "../../api-services/secure-store-service";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, selectCurrentUser, USER_TYPE } from "../../store/user";

import {
  Navbar,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserIcon,
  UserCircleIcon,
  Bars3Icon,
  TableCellsIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenCartView,
  setOpenSidenav,
} from "../../contexts/tailwind.context";

export const OrderNavbar: FunctionComponent = () => {
  const navigate = useNavigate();
  //const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextT;
  const userdispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const handleProfile = () => {
    console.log("profile");
    navigate("/auth/profile");
  };

  const handleOrderHistory = () => {
    navigate("/order/history");
  };
  
  const handleSignOut = () => {
    console.log("sign out");
    removeSecureStoreService();
    //setCurrentUser(null);
    userdispatch(setCurrentUser(null));
    navigate("/home");
  };

 const displayAccountMenu = (
   currentUser &&
     <Menu
       animate={{
         mount: { y: 0 },
         unmount: { y: 25 },
       }}
     >
       <MenuHandler>
         <IconButton variant='text' color='blue-gray'>
           <UserCircleIcon className='h-6 w-6 mx-4' />
         </IconButton>
       </MenuHandler>
       <MenuList className='bg-white text-blue-gray-500 font-normal'>
         <div className='font-medium text-base'>
           {currentUser?.user_name}'s Account
         </div>
         <MenuItem onClick={handleProfile}>Profiles</MenuItem>
         <MenuItem onClick={handleOrderHistory}>Order History</MenuItem>
         <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
       </MenuList>
     </Menu>
   
 );

  return (
    <Navbar
      color='white'
      className='rounded-xl transition-all px-6 py-1'
      fullWidth
    >
      <div className='flex justify-between md:items-center'>
        <div className='flex items-center gap-2'>
          <IconButton
            variant='text'
            color='blue-gray'
            className='grid xl:hidden'
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className='h-6 w-6 text-blue-gray-500' />
          </IconButton>
          <Typography
            as='li'
            variant='small'
            color='blue-gray'
            className='capitalize'
          >
            <Link
              to='/order/home'
              className='flex items-center gap-1 p-1 font-normal'
            >
              <TableCellsIcon className='w-5 h-5 text-inherit text-blue-gray-500' />
              Online Menu
            </Link>
          </Typography>
          {!currentUser && (
            <Typography
              as='li'
              variant='small'
              color='blue-gray'
              className='capitalize'
            >
              <Link
                to='/auth/sign-in'
                className='flex items-center gap-1 p-1 font-normal'
              >
                <ArrowRightOnRectangleIcon className='w-5 h-5 text-inherit text-blue-gray-500' />
                Sign In
              </Link>
            </Typography>
          )}

          {currentUser && currentUser.role === USER_TYPE.ADMIN && (
            <Typography
              as='li'
              variant='small'
              color='blue-gray'
              className='capitalize'
            >
              <Link
                to='/admin'
                className='flex items-center gap-1 p-1 font-normal'
              >
                <UserIcon className='w-5 h-5 text-inherit text-blue-gray-500' />
                Admin
              </Link>
            </Typography>
          )}
        </div>
        <div className='flex'>
          {displayAccountMenu}
          <IconButton
            variant='text'
            color='blue-gray'
            onClick={() => setOpenCartView(dispatch, true)}
          >
            <CartIcon className='h-5 w-5 text-blue-gray-500' />
          </IconButton>
          <div></div>
          {/* {isCartOpen && <CartDropdown />} */}
        </div>
      </div>
      <Outlet />
    </Navbar>
  );
}

//OrderNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default OrderNavbar;
