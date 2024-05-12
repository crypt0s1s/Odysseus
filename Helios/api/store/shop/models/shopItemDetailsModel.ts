import { types, Instance } from "mobx-state-tree";
import { ShopItemModel } from "./shopItemModel";

export const ShopItemDetailsModel = types.compose(
  ShopItemModel,
  types.model("ShopItemDetails", {
    description: types.string,
  })
);

export interface ShopItemDetails
  extends Instance<typeof ShopItemDetailsModel> {}
