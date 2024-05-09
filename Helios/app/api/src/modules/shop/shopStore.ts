import { flow, types } from "mobx-state-tree";
import { ShopItem, ShopItemDetails, ShopItemModel } from "./models";
import { useQuery } from "@tanstack/react-query";
import { rootStore } from '../../root';
import { ShopItemDetailsModel } from "./models";
import { shopRepository } from ".";

export const ShopStore = types
  .model("ShopStore", {
    shopItems: types.array(ShopItemModel),
    shopItemDetails: types.array(ShopItemDetailsModel),
  })
  .actions((self) => ({
    getShopItems: flow(function* getShopItems() {
      // TODO: implement pagination
      let result = yield shopRepository.getShopItems(0)
      self.shopItems = result
      return result as [ShopItem]
    }),
    getShopItemDetails: flow(function* getShopItemDetails(id: String) {
      let result = yield shopRepository.getShopItemDetails(id)
      self.shopItems = result
      return result as ShopItemDetails
    }),
  }));

// TODO: work out what I'm doing with this
export const getShop = () => {
  return useQuery({
    queryKey: ["shop"],
    queryFn: rootStore.shop.getShopItems,
  });
};

export const getShopDetails = (id: String) => {
  return useQuery({
    queryKey: ["shopDetails", id],
    queryFn: async () => rootStore.shop.getShopItemDetails(id)
  });
};
