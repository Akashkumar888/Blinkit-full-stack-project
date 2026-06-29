
import React from "react";

const CardLoading = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`
        min-w-36
        lg:min-w-52
        rounded-lg
        border
        bg-white
        p-3
        lg:p-4
        animate-pulse
        grid
        gap-3
        ${className}
      `}
    >
      {/* Product Image */}
      <div className="h-28 lg:h-40 w-full rounded bg-blue-50" />

      {/* Category */}
      <div className="h-4 w-20 rounded bg-blue-50" />

      {/* Product Name */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-blue-50" />
        <div className="h-4 w-3/4 rounded bg-blue-50" />
      </div>

      {/* Weight */}
      <div className="h-4 w-16 rounded bg-blue-50" />

      {/* Price + Button */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-20 rounded bg-blue-50" />
        <div className="h-8 w-20 rounded bg-blue-50" />
      </div>
    </div>
  );
};

export default CardLoading;