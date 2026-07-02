import React, { memo, useCallback, useState } from "react";

import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import EditProductAdmin from "./EditProductAdmin";
import ConfirmBox from "./ConfirmBox";
import Loading from "./Loading";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleOpenEdit = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleOpenDelete = useCallback(() => {
    setOpenDelete(true);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data?._id,
        },
      });

      const responseData = response?.data;

      if (responseData?.success) {
        toast.success(responseData.message);

        fetchProductData?.();

        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [data?._id, fetchProductData]);

  return (
    <>
      <div
        className="
          w-full
          max-w-[170px]
          rounded-lg
          border
          bg-white
          p-4
          shadow-sm
          transition
          hover:shadow-md
        "
      >
        <div
          className="
            flex
            h-36
            items-center
            justify-center
            overflow-hidden
            rounded
          "
        >
          <img
            src={data?.image?.[0]}
            alt={data?.name}
            loading="lazy"
            className="
              h-full
              w-full
              object-scale-down
            "
          />
        </div>

        <h3
          className="
            mt-3
            line-clamp-2
            font-medium
          "
        >
          {data?.name}
        </h3>

        <p className="text-sm text-neutral-500">{data?.unit}</p>

        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-3
          "
        >
          <button
            type="button"
            onClick={handleOpenEdit}
            className="
              rounded
              border
              border-green-600
              bg-green-100
              py-2
              text-sm
              font-medium
              text-green-700
              transition
              hover:bg-green-200
            "
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleOpenDelete}
            className="
              rounded
              border
              border-red-600
              bg-red-100
              py-2
              text-sm
              font-medium
              text-red-600
              transition
              hover:bg-red-200
            "
          >
            Delete
          </button>
        </div>
      </div>

      {openEdit && (
        <EditProductAdmin
          data={data}
          close={handleCloseEdit}
          fetchProductData={fetchProductData}
        />
      )}

      {openDelete && (
        <CofirmBox
          close={handleCloseDelete}
          cancel={handleCloseDelete}
          confirm={handleDelete}
        >
          {loading && <Loading />}
        </CofirmBox>
      )}
    </>
  );
};

export default memo(ProductCardAdmin);
