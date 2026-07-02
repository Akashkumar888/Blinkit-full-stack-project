import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import DisplayTable from "../components/DisplayTable";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import EditSubCategory from "../components/EditSubCategory";
import ViewImage from "../components/ViewImage";
import ConfirmBox from "../components/ConfirmBox";
import Loading from "../components/Loading";
import NoData from "../components/NoData";

const columnHelper = createColumnHelper();

const SubCategoryPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [imageURL, setImageURL] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [openDeleteBox, setOpenDeleteBox] = useState(false);
  const [deleteData, setDeleteData] = useState(null);

  const fetchSubCategory = useCallback(async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setSubCategories(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubCategory();
  }, [fetchSubCategory]);

  const handleDeleteSubCategory = async () => {
    if (!deleteData?._id) return;

    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: {
          _id: deleteData._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);

        setOpenDeleteBox(false);
        setDeleteData(null);

        fetchSubCategory();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
      }),

      columnHelper.accessor("image", {
        header: "Image",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-10 h-10 object-contain cursor-pointer"
              onClick={() => setImageURL(row.original.image)}
            />
          </div>
        ),
      }),

      columnHelper.accessor("category", {
        header: "Category",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            {row.original.category.map((category) => (
              <span
                key={category._id}
                className="px-2 py-1 rounded bg-blue-50 text-sm shadow"
              >
                {category.name}
              </span>
            ))}
          </div>
        ),
      }),

      columnHelper.accessor("_id", {
        header: "Action",
        cell: ({ row }) => (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setEditData(row.original);
                setOpenEdit(true);
              }}
              className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-700 transition"
            >
              <HiPencil size={18} />
            </button>

            <button
              onClick={() => {
                setDeleteData(row.original);
                setOpenDeleteBox(true);
              }}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
            >
              <MdDelete size={18} />
            </button>
          </div>
        ),
      }),
    ],
    [],
  );

  return (
    <section>
      {/* Header */}

      <div className="bg-white shadow-md p-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sub Categories</h2>

        <button
          onClick={() => setOpenAddModal(true)}
          className="border border-primary-200 hover:bg-primary-200 px-4 py-2 rounded transition"
        >
          Add Sub Category
        </button>
      </div>

      {/* Content */}

      <div className="p-4">
        {loading ? (
          <Loading />
        ) : subCategories.length === 0 ? (
          <NoData />
        ) : (
          <div className="overflow-x-auto">
            <DisplayTable data={subCategories} column={columns} />
          </div>
        )}
      </div>

      {/* Add */}

      {openAddModal && (
        <UploadSubCategoryModel
          close={() => setOpenAddModal(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {/* Edit */}

      {openEdit && editData && (
        <EditSubCategory
          data={editData}
          close={() => {
            setOpenEdit(false);
            setEditData(null);
          }}
          fetchData={fetchSubCategory}
        />
      )}

      {/* Image */}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL("")} />}

      {/* Delete */}

      {openDeleteBox && (
        <CofirmBox
          close={() => {
            setOpenDeleteBox(false);
            setDeleteData(null);
          }}
          cancel={() => {
            setOpenDeleteBox(false);
            setDeleteData(null);
          }}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
