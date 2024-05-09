import { flow, types } from "mobx-state-tree";
import { authInterceptor, createHeliosApi } from "../../core";
import { ShopItemModel } from "./models";
import { useQuery } from "@tanstack/react-query";
import { rootStore } from "@/api";
import { ShopItemDetailsModel } from "./models/shopItemDetailsModel";
// import { ClientTokenResponse } from "./models";

const shopUrl = "shop";
export const shopApi = createHeliosApi(shopUrl);

export const authenticatedShopApi = createHeliosApi(shopUrl, [
  authInterceptor,
]);

export const ShopStore = types
  .model("ShopStore", {
    shopItems: types.array(ShopItemModel),
    shopItemDetails: types.array(ShopItemDetailsModel),
  })
  .actions((self) => ({
    getShopItems: flow(function* getShopItems() {
      let result = yield shopApi.get("").json();
      console.log("Test result 1: " + result);
      self.shopItems = result;
      console.log("Test result 2: " + self.shopItems);
      console.log(`shopItems: ${self.shopItems}`);
      return true;
    }),
    getShopItemDetails: flow(function* getShopItemDetails() {
      let result = yield shopApi.get("").json();
      self.shopItemDetails = result;
      return true;
    }),
  }));

export const getShop = () => {
  return useQuery({
    queryKey: ["shop"],
    queryFn: rootStore.shop.getShopItems,
  });
};

export const getShopDetails = () => {
  return useQuery({
    queryKey: ["shopDetails"],
    queryFn: rootStore.shop.getShopItemDetails,
  });
};
