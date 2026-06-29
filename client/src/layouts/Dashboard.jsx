import React from "react";

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import UserMenu from "../components/UserMenu";
import Loading from "../components/Loading";

const Dashboard = () => {
  const user = useSelector(
    (state) => state.user
  );

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div
        className="
          container
          mx-auto
          grid
          lg:grid-cols-[260px_1fr]
          gap-6
          p-4
        "
      >
        {/* Sidebar */}

        <aside
          className="
            hidden
            lg:block
            sticky
            top-24
            h-fit
            max-h-[calc(100vh-110px)]
            overflow-y-auto
            rounded-lg
            border
            bg-white
            shadow-sm
          "
        >
          <div className="p-4">
            <UserMenu />
          </div>
        </aside>

        {/* Main Content */}

        <main
          className="
            min-h-[75vh]
            rounded-lg
            bg-white
            p-4
            shadow-sm
          "
        >
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default Dashboard;