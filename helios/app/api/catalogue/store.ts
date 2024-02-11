import { authHeaderInterceptor, createHeliosApi } from "../core/"
import { flow, types } from 'mobx-state-tree';
import { CatalogueItemModel } from "./models";

const catalogueUrl = 'catalogue'
export const catalogueApi = createHeliosApi(catalogueUrl)
export const authenticatedCatalogueApi = createHeliosApi(catalogueUrl, [authHeaderInterceptor])

export const CatalogueStore = types
    .model("CatalogueStore", {
        catalogue: types.array(CatalogueItemModel)
    })
    .actions((self) => ({
        getCatalogue: flow(function* getCatalogue() {
            let catalogue = yield catalogueApi.get('').json()

            self.catalogue = catalogue
        })
    }))

