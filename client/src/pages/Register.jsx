

import React, { useState } from 'react'
import {FaRegEyeSlash} from "react-icons/fa6"
import {FaRegEye} from "react-icons/fa6"
import { toast } from 'react-toastify';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {

  const navigate=useNavigate();
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });

const [showPassword,setShowPassword]=useState(false);
const [showConfirmPassword,setShowConfirmPassword]=useState(false);

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
  if(data.password !== data.confirmPassword){
    toast.error("password and confirm password must be same")
    return;
  }
  
  try {
    const response=await Axios({
      ...SummaryApi.register,
      data:data
    })
    if(response.data.error){
      toast.error(response.data.message);
    }
    if(response.data.success){
      toast.success(response.data.message);
      setData({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
      });
      navigate("/login");
    }
    
  } catch (error) {
    AxiosToastError(error);
  }
}

  return (

    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
         <p>Welcome to Binkeyit</p>

         <form action="" className='grid gap-4 mt-6' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor="name">Name :</label>
            <input value={data.name}
             onChange={handleChange} 
             className='bg-blue-50 p-2 border rounded
             outline-none focus-within:border-[#ffbf00]' 
             id='name'
             type="text" 
             name='name' 
             autoFocus 
             placeholder='Enter your name' />
          </div>

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


          {/* Confirm Password */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">
              Confirm Password :
            </label>

            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#ffbf00]">
              <input
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Enter your Confirm Password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                className="cursor-pointer"
              >
                {showConfirmPassword ? (
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
            Register
          </button>
             
         </form>

         <p>Already have account ? <Link to={"/login"} className='font-semibold text-green-700 cursor-pointer hover:text-green-800'>Login</Link></p>

      </div>
    </section>
  )
}

export default Register
