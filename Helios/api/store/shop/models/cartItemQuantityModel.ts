import { types, Instance } from "mobx-state-tree";
import { ShopItemModel } from "./shopItemModel";

// Idea - Variation will be stored in the ShopItemModel, so a different itemWithQuantity is required for each variation of an item.
export const CartItemQuantityModel = types.model({
  item: ShopItemModel,
  quantity: types.integer,
});

export interface CartItemQuantity
  extends Instance<typeof CartItemQuantityModel> {}
