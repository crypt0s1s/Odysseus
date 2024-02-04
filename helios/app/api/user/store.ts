import { authHeaderInterceptor, createHeliosApi } from ".."
import { types } from 'mobx-state-tree';
import { UserModel } from "./models";

export const userApi = createHeliosApi('user', [authHeaderInterceptor])

export const UserStore = types
    .model("UserStore", {
        user: types.maybe(UserModel)
    })
    .actions((self) => ({
        async getUserInfo() {
            const id = self.user.id
            // TODO: work out how this is going to work
            return await userApi.get('')
        }
    }))

