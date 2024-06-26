import { createContext, useContext } from "react";
import { types, Instance, castToSnapshot } from "mobx-state-tree";
import { AuthStore, CatalogueStore, ProfileStore, ShopStore } from "./store";

type RootStoreModel = Instance<typeof RootStore>;

const RootStore = types.model("RootStore", {
  auth: AuthStore,
  profile: ProfileStore,
  catalogue: CatalogueStore,
  shop: ShopStore,
});

// TODO: add what I need to for env? Maybe a logger.
// Need to think about how I want to logging.
// Can be done after I work out how to make this testable.
type RootStoreEnv = {};

const createStore = (): RootStoreModel => {
  const auth = AuthStore.create();
  const profile = ProfileStore.create();
  const catalogue = CatalogueStore.create();
  const shop = ShopStore.create();

  const env: RootStoreEnv = {};

  return RootStore.create(
    {
      auth,
      profile,
      catalogue: castToSnapshot(catalogue),
      shop: castToSnapshot(shop),
    },
    env
  );
};

export const rootStore = createStore();

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
