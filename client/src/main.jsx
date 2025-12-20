import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

{/* <StrictMode>
  All things runs two times because of strictMode
</StrictMode> */}

// 🔍 What is StrictMode in React?
// StrictMode is a development-only tool provided by React to:
// Detect side effects
// Warn about unsafe lifecycle methods
// Help prepare your app for future React features
// Catch bugs early
// 👉 It does NOT run in production builds.
// ❓ Why does everything run “two times”?
// ✅ Correct behavior (React 18+)
// In development mode only, StrictMode:
// Intentionally mounts components twice
// Calls:
// useEffect
// component render
// cleanup functions
// This is done to:
// Detect side effects that are not idempotent
// 📌 This does NOT mean your code is wrong.
// 🧪 Example (Why double render helps)
// useEffect(() => {
//   console.log("API called");
// }, []);

// Without cleanup protection →
// 👉 API gets called twice in dev → reveals bug
// ✅ Your Current Code (Working Fine)
// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

// ✔ Single render
// ✔ No double effects
// ✔ OK for beginners

// 🏭 Production-Level Recommendation
// 🔹 Option 1: Keep StrictMode (BEST PRACTICE)
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );

// ✔ Industry standard
// ✔ Helps catch bugs early
// ✔ Used by React team

// 🔹 Option 2: Remove StrictMode (Not Recommended)
// Only remove when:
// You fully understand effects
// You are debugging confusion
// You know production behavior
// ❗ Important Truth (Interview Question)
// ❌ StrictMode does NOT run code twice in production
// ✅ It only does so in development
// 🧠 Interview-Ready Answer
// “React StrictMode intentionally double-invokes certain lifecycle methods in development to detect side effects, but it has no impact on production builds.”
// 🧪 Why beginners get confused
// API calls double
// console logs duplicate
// animations restart
// 👉 Solution:
// Use proper cleanup in useEffect
// Avoid side effects in render
// 🔥 Final Recommendation for YOU
// Since you’re building a Blinkit clone / MERN app:
// ✅ Keep StrictMode ON
// It will make you a better React developer.