import { Instance, flow, types } from "mobx-state-tree";
import { authHeaderInterceptor, createHeliosApi } from "../../core";
import { OrderModel, ShopItemModel, ShoppingCartModel } from "./models";
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
    shoppingCart: types.optional(
      types.late(() => ShoppingCartModel),
      {}
    ),
    // shoppingCart: ShoppingCartModel,
    orderViewCount: types.number,
    savedOrders: types.array(OrderModel),
  })
  .actions((self) => ({
    getShopItems: flow(function* getShopItems() {
      let result = yield shopApi.get("").json();
      self.shopItems = result;
      return true;
    }),
    getShopItemDetails: flow(function* getShopItemDetails(id) {
      let itemId = id.queryKey[1];
      let result = yield shopApi.get(itemId).json();
      self.shopItemDetails = result;
      return true;
    }),
    getShopItemFromId(id: String) {
      return self.shopItems.find((item) => item.id === id);
    },
    incrementOrderViewCount() {
      self.orderViewCount += 1;
    },
    changeQuantityOfCartItem(ID: string, quantity: number) {
      let item = self.shoppingCart.cartItemList.find((x) => x.item.id === ID);
      if (item) {
        item.changeQuantity(quantity);
      }
    },
    addOrderToSavedOrders(order: Instance<typeof OrderModel>) {
      self.savedOrders.push(order);
    },
    resetCartList() {
      self.shoppingCart = ShoppingCartModel.create({ cartItemList: [] });
    },
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
