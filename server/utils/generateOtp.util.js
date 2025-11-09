
export const generateSixDigitsOtp=()=>{
  return Math.floor(Math.random() * 900000) + 100000;  // 0 to 900000 -> after + 
  // 100000 to 900000 
}
// six digit Otp number 


export const generateFourDigitsOtp=()=>{
  return Math.floor(Math.random() * 9000) + 1000;  // 0 to 9000 -> after + 
  // 1000 to 9000
}
// four digit Otp number 


// ✅ 6-Digit OTP (Using for-loop + string)
// export const generateOtp = () => {
//   const digits = "0123456789";
//   let otp = "";

//   for (let i = 0; i < 6; i++) {
//     otp += digits[Math.floor(Math.random() * 10)];
//   }

//   return otp;  // returns 6 digit OTP as a string
// };


// ✅ 4-Digit OTP (Using for-loop + string)
// export const generateFourDigitsOtp = () => {
//   const digits = "0123456789";
//   let otp = "";

//   for (let i = 0; i < 4; i++) {
//     otp += digits[Math.floor(Math.random() * 10)];
//   }

//   return otp;  // returns 4 digit OTP as a string
// };