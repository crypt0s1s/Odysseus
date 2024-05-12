import { types, Instance } from "mobx-state-tree";
import { CartItemQuantityModel } from "./cartItemQuantityModel";
import { ShopItemDetailsModel } from "./shopItemDetailsModel";

export const OrderModel = types
  .model({
    id: types.identifier,
    dateTime: types.string,
    totalPrice: types.float,
    imageUrl: types.string,
    items: types.array(CartItemQuantityModel),
  })
  .views((self) => ({}))
  .actions((self) => ({
    addItem(itemQuantityModel: Instance<typeof CartItemQuantityModel>) {
      self.items.push(itemQuantityModel);
    },
    updateTotalCost() {
      let totalCost = 0;
      self.items.forEach((item) => {
        totalCost += item.item.minPrice * item.quantity;
      });
      self.totalPrice = totalCost;
    },
  }));

export interface Order extends Instance<typeof OrderModel> {}
