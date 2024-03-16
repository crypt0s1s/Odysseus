import { flow, types } from "mobx-state-tree";
import { authHeaderInterceptor, createHeliosApi } from "../../core";
import { ShopItemModel } from "./models";
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

      //   const basicToken = btoa(`${username}:${password}`);
      //   const withBasicApi = shopApi.extend({
      //     headers: {
      //       Authorization: `Basic ${basicToken}`,
      //     },
      //   });

      //   let result = yield withBasicApi.post("login").json();
      //   let ctr = result as ClientTokenResponse;

      //   self.jwtToken = ctr.token;
    }),
  }));
