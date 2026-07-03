import { Router } from "express";
import { authUser } from "../middlewares/authUser.middleware.js";
import {
  addAddressController,
  deleteAddressController,
  getAddressController,
  updateAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/create", authUser, addAddressController);
addressRouter.get("/get", authUser, getAddressController);
addressRouter.put("/update", authUser, updateAddressController);
addressRouter.delete("/disable", authUser, deleteAddressController);

export default addressRouter;
