import { types, Instance } from "mobx-state-tree";
import { CartItemQuantityModel } from "./cartItemQuantityModel";
import { ShopItemModel } from "./shopItemModel";
import { ShopItemDetailsModel } from "./shopItemDetailsModel";

export const ShoppingCartModel = types
  .model({
    cartItemList: types.array(CartItemQuantityModel),
  })
  //Shouldn't be an action as actions modify the state of the object
  //Should be something like view - check
  .views((self) => ({
    calculateTotalCost() {
      let totalCost = 0;
      self.cartItemList.forEach((item) => {
        totalCost += item.item.minPrice * item.quantity;
      });
      return totalCost;
    },
    calculateTotalItemCount() {
      let count = 0;
      self.cartItemList.forEach((item) => {
        count += item.quantity;
      });
      return count;
    },
  }))
  .actions((self) => ({
    addCartItem(
      shopItemDetails: Instance<typeof ShopItemDetailsModel>,
      quantity: number
    ) {
      0;
      const cartItem = CartItemQuantityModel.create({
        item: shopItemDetails,
        quantity: quantity,
      });

      self.cartItemList.push(cartItem);
    },
  }));

export interface ShoppingCart extends Instance<typeof ShoppingCartModel> {}
