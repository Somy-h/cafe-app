import { UserDataT } from "../contexts/user.context";

//const storeKey = "caui";
//const storeKey = process.env.REACT_APP_STOREKEY;
const storeKey = import.meta.env.VITE_STOREKEY;

export const setSecureStoreService = (userData: UserDataT) => {
  const encodedData = window.btoa(JSON.stringify(userData));
  localStorage.setItem(storeKey, encodedData);
};

export const getSecureStoreService = (): UserDataT | null => {
  const encodedUserInfo = localStorage.getItem(storeKey);
  if (encodedUserInfo) {
    return JSON.parse(window.atob(encodedUserInfo));
  } else {
    return null;
  }
};

export const removeSecureStoreService = () => {
  localStorage.removeItem(storeKey);
};
