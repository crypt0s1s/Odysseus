import { types, Instance } from "mobx-state-tree";

export const ShopItemModel = types.model({
  id: types.identifier,
  name: types.string,
  minPrice: types.float,
  // TODO: Josh to fix up
  //maxPrice: types.maybeNull(types.float),
  imageUrl: types.string,
  imageAlt: types.maybe(types.string),
});

export interface ShopItem extends Instance<typeof ShopItemModel> { }
