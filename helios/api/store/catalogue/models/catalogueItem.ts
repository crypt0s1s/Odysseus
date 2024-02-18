import { types, Instance } from 'mobx-state-tree'

export const CatalogueItemModel = types
    .model({
        id: types.identifier,
        name: types.string,
        price: types.float,
        imageUrl: types.string
    })

export interface CatalogueItem extends Instance<typeof CatalogueItemModel> { }

