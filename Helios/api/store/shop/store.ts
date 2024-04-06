import { flow, types } from "mobx-state-tree";
import { authHeaderInterceptor, createHeliosApi } from "../../core";
import { ShopItemModel } from "./models";
import { useQuery } from "@tanstack/react-query";
import { rootStore } from "@/api";
// import { ClientTokenResponse } from "./models";

const shopUrl = "shop";
export const shopApi = createHeliosApi(shopUrl);

export const authenticatedShopApi = createHeliosApi(shopUrl, [
  authHeaderInterceptor,
]);

export const ShopStore = types
  .model("ShopStore", {
    shopItems: types.array(ShopItemModel),
  })
  .actions((self) => ({
    getShopItems: flow(function* getShopItems() {
      let result = yield shopApi.get("").json();
      console.log("Test result: " + result);
      self.shopItems = result;
      console.log("Test result 2: " + self.shopItems);
      console.log(`shopItems: ${self.shopItems}`);
      return true;
    }),
  }));

export const getShop = () => {
  return useQuery({
    queryKey: ["shop"],
    queryFn: rootStore.shop.getShopItems,
  });
};
