import React, {
  useCallback,
  useState,
} from "react";

import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import { updatedAvatar } from "../store/userSlice";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UserProfileAvatarEdit = ({
  close,
}) => {
  const user = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(false);

  const handleUploadAvatarImage =
    useCallback(
      async (e) => {
        const file =
          e.target.files?.[0];

        if (!file) return;

        if (
          !file.type.startsWith(
            "image/"
          )
        ) {
          toast.error(
            "Please select a valid image."
          );
          return;
        }

        if (
          file.size > MAX_FILE_SIZE
        ) {
          toast.error(
            "Image size should be less than 5 MB."
          );
          return;
        }

        try {
          setLoading(true);

          const formData =
            new FormData();

          formData.append(
            "avatar",
            file
          );

          const response =
            await Axios({
              ...SummaryApi.uploadAvatar,
              data: formData,
            });

          const responseData =
            response?.data;

          if (
            !responseData?.success
          ) {
            toast.error(
              responseData?.message ||
                "Avatar upload failed."
            );
            return;
          }

          dispatch(
            updatedAvatar(
              responseData.data.avatar
            )
          );

          toast.success(
            responseData.message
          );

          close?.();
        } catch (error) {
          AxiosToastError(error);
        } finally {
          setLoading(false);
        }
      },
      [dispatch, close]
    );

  return (
    <section
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-neutral-900/60
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-sm
          rounded-lg
          bg-white
          p-5
          shadow-xl
        "
      >
        {/* Header */}

        <div className="flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={close}
            className="
              rounded
              p-1
              transition
              hover:bg-gray-100
            "
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Avatar */}

        <div
          className="
            mt-2
            flex
            flex-col
            items-center
          "
        >
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-blue-50
              shadow
            "
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <FaRegUserCircle
                size={75}
                className="text-gray-400"
              />
            )}
          </div>

          <p className="mt-3 font-medium">
            {user.name}
          </p>

          <label
            htmlFor="uploadProfile"
            className={`
              mt-5
              rounded
              border
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                loading
                  ? "cursor-not-allowed bg-gray-300"
                  : "cursor-pointer border-primary-200 hover:bg-primary-100"
              }
            `}
          >
            {loading
              ? "Uploading..."
              : "Upload Avatar"}

            <input
              id="uploadProfile"
              hidden
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={
                handleUploadAvatarImage
              }
            />
          </label>

          <p className="mt-2 text-xs text-gray-500">
            JPG, PNG, WEBP (Max 5 MB)
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;