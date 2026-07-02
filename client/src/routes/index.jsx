import { createBrowserRouter } from "react-router-dom";

import App from "../App";

/* Authentication */
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";

/* Public Pages */
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import UserMenuMobile from "../pages/UserMenuMobile";

/* Dashboard */
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";

/* Admin */
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermission from "../layouts/AdminPermission";

const AdminRoute = ({ children }) => (
  <AdminPermission>{children}</AdminPermission>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      /* ================= HOME ================= */

      {
        index: true,
        element: <Home />,
      },

      {
        path: "search",
        element: <SearchPage />,
      },

      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },

      {
        path: ":category/:subCategory",
        element: <ProductListPage />,
      },

      /* ================= AUTH ================= */

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },

      /* ================= USER ================= */

      {
        path: "user",
        element: <UserMenuMobile />,
      },

      {
        path: "cart",
        element: <CartMobile />,
      },

      {
        path: "checkout",
        element: <CheckoutPage />,
      },

      {
        path: "success",
        element: <Success />,
      },

      {
        path: "cancel",
        element: <Cancel />,
      },

      /* ================= DASHBOARD ================= */

      {
        path: "dashboard",
        element: <Dashboard />,

        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },

          /* ================= ADMIN ================= */

          {
            path: "category",
            element: (
              <AdminRoute>
                <CategoryPage />
              </AdminRoute>
            ),
          },

          {
            path: "subcategory",
            element: (
              <AdminRoute>
                <SubCategoryPage />
              </AdminRoute>
            ),
          },

          {
            path: "upload-product",
            element: (
              <AdminRoute>
                <UploadProduct />
              </AdminRoute>
            ),
          },

          {
            path: "product",
            element: (
              <AdminRoute>
                <ProductAdmin />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
