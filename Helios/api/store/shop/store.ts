import { flow, types } from "mobx-state-tree";
import { authHeaderInterceptor, createHeliosApi } from "../../core";
import { OrderModel, ShopItem, ShopItemModel, ShoppingCartModel } from "./models";
import { useQuery } from "@tanstack/react-query";
import { rootStore } from "@/api";
import { ShopItemDetailsModel } from "./models/shopItemDetailsModel";

const shopUrl = "shop";
export const shopApi = createHeliosApi(shopUrl);

export const authenticatedShopApi = createHeliosApi(shopUrl, [
  authHeaderInterceptor,
]);

export const ShopStore = types
  .model("ShopStore", {
    shopItems: types.array(ShopItemModel),
    shopItemDetails: types.maybe(ShopItemDetailsModel),
    shoppingCart: types.optional(types.late(() => ShoppingCartModel), {}),
    orders: types.array(OrderModel),
    orderPageVisisted: types.number,
  })
  .actions((self) => ({
    getShopItems: flow(function* getShopItems() {
      let result = yield shopApi.get("").json() as [ShopItem]
      console.log(result)
      self.shopItems = result;
      console.log(self.shopItems)
      return true;
    }),
    getShopItemDetails: flow(function* getShopItemDetails(id) {
      let itemId = id.queryKey[1];
      let result = yield shopApi.get(itemId).json();
      self.shopItemDetails = result;
      return true;
    }),
    incrementOrderViews: () => {
      self.orderPageVisisted += 1
    }
  }));

export const getShop = () => {
  return useQuery({
    queryKey: ["shop"],
    queryFn: rootStore.shop.getShopItems,
  });
};

// how does the framework set up the query?
export const getShopDetails = (id: string) => {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: rootStore.shop.getShopItemDetails,
  });
};
