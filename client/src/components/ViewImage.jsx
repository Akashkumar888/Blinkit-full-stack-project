
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { IoClose } from "react-icons/io5";

import Loading from "./Loading";

const ViewImage = ({
  url,
  close,
}) => {
  const [loading, setLoading] =
    useState(true);

  const handleClose = useCallback(() => {
    close?.();
  }, [close]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [handleClose]);

  return (
    <section
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
      "
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          relative
          w-full
          max-w-3xl
          rounded-lg
          bg-white
          p-4
          shadow-xl
        "
      >
        {/* Close Button */}

        <button
          type="button"
          onClick={handleClose}
          className="
            absolute
            right-3
            top-3
            rounded
            p-1
            transition
            hover:bg-gray-100
          "
        >
          <IoClose size={24} />
        </button>

        {/* Image */}

        <div
          className="
            flex
            min-h-[300px]
            items-center
            justify-center
          "
        >
          {loading && <Loading />}

          <img
            src={url}
            alt="Preview"
            loading="lazy"
            onLoad={() =>
              setLoading(false)
            }
            onError={() =>
              setLoading(false)
            }
            className={`
              max-h-[75vh]
              w-full
              object-contain
              transition

              ${
                loading
                  ? "hidden"
                  : "block"
              }
            `}
          />
        </div>
      </div>
    </section>
  );
};

export default ViewImage;