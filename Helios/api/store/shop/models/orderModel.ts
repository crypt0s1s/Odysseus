import { types, Instance } from "mobx-state-tree";
import { CartItemQuantityModel } from "./cartItemQuantityModel";

export const OrderModel = types.model({
  id: types.identifier,
  dateTime: types.string,
  totalPrice: types.float,
  imageUrl: types.string,
  items: types.array(CartItemQuantityModel)
});

export interface Order extends Instance<typeof OrderModel> {}
