import { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//import { UserContext, UserContextT } from "./contexts/user.context";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/user.action';

import {
  HomePage,
  FoodMenuPage,
  SignUpPage,
  SignInPage,
  ProfilePage,
  OnlineOrderPage,
  AdminHomePage,
  CartPage,
  CheckoutPage,
  OrderHistoryPage,
  OrderHistoryDetailPage,
} from "./pages";

import { getSecureStoreService } from "./api-services/secure-store-service";
import routes from "./routes";

function App() {

  // Redux instead of context
  //const { currentUser: UserDataT, setCurrentUser } = useContext(UserContext) as UserContextT;
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = getSecureStoreService();
    //console.log("userInfo store: ", userInfo);
    if (userInfo) {
      //setCurrentUser(userInfo);
      dispatch(setCurrentUser(userInfo));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route exact path='/home' element={<HomePage />} />
        <Route exact path='/order/*' element={<OnlineOrderPage />} />
        <Route exact path='/order/home' element={<OnlineOrderPage />} />
        <Route exact path='/order/cart' element={<CartPage />} />
        <Route exact path='/order/checkout' element={<CheckoutPage />} />
        <Route exact path='/order/history' element={<OrderHistoryPage />} />
        <Route exact path='/order/history-detail' element={<OrderHistoryDetailPage />} />
        <Route exact path='/order/*' element={<OnlineOrderPage />} />
        <Route exact path='/menu' element={<FoodMenuPage />} />
        <Route exact path='/auth/sign-up' element={<SignUpPage />} />
        <Route exact path='/auth/sign-in' element={<SignInPage />} />
        <Route exact path='/auth/profile' element={<ProfilePage />} />
        <Route exact path='/admin/*' element={<AdminHomePage />} />
        <Route path='/*' element={<Navigate to='/home' replace />} />
      </Routes>
    </>
  );
}

export default App;
