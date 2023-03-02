
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout";
import SignUpBody from "../components/sign-up-body.component";


export function SignUpPage() {
  let navigate = useNavigate();

  const handleClose = () => {
    navigate("/order");
  }

  return (
    <div className='container mx-auto p-4'>
         
      <img
        src='/images/hero.jpg'
        className='absolute inset-0 z-0 h-full w-full object-cover'
      /> 
     
      <div className='container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4'>
        <Navbar />
      </div> 

      <SignUpBody handleClose={handleClose} />
      
    </div> 
  );
}
