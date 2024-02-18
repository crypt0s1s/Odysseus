import { authHeaderInterceptor, createHeliosApi } from '../../core'
import { flow, types } from 'mobx-state-tree';
import { ProfileModel } from "./models";

export const profileApi = createHeliosApi('profile', [authHeaderInterceptor])

export const ProfileStore = types
    .model("ProfileStore", {
        profile: types.maybe(ProfileModel)
    })
    .actions((self) => ({
        getProfile: flow(function* getProfile() {
            let result = yield profileApi.get('').json()

            self.profile = result
        })
    }))

