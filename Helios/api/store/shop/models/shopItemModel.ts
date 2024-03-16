import { types, Instance } from "mobx-state-tree";

export const ShopItemModel = types.model({
  id: types.identifier,
  name: types.string,
  minPrice: types.float,
  maxPrice: types.maybeNull(types.float),
  imageUrl: types.string,
});

export interface ShopItem extends Instance<typeof ShopItemModel> {}
