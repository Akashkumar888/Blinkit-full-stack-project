import React from "react";

const Divider = ({
  className = "",
  orientation = "horizontal",
}) => {
  if (orientation === "vertical") {
    return (
      <div
        aria-hidden="true"
        className={`
          w-px
          self-stretch
          bg-slate-200
          ${className}
        `}
      />
    );
  }

  return (
    <hr
      aria-hidden="true"
      className={`
        border-0
        h-px
        w-full
        bg-slate-200
        my-2
        ${className}
      `}
    />
  );
};

export default Divider;