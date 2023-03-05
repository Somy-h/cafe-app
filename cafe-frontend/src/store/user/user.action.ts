import { USER_ACTION_TYPE, UserDataT } from "./user.types";
import { createAction, ActionWithPayload, withMatcher } from "../utils/reducer.utils";

// export const setCurrentUser = (user: UserDataT) => 
//   ({type:USER_ACTION_TYPE.SET_CURRENT_USER, payload: user});

//export type UserActionT = setCurrentUserT;

export type setCurrentUserT = ActionWithPayload<USER_ACTION_TYPE.SET_CURRENT_USER, UserDataT>;

export const setCurrentUser = withMatcher((user: UserDataT) :setCurrentUserT  => 
  createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));

