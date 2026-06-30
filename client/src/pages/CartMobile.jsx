
import React, { memo } from "react";

import DisplayCartItem from "../components/DisplayCartItem";

const CartMobile = () => {
  return (
    <main
      className="
        min-h-screen
        bg-gray-50
      "
    >
      <DisplayCartItem />
    </main>
  );
};

CartMobile.displayName = "CartMobile";

export default memo(CartMobile);