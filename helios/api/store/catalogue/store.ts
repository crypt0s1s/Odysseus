import { authHeaderInterceptor, createHeliosApi } from "../../core";
import { flow, types } from "mobx-state-tree";
import { CatalogueItemModel, CartItemModel } from "./models";
import { useQuery } from "@tanstack/react-query";
import { rootStore } from "@/api";

const catalogueUrl = "catalogue";
export const catalogueApi = createHeliosApi(catalogueUrl);
export const authenticatedCatalogueApi = createHeliosApi(catalogueUrl, [
  authHeaderInterceptor,
]);

export const CatalogueStore = types
  .model("CatalogueStore", {
    // TODO: consider turning into map
    catalogue: types.array(CatalogueItemModel),
    cart: types.map(CartItemModel),
  })
  .views((self) => ({
    getItemAmount(id: string): Number {
      return self.cart.get(id)?.number ?? 0;
    },
  }))
  .actions((self) => ({
    getCatalogue: flow(function* getCatalogue() {
      let catalogue = yield catalogueApi.get("").json();

      self.catalogue = catalogue;
      return true;
    }),

    incrementItem(id: string) {
      let currentCount = self.cart.get(id)?.number ?? 0;

      self.cart.put({ id, number: currentCount + 1 });
    },

    decrementItem(id: string) {
      let count = self.cart.get(id)?.number;

      if (count == null) return;

      if (count <= 1) {
        self.cart.delete(id);
        return;
      }

      self.cart.set(id, { id: id, number: count - 1 });
    },
  }));

// TODO: move to another file in this level
export const getCatalogue = () => {
  return useQuery({
    queryKey: ["catalogue"],
    queryFn: rootStore.catalogue.getCatalogue,
  });
};
