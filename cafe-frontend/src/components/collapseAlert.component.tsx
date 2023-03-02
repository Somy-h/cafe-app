import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@material-tailwind/react";

export const ALERT_TYPE = {
  ERROR: "pink",
  WARNING: "amber",
  INFO: "light-blue",
  SUCCESS: "light-green",
};

export const CollapseAlert = ({
  isOpen = false,
  alertType,
  children,
  ...otherProps
}) => {
  return (
    <div className='w-full min-h-[30px]'>
      <Alert
        show={isOpen}
        color={alertType}
        icon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        }
      >
        {isOpen && children}
      </Alert>
    </div>
  );
};
export default CollapseAlert;

CollapseAlert.propTypes = {
  isOpen: PropTypes.bool,
  alertType: PropTypes.string,
};
