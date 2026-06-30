import React from "react";

import { useSelector } from "react-redux";

import NoData from "../components/NoData";

import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";

const MyOrders = () => {
  const orders = useSelector(
    (state) => state.orders.order
  );

  if (!orders?.length) {
    return (
      <section>
        <div className="bg-white p-3 shadow-sm">
          <h1 className="text-lg font-semibold">
            My Orders
          </h1>
        </div>

        <NoData />
      </section>
    );
  }

  return (
    <section>
      <div className="sticky top-0 z-10 bg-white p-3 shadow-sm">
        <h1 className="text-lg font-semibold">
          My Orders
        </h1>
      </div>

      <div className="grid gap-4 p-4">

        {orders.map((order) => (
          <article
            key={order._id}
            className="
              rounded-lg
              border
              bg-white
              p-4
              shadow-sm
            "
          >
            {/* Order ID */}

            <div className="mb-3 flex items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Order ID
                </p>

                <p className="font-semibold">
                  {order.orderId}
                </p>
              </div>

              <span
                className="
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-700
                "
              >
                {order.payment_status ||
                  "Completed"}
              </span>

            </div>

            {/* Product */}

            <div className="flex gap-4">

              <img
                src={
                  order?.product_details
                    ?.image?.[0]
                }
                alt={
                  order?.product_details
                    ?.name
                }
                loading="lazy"
                className="
                  h-20
                  w-20
                  rounded
                  border
                  object-contain
                "
              />

              <div className="flex-1">

                <h2 className="font-medium line-clamp-2">
                  {
                    order?.product_details
                      ?.name
                  }
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {
                    order?.product_details
                      ?.unit
                  }
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">

                  <p>
                    Qty :
                    <span className="ml-1 font-semibold">
                      {order.quantity}
                    </span>
                  </p>

                  <p>
                    Price :
                    <span className="ml-1 font-semibold">
                      {DisplayPriceInRupees(
                        order.price
                      )}
                    </span>
                  </p>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm text-gray-500">

              <p>
                Ordered On
              </p>

              <p>
                {new Date(
                  order.createdAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>

            </div>

          </article>
        ))}

      </div>
    </section>
  );
};

export default MyOrders;