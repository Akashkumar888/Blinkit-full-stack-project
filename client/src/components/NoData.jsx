
import React, { memo } from "react";

import noDataImage from "../assets/nothing here yet.webp";

const NoData = ({
  message = "No Data Found",
  image = noDataImage,
  imageWidth = 150,
  className = "",
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-3
        p-4
        text-center
        ${className}
      `}
    >
      <img
        src={image}
        alt={message}
        loading="lazy"
        draggable={false}
        style={{
          width: imageWidth,
        }}
        className="select-none object-contain"
      />

      <p className="text-sm text-neutral-500 font-medium">
        {message}
      </p>
    </div>
  );
};

export default memo(NoData);