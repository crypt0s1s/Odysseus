import { types, Instance } from "mobx-state-tree";
import { ShopItemModel } from "./shopItemModel";
import { ShopItemDetailsModel } from "./shopItemDetailsModel";

// Idea - Variation will be stored in the ShopItemModel, so a different itemWithQuantity is required for each variation of an item.
export const CartItemQuantityModel = types
  .model("CartItemQuantity", {
    item: ShopItemDetailsModel,
    quantity: types.integer,
  })
  .actions((self) => ({
    changeQuantity(quantity: number) {
      self.quantity += quantity;
    },
  }));

export interface CartItemQuantity
  extends Instance<typeof CartItemQuantityModel> {}
