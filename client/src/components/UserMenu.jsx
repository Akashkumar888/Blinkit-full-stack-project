import React, {
  useCallback,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";

import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import isAdmin from "../utils/isAdmin";

import { logout } from "../store/userSlice";

import toast from "react-hot-toast";

const UserMenu = ({ close }) => {
  const user = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const admin = isAdmin(user.role);

  const handleClose = useCallback(() => {
    close?.();
  }, [close]);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.logout,
      });

      const responseData = response?.data;

      if (!responseData?.success) {
        toast.error(
          responseData?.message ||
            "Logout failed."
        );
        return;
      }

      dispatch(logout());

      localStorage.clear();

      toast.success(
        responseData.message
      );

      close?.();

      navigate("/");
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate, close]);

  return (
    <div className="min-w-56">
      {/* User Info */}

      <div className="font-semibold">
        My Account
      </div>

      <div className="mt-1 flex items-center gap-2 text-sm">
        <span className="max-w-52 truncate">
          {user.name || user.mobile}

          {admin && (
            <span className="ml-1 text-red-600">
              (Admin)
            </span>
          )}
        </span>

        <Link
          to="/dashboard/profile"
          onClick={handleClose}
          className="transition hover:text-primary-200"
          aria-label="Profile"
        >
          <HiOutlineExternalLink
            size={16}
          />
        </Link>
      </div>

      <Divider />

      {/* Menu */}

      <nav className="grid gap-1 text-sm">
        {admin && (
          <>
            <Link
              to="/dashboard/category"
              onClick={handleClose}
              className="rounded px-2 py-1 transition hover:bg-orange-200"
            >
              Category
            </Link>

            <Link
              to="/dashboard/subcategory"
              onClick={handleClose}
              className="rounded px-2 py-1 transition hover:bg-orange-200"
            >
              Sub Category
            </Link>

            <Link
              to="/dashboard/upload-product"
              onClick={handleClose}
              className="rounded px-2 py-1 transition hover:bg-orange-200"
            >
              Upload Product
            </Link>

            <Link
              to="/dashboard/product"
              onClick={handleClose}
              className="rounded px-2 py-1 transition hover:bg-orange-200"
            >
              Product
            </Link>
          </>
        )}

        <Link
          to="/dashboard/myorders"
          onClick={handleClose}
          className="rounded px-2 py-1 transition hover:bg-orange-200"
        >
          My Orders
        </Link>

        <Link
          to="/dashboard/address"
          onClick={handleClose}
          className="rounded px-2 py-1 transition hover:bg-orange-200"
        >
          Saved Address
        </Link>

        <button
          type="button"
          disabled={loading}
          onClick={handleLogout}
          className={`
            rounded
            px-2
            py-1
            text-left
            transition

            ${
              loading
                ? "cursor-not-allowed bg-gray-100"
                : "hover:bg-red-100 hover:text-red-600"
            }
          `}
        >
          {loading
            ? "Logging Out..."
            : "Log Out"}
        </button>
      </nav>
    </div>
  );
};

export default UserMenu;