import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
// import {
//   UserContext,
//   UserContextT,
//   USER_TYPE,
// } from "../../contexts/user.context";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, selectCurrentUser, USER_TYPE } from "../../store/user";
import { removeSecureStoreService } from "../../api-services/secure-store-service";

import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export function Navbar() {

  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  
  //const { currentUser, setCurrentUser } = useContext(UserContext) as UserContextT;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 720 && setOpenNav(false)
    );
  }, []);


  const handleSignOut = () => {
    console.log("sign out");
    removeSecureStoreService();
    //setCurrentUser(null);
    dispatch(setCurrentUser(null));
    navigate("/home");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleProfile = () => {
    navigate("/auth/profile");
  };

  const handleOrderHistory = () => {
    navigate("/order/hiorsty");
  };
  const handleOpenCart = () => {
    navigate("/order/cart");
  };

  const displayAdminMenu = (
    <Typography
          as='li'
          variant='h6'
          color='inherit'
          className='capitalize flex justify-center items-center hover:underline hover:text-yellow-500 font-normal cursor-pointer'
          onClick={handleAdmin}
    >
      admin
    </Typography>
  );


  const displayAccountMenu = (
    <>
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <IconButton variant='text' color='white'>
            <UserCircleIcon className='h-6 w-6 mx-4' />
          </IconButton>
        </MenuHandler>
        <MenuList className='bg-green-300 text-white font-normal'>
          <div className='font-medium text-base'>
            {currentUser?.user_name}'s Account
          </div>
          <hr/>
          <MenuItem onClick={handleProfile}>Profiles</MenuItem>
          <MenuItem onClick={handleOrderHistory}>Order History</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
      <Tooltip content='Cart'>
        <IconButton variant='text' color='white' onClick={handleOpenCart}>
          <ShoppingCartIcon className='h-6 w-6 mx-4' />
        </IconButton>
      </Tooltip>
    </>
  );

 
  const navList = (
    <ul className='mb-4 mt-2 px-12 flex flex-col items-center gap-2 text-inherit md:mb-0 md:mt-0 md:flex-row md:items-center md:justify-center md:gap-6'>
      {currentUser && currentUser.role !== USER_TYPE.ADMIN &&
        <Typography
          as='li'
          variant='h6'
          color='inherit'
          className='capitalize flex justify-center items-center'
        >
          <a
            href='#food-menu-section'
            className='flex items-center gap-1 p-1 font-normal hover:underline hover:text-yellow-500'
          >
            menu
          </a>
        </Typography>
      }
      <Typography
        as='li'
        variant='h6'
        color='inherit'
        className='capitalize flex justify-center items-center hover:underline'
      >
        <Link
          to='/order'
          className='flex items-center gap-1 p-1 font-normal hover:text-yellow-500'
        >
          online order
        </Link>
      </Typography>
      {currentUser && currentUser.role === USER_TYPE.ADMIN && displayAdminMenu}
      {currentUser ? (
        <Typography
          as='li'
          variant='h6'
          color='inherit'
          className='capitalize flex justify-center items-center  hover:underline hover:text-yellow-500'
        >
          <a
            onClick={handleSignOut}
            className='capitalize flex items-center gap-1 p-1 font-normal'
          >
            sign out
          </a>
        </Typography>
      ) : (
        <Typography
          as='li'
          variant='h6'
          color='inherit'
          className='capitalize flex justify-center items-center  hover:underline hover:text-yellow-500'
        >
          <Link
            to='/auth/sign-in'
            className='capitalize flex items-center gap-1 p-1 font-normal'
          >
            sign in
          </Link>
        </Typography>
      )}
    </ul>
  );

  return (
    <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-1'>
      <MTNavbar color='transparent' className='px-3 py-0'>
        <div className='container flex items-center justify-between text-white'>
          <Link to='/' className='flex items-center gap-1 p-1 font-normal'>
            <img
              className='w-[100px] hover:drop-shadow-lg '
              src='/images/bird.svg'
            ></img>
          </Link>

          <div className='hidden md:block '>{navList}</div>

          <div className='ml-auto inline-flex items-center'>
            {currentUser && displayAccountMenu}
            <IconButton
              variant='text'
              size='sm'
              color='white'
              className='ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden'
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon strokeWidth={2} className='h-6 w-6 mx-4' />
              ) : (
                <Bars3Icon strokeWidth={2} className='h-6 w-6 mx-4' />
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav
          className='rounded-xl bg-indigo-500/[.2] px-4 pt-0 pb-4 text-white'
          open={openNav}
        >
          <div className='container'>{navList}</div>
        </MobileNav>
      </MTNavbar>
      <Outlet />
    </div>
  );
}
export default Navbar;
