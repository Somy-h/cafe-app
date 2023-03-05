import { AnyAction } from 'redux';
import { setCurrentUser } from './user.action';

const USER_INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE, 
  action = {} as AnyAction
) => {
  
  if (setCurrentUser.match(action)) {
    return {
        ...state,
        currentUser: action.payload,
    };
  }
  return state;
}