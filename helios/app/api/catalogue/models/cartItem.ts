import { types, Instance } from "mobx-state-tree";

export const CartItemModel = types.model({
    id: types.identifier,
    number: types.integer
})

export interface CartItem extends Instance<typeof CartItemModel> { }

