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
      self.shopItems = result;
    }),
  }));

export const getShop = () => {
  return useQuery({
    queryKey: ["catalogue"],
    queryFn: rootStore.catalogue.getCatalogue,
  });
};
