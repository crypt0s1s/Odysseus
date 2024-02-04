import { types, Instance } from 'mobx-state-tree'

export const UserModel = types
    .model({
        id: types.string,
        name: types.string,
        email: types.string,
    })

export interface User extends Instance<typeof UserModel> { }
