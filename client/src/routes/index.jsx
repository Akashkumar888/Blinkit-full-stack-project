import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import SearchPage from "../pages/SearchPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/search" element={<SearchPage/>}/>

      {/* Protected User Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* <Dashboard /> */}
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
