import React, { useCallback, useState } from "react";

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { useSelector } from "react-redux";

import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

import toast from "react-hot-toast";

import { useGlobalContext } from "../provider/GlobalProvider";

import AddAddress from "../components/AddAddress";
import EditAddressDetails from "../components/EditAddressDetails";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import ConfirmBox from "../components/ConfirmBox";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);

  const { fetchAddress } = useGlobalContext();

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(false);

  const openEditModal = useCallback((address) => {
    setSelectedAddress(address);
    setIsEditOpen(true);
  }, []);

  const handleDeleteAddress = useCallback(async () => {
    if (!deleteId) return;

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: deleteId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message || "Address removed.");

        fetchAddress?.();

        setDeleteId(null);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [deleteId, fetchAddress]);

  return (
    <>
      <section className="rounded-lg bg-white shadow-sm">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Saved Addresses</h2>

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="
              rounded-full
              border
              border-primary-200
              px-4
              py-2
              font-medium
              text-primary-200
              transition
              hover:bg-primary-200
              hover:text-black
            "
          >
            Add Address
          </button>
        </div>

        {/* Address List */}

        <div className="space-y-4 bg-blue-50 p-4">
          {addressList.length === 0 ? (
            <NoData />
          ) : (
            addressList
              .filter((address) => address.status)
              .map((address) => (
                <div
                  key={address._id}
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    rounded-lg
                    border
                    bg-white
                    p-4
                    shadow-sm
                  "
                >
                  {/* Details */}

                  <div className="space-y-1 text-sm">
                    <p>{address.address_line}</p>

                    <p>{address.city}</p>

                    <p>{address.state}</p>

                    <p>
                      {address.country} - {address.pincode}
                    </p>

                    <p>{address.mobile}</p>
                  </div>

                  {/* Actions */}

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(address)}
                      className="
                        rounded
                        bg-green-100
                        p-2
                        text-green-700
                        transition
                        hover:bg-green-600
                        hover:text-white
                      "
                    >
                      <MdEdit size={20} />
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setDeleteId(address._id)}
                      className="
                        rounded
                        bg-red-100
                        p-2
                        text-red-600
                        transition
                        hover:bg-red-600
                        hover:text-white
                      "
                    >
                      {loading && deleteId === address._id ? (
                        <Loading />
                      ) : (
                        <MdDelete size={20} />
                      )}
                    </button>
                  </div>
                </div>
              ))
          )}

          {/* Add Address Card */}

          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="
              flex
              h-16
              w-full
              items-center
              justify-center
              rounded-lg
              border-2
              border-dashed
              border-gray-300
              bg-white
              font-medium
              transition
              hover:border-primary-200
              hover:bg-blue-100
            "
          >
            + Add New Address
          </button>
        </div>
      </section>

      {/* Add Address */}

      {isAddOpen && <AddAddress close={() => setIsAddOpen(false)} />}

      {/* Edit Address */}

      {isEditOpen && selectedAddress && (
        <EditAddressDetails
          data={selectedAddress}
          close={() => setIsEditOpen(false)}
        />
      )}

      {/* Delete Confirmation */}

      {deleteId && (
        <CofirmBox
          close={() => setDeleteId(null)}
          cancel={() => setDeleteId(null)}
          confirm={handleDeleteAddress}
        />
      )}
    </>
  );
};

export default Address;
