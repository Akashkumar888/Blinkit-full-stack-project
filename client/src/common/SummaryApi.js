
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const baseURL = BACKEND_URL;


const SummaryApi={
  register:{
    url:"/api/user/register",
    method:"post",
  },
  login:{
    url:"/api/user/login",
    method:"post",
  },
  forgot_password:{
    url:"/api/user/forgot-password",
    method:"put",
  },
  forgot_password_otp_verification:{
    url:"/api/user/verify-forgot-password-otp",
    method:"put",
  },
  resetPassword:{
    url:"/api/user/reset-password",
    method:"put",
  },
}

export default SummaryApi;