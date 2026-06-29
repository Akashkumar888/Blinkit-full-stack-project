
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({
  title = "Permanent Delete",
  message = "Are you sure you want to permanently delete this item?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirm,
  cancel,
  close,
}) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [close]);

  return (
    <section
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-lg
          bg-white
          p-5
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="
              rounded
              p-1
              transition
              hover:bg-gray-100
              hover:text-red-500
            "
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Message */}

        <p className="mt-4 text-gray-600">
          {message}
        </p>

        {/* Buttons */}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={cancel}
            className="
              rounded
              border
              border-red-500
              px-4
              py-2
              font-medium
              text-red-500
              transition
              hover:bg-red-500
              hover:text-white
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={confirm}
            className="
              rounded
              border
              border-green-600
              bg-green-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-green-700
            "
          >
            {confirmText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmBox;