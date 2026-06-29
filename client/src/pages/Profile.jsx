
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import e from 'express';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { toast } from 'react-toastify';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {

  const user=useSelector((state) => state.user);
  const [openProfileAvatarEdit,setOpenProfileAvatarEdit]=useState(false);
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();


  const [userData,setUserData]=useState({
    name:user.name,
    email:user.email,
    mobile:user.mobile
  });


  useEffect(()=>{
   setUserData({
    name:user.name,
    email:user.email,
    mobile:user.mobile
   })

  },[user]);


  const handleOnChange=()=>{
    const {name,value}=e.target;

    setUserData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      
      const response=await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });
      const {data : responseData}=response;

      if(responseData.success){
        toast.success(responseData.message);
        const userData=await fetchUserDetails();
            dispatch(setUserDetails(userData.data));
      }
  
    } catch (error) {
      AxiosToastError(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div>



      <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
        {
          user.avatar ? (
            <img src={user.avatar} alt={user.name} className='w-full h-full'/>
          ) : (
            
            <FaRegUserCircle size={60}/>
          )
        }
      </div>
      <button onClick={()=>setOpenProfileAvatarEdit(true)} className='text-sm min-w-20 border border-[#ffbf00]
      hover:border-[#ffbf00] hover:bg-[#ffbf00] px-3 py-1 rounded-full mt-3'>Edit</button>

    
     {
      openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={()=>setOpenProfileAvatarEdit(false)}/>
      )
     }

    {/* name mobile email change password  */}
    <form action="" className='my-4 grid gap-4' onSubmit={handleSubmit}>
      <div className='grid'>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='Enter your name'
        className='p-2 bg-blue-50 outline-[#ffbf00] border focus-within:border-[#ffbf00] rounded'
        value={userData.name}
        name='name'
        id='name'
        onChange={handleOnChange}
        required
        />
      </div>

      <div className='grid'>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder='Enter your email'
        className='p-2 bg-blue-50 outline-[#ffbf00] border focus-within:border-[#ffbf00] rounded'
        value={userData.email}
        name='email'
        id='email'
        onChange={handleOnChange}
        required
        />
      </div>


      <div className='grid'>
        <label htmlFor="mobile">Mobile</label>
        <input type="number" placeholder='Enter your Mobile'
        className='p-2 bg-blue-50 outline-[#ffbf00] border focus-within:border-[#ffbf00] rounded'
        value={userData.mobile}
        name='mobile'
        id='mobile'
        onChange={handleOnChange}
        required
        />
      </div>

    <button className='border px-4 py-2 font-semibold hover:bg-[#ffbf00] border-[#ffbf00] text-[#ffbf00] hover:text-neutral-800 rounded'>
      {
        loading ? "Loading..." : "Submit"
      }
       </button>
    </form>

    </div>
  )
}

export default Profile
