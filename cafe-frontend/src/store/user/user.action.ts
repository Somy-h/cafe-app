import { USER_ACTION_TYPE, UserDataT } from "./user.types";

export const setCurrentUser = (user: UserDataT) => 
  ({type:USER_ACTION_TYPE.SET_CURRENT_USER, payload: user});