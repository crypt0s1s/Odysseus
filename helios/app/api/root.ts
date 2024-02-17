import { createContext, useContext } from 'react'
import { types, Instance, castToSnapshot } from 'mobx-state-tree'
import { AuthStore, CatalogueStore, ProfileStore } from '.'

type RootStoreModel = Instance<typeof RootStore>

const Todo = types.model({
      id: types.identifier,
        task: types.string
})

const TodoStore = types.model({
      todos: types.map(Todo)
})

const RootStore = types.model("RootStore", {
  auth: AuthStore,
  profile: ProfileStore,
  catalogue: CatalogueStore,
})


// TODO: add what I need to for env? Maybe a logger.
// Need to think about how I want to logging.
// Can be done after I work out how to make this testable.
type RootStoreEnv = {
}

const createStore = (): RootStoreModel => {
  const auth = AuthStore.create()
  const profile = ProfileStore.create()
  const catalogue = CatalogueStore.create()

  const env: RootStoreEnv = { }

  return RootStore.create({ auth, profile, catalogue: castToSnapshot(catalogue) }, env)
}

export const rootStore = createStore()

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider

