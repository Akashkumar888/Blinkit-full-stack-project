import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";


const App = () => {

  const dispatch=useDispatch();

  const fetchUser= async()=>{
    const userData=await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
    
  }

  useEffect(()=>{
    fetchUser();
  },[]);


  return (
    <>
      <ToastContainer />
      <Header />

      <main className="min-h-[78vh]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default App;