import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";

import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response = await Axios({
          ...SummaryApi.updateUserDetails,
          data: formData,
        });

        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);

          const latestUser = await fetchUserDetails();

          dispatch(setUserDetails(latestUser.data));
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, formData]
  );

  return (
    <section className="p-4">

      {/* Avatar */}

      <div className="flex flex-col items-start gap-3">

        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shadow">

          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle
              size={65}
              className="text-slate-500"
            />
          )}

        </div>

        <button
          type="button"
          onClick={() => setOpenProfileAvatarEdit(true)}
          className="border border-primary-100 hover:border-primary-200 hover:bg-primary-200 hover:text-black rounded-full px-4 py-1 text-sm transition"
        >
          Edit Avatar
        </button>

      </div>

      {/* Edit Avatar Modal */}

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit
          close={() => setOpenProfileAvatarEdit(false)}
        />
      )}

      {/* Profile Form */}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 mt-6"
      >

        {/* Name */}

        <div className="grid gap-1">
          <label
            htmlFor="name"
            className="font-medium"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-blue-50 border rounded p-2 outline-none focus:border-primary-200"
          />
        </div>

        {/* Email */}

        <div className="grid gap-1">
          <label
            htmlFor="email"
            className="font-medium"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-blue-50 border rounded p-2 outline-none focus:border-primary-200"
          />
        </div>

        {/* Mobile */}

        <div className="grid gap-1">
          <label
            htmlFor="mobile"
            className="font-medium"
          >
            Mobile
          </label>

          <input
            id="mobile"
            name="mobile"
            type="text"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="bg-blue-50 border rounded p-2 outline-none focus:border-primary-200"
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className={`
            border
            border-primary-100
            rounded
            px-4
            py-2
            font-semibold
            transition
            ${
              loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "hover:bg-primary-100 text-primary-200 hover:text-black"
            }
          `}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>

    </section>
  );
};

export default Profile;