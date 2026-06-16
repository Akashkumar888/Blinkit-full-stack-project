
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
}

export default SummaryApi;