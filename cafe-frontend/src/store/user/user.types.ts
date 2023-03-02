export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: "user/SET_CURRENT_USER",
};

export type UserDataT = {
  id: number;
  user_name: string;
  email: string;
  role: number;
  address_id: number;
}

export const USER_TYPE = {
  CUSTOMER: 0,
  CASHIER: 1,
  ADMIN: 2,
};