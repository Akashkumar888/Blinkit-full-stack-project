
// export const generateSixDigitsOtp=()=>{
//   return Math.floor(Math.random() * 900000) + 100000;  // 0 to 900000 -> after + 
//   // 100000 to 900000 
// }
// // six digit Otp number 


// export const generateFourDigitsOtp=()=>{
//   return Math.floor(Math.random() * 9000) + 1000;  // 0 to 9000 -> after + 
//   // 1000 to 9000
// }
// // four digit Otp number 


// // ✅ 6-Digit OTP (Using for-loop + string)
// // export const generateOtp = () => {
// //   const digits = "0123456789";
// //   let otp = "";

// //   for (let i = 0; i < 6; i++) {
// //     otp += digits[Math.floor(Math.random() * 10)];
// //   }

// //   return otp;  // returns 6 digit OTP as a string
// // };


// // ✅ 4-Digit OTP (Using for-loop + string)
// // export const generateFourDigitsOtp = () => {
// //   const digits = "0123456789";
// //   let otp = "";

// //   for (let i = 0; i < 4; i++) {
// //     otp += digits[Math.floor(Math.random() * 10)];
// //   }

// //   return otp;  // returns 4 digit OTP as a string
// // };



/**
 * ==========================================================
 * OTP Generator Utility
 * ==========================================================
 * Generates a numeric OTP of the specified length.
 *
 * @param {number} length - OTP length (default: 6)
 * @returns {string} Numeric OTP
 * ==========================================================
 */

export const generateOtp = (length = 6) => {
  if (!Number.isInteger(length) || length < 4 || length > 10) {
    throw new Error("OTP length must be an integer between 4 and 10.");
  }

  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return otp;
};

/**
 * Generate 6-digit OTP
 */
export const generateSixDigitOtp = () => generateOtp(6);

/**
 * Generate 4-digit OTP
 */
export const generateFourDigitOtp = () => generateOtp(4);