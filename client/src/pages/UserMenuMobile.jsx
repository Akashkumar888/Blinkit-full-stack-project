import React from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import UserMenu from "../components/UserMenu";

const UserMenuMobile = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen bg-white">

      {/* Header */}
      <div className="flex items-center justify-end border-b p-3">

        <button
          type="button"
          onClick={handleClose}
          className="rounded p-1 text-neutral-700 transition hover:bg-gray-100 hover:text-red-500"
          aria-label="Close Menu"
        >
          <IoClose size={24} />
        </button>

      </div>

      {/* User Menu */}
      <div className="container mx-auto px-4 py-5">
        <UserMenu />
      </div>

    </section>
  );
};

export default UserMenuMobile;