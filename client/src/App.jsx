import { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartMobileLink from "./components/CartMobile";

import GlobalProvider from "./provider/GlobalProvider";

import Axios from "./utils/Axios";
import AxiosToastError from "./utils/AxiosToastError";
import fetchUserDetails from "./utils/fetchUserDetails";

import SummaryApi from "./common/SummaryApi";

import {
  setUserDetails,
} from "./store/userSlice";

import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  /**
   * Fetch Logged-in User
   */
  const fetchUser = useCallback(async () => {
    try {
      const response = await fetchUserDetails();

      if (response?.data) {
        dispatch(setUserDetails(response.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }, [dispatch]);

  /**
   * Fetch Categories
   */
  const fetchCategories = useCallback(async () => {
    try {
      dispatch(setLoadingCategory(true));

      const { data } = await Axios({
        ...SummaryApi.getCategory,
      });

      if (data.success) {
        const sortedCategories = [...data.data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        dispatch(setAllCategory(sortedCategories));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  }, [dispatch]);

  /**
   * Fetch Sub Categories
   */
  const fetchSubCategories = useCallback(async () => {
    try {
      const { data } = await Axios({
        ...SummaryApi.getSubCategory,
      });

      if (data.success) {
        const sortedSubCategories = [...data.data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        dispatch(setAllSubCategory(sortedSubCategories));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }, [dispatch]);

  /**
   * Initial App Data
   */
  useEffect(() => {
    Promise.all([
      fetchUser(),
      fetchCategories(),
      fetchSubCategories(),
    ]);
  }, [
    fetchUser,
    fetchCategories,
    fetchSubCategories,
  ]);

  return (
    <GlobalProvider>
      <Header />

      <main className="min-h-[78vh]">
        <Outlet />
      </main>

      <Footer />

      <Toaster position="top-right" reverseOrder={false} />

      {location.pathname !== "/checkout" && (
        <CartMobileLink />
      )}
    </GlobalProvider>
  );
}

export default App;