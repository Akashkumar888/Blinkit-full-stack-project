

import React, { useState } from 'react'
import {FaRegEyeSlash} from "react-icons/fa6"
import {FaRegEye} from "react-icons/fa6"
import { toast } from 'react-toastify';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate=useNavigate();
  const [data,setData]=useState({
    email:"",
    password:"",
  });

const [showPassword,setShowPassword]=useState(false);


  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData((prev)=>{
      return {
        ...prev, [name]: value
      }
    })
  }
  
const validValue=Object.values(data).every(e1 => e1);

const handleSubmit=async(e)=>{
  e.preventDefault();
  

  try {
    const response=await Axios({
      ...SummaryApi.login,
      data:data
    })
    if(response.data.error){
      toast.error(response.data.message);
    }
    if(response.data.success){
      toast.success(response.data.message);
      setData({
        email:"",
        password:"",
      });
      navigate("/");
    }
    
  } catch (error) {
    AxiosToastError(error);
  }
}

  return (

    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
         

         <form action="" className='grid gap-4 py-4' onSubmit={handleSubmit}>
          

          <div className='grid gap-1'>
            <label htmlFor="email">Email :</label>
            <input value={data.email}
             onChange={handleChange} 
             className='bg-blue-50 p-2 border rounded 
             outline-none focus-within:border-[#ffbf00]' 
             id='email'
             type="email" 
             name='email'  
             placeholder='Enter your email' />
          </div>

        {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#ffbf00]">
              <input
                value={data.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye />
                ) : (
                  <FaRegEyeSlash />
                )}
              </button>
            </div>
          </div>


          <button
            disabled={!validValue}
            className={`${
              validValue
                ? "bg-green-800 hover:bg-green-700"
                : "bg-gray-500 cursor-not-allowed"
            } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Login
          </button>
             
         </form>

         <p>Don't have an account ? <Link to={"/register"} className='font-semibold text-green-700 cursor-pointer hover:text-green-800'>Register</Link></p>

      </div>
    </section>
  )
}

export default Login
