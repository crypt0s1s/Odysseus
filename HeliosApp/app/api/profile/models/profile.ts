import { types, Instance } from 'mobx-state-tree'

export const ProfileModel = types
    .model({
        id: types.string,
        displayName: types.string,
        fullName: types.string,
        email: types.string,
    })

export interface Profile extends Instance<typeof ProfileModel> { }
