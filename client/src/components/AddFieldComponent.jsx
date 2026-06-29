
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({
  close,
  value,
  onChange,
  submit,
  loading = false,
  title = "Add Field",
  placeholder = "Enter field name",
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim() || loading) return;

    submit();
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-5 py-4">

          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            type="button"
            onClick={close}
            className="rounded p-1 transition hover:bg-gray-100 hover:text-red-500"
          >
            <IoClose size={24} />
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="p-5"
        >
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            className="
              w-full
              rounded
              border
              bg-blue-50
              p-2
              outline-none
              transition
              focus:border-primary-200
            "
          />

          <div className="mt-5 flex justify-end gap-3">

            <button
              type="button"
              onClick={close}
              className="
                rounded
                border
                px-4
                py-2
                hover:bg-gray-100
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!value.trim() || loading}
              className={`
                rounded
                px-5
                py-2
                font-medium
                text-white
                transition
                ${
                  value.trim() && !loading
                    ? "bg-primary-200 hover:bg-primary-100"
                    : "cursor-not-allowed bg-gray-400"
                }
              `}
            >
              {loading ? "Adding..." : "Add"}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
};

export default AddFieldComponent;