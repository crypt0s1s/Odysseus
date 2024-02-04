import { createContext, useContext } from 'react'
import { types, Instance } from 'mobx-state-tree'
import { UserStore, AuthStore } from '.'

type RootStoreModel = Instance<typeof RootStore>

const RootStore = types.model("RootStore", {
  auth: AuthStore,
  user: UserStore,
})

// TODO: add what I need to for env? Maybe a logger.
// Need to think about how I want to logging.
// Can be done after I work out how to make this testable.
type RootStoreEnv = {
}

const createStore = (): RootStoreModel => {
  const auth = AuthStore.create()
  const user = UserStore.create()

  const env: RootStoreEnv = { }

  return RootStore.create({ auth, user }, env)
}

export const rootStore = createStore()

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider

