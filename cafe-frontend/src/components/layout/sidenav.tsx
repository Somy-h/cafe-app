import { FunctionComponent } from 'react';
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { CategoryT } from "../../hooks";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "../../contexts/tailwind.context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

export interface ISidenavProp {
  categories: CategoryT[];
}

export const Sidenav: FunctionComponent<ISidenavProp> = ({ categories }) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;

  return (
    <aside
      className={`bg-white shadow-lg ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className='relative border-b border-white/20'>
        <Link to='/' className='flex items-center gap-4 py-6 px-8'>
          <Avatar src='/images/leftBird.png' size='sm' />
          <Typography variant='h6' color='blue-gray'>
            Little pecks
          </Typography>
        </Link>
        <IconButton
          variant='text'
          color='white'
          size='sm'
          ripple={false}
          className='absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden'
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className='h-5 w-5 text-black' />
        </IconButton>
      </div>
      <div className='m-4'>
        {categories && categories.map(({ id, name, description }) => (
          <ul key={id} className='mb-2 flex flex-col gap-1'>
            {name && (
              <li className='mx-3 mt-2 mb-0'>
                <a href={`#${name}`}>
                  <Button
                    variant={false ? "gradient" : "text"}
                    className='flex text-start gap-2 px-4 capitalize'
                    fullWidth
                    // onClick={() => handleOpenCategoryItem(id, name, description)}
                  >
                    <Typography
                      variant='small'
                      color={sidenavType === "dark" ? "white" : "blue-gray"}
                      className='font-black uppercase opacity-75'
                    >
                      {name}
                    </Typography>
                  </Button>
                </a>
              </li>
            )}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
};


export default Sidenav;
