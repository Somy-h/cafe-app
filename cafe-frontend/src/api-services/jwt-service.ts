//const jwtKey = process.env.VITE_JWTKEY;
const jwtKey = import.meta.env.VITE_JWTKEY;
//const jwtKey = "cafejwt";

export const setJwt = (token: string) => {
  localStorage.setItem(jwtKey, token);
};

export const getJwt = () => {
  return localStorage.getItem(jwtKey);
};

export const removeJwt = () => {
  localStorage.removeItem(jwtKey);
};
