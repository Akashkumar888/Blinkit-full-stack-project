
import React from "react";
import { useSelector } from "react-redux";

import isAdmin from "../utils/isAdmin";

const AdminPermission = ({
  children,
  fallback,
}) => {
  const user = useSelector(
    (state) => state.user
  );

  const hasPermission = isAdmin(
    user?.role
  );

  if (!hasPermission) {
    return (
      fallback || (
        <div
          className="
            rounded-md
            border
            border-red-200
            bg-red-50
            p-4
            text-center
            text-red-600
            font-medium
          "
        >
          You do not have permission to access this page.
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default AdminPermission;