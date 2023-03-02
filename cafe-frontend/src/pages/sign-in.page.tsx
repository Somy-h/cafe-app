import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/layout";
import { USER_TYPE } from "../store/user";
import SignInBody from "../components/sign-in-body.component";

export function SignInPage() {
  let navigate = useNavigate();

  const handleClose = (userData: UserDataT) => {
    console.log(
      "Signup handle close: user role: ",
      userData);
      console.log(
        userData.role,
        USER_TYPE.ADMIN,
        userData.role === USER_TYPE.ADMIN
      );
    if (userData && userData.role === USER_TYPE.ADMIN) {
      navigate("/admin");
    } else {
      navigate("/order");
    }
  };

  return (
    <>
      <img
        src='/images/hero.jpg'
        className='absolute inset-0 z-0 h-full w-full object-cover'
      />
      <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4'>
        <Navbar />
      </div>
      <div className='absolute inset-0 z-0 h-full w-full bg-black/50' />
      <div className='container mx-auto p-4'>
        <SignInBody handleClose={handleClose} />
      </div>
    </>
  );
}

export default SignInPage;
