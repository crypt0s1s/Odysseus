import { types, Instance } from "mobx-state-tree";

export const ShopItemDetailsModel = types.model({
  id: types.identifier,
  name: types.string,
  minPrice: types.float,
  // TODO: Josh to fix up
  //maxPrice: types.maybeNull(types.float),
  imageUrl: types.string,
  imageAlt: types.maybe(types.string),
  description: types.string,
});

export interface ShopItemDetails extends Instance<typeof ShopItemDetailsModel> { }

