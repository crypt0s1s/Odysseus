import { authHeaderInterceptor, createHeliosApi } from "../core/"
import { flow, types } from 'mobx-state-tree';
import { CatalogueItemModel, CartItemModel } from "./models";

const catalogueUrl = 'catalogue'
export const catalogueApi = createHeliosApi(catalogueUrl)
export const authenticatedCatalogueApi = createHeliosApi(catalogueUrl, [authHeaderInterceptor])

export const CatalogueStore = types
    .model("CatalogueStore", {
        catalogue: types.array(CatalogueItemModel),
        cart: types.map(CartItemModel)
    })
    .views((self) => ({
        getItemAmount(id: string): Number {
            console.log(`id: ${id}`)
            console.log(`value: ${self.cart.get(id)?.number ?? 0}`)
            return self.cart.get(id)?.number ?? 0
        }
    }))
    .actions((self) => ({
        getCatalogue: flow(function* getCatalogue() {
            let catalogue = yield catalogueApi.get('').json()

            self.catalogue = catalogue
            return true
        }),

        incrementItem(id: string) {
            let currentCount = self.cart.get(id)?.number ?? 0

            self.cart.put({ id, number: currentCount + 1 })
        },

        decrementItem(id: string) {
            let count = self.cart.get(id)?.number

            if (count == null) return

            if (count == 0) {
                self.cart.set(id, { id: id, number: 0 })
                return
            }

            self.cart.set(id, { id: id, number: count - 1 })
        }
    }))

