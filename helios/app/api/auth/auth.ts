import { types } from 'mobx-state-tree';
import { authHeaderInterceptor, createHeliosApi } from '../core'

const authUrl = 'auth'
export const authApi = createHeliosApi(authUrl)
export const authenticatedAuthApi = createHeliosApi(authUrl, [authHeaderInterceptor])

export const AuthStore = types
    .model("AuthStore", {
        jwtToken: types.maybe(types.string)
    })
    .actions((self) => ({
        async verifyJWT() {
            return await authenticatedAuthApi.post('validateLoggedInUser')
        },
        async login(username: string, password: string) {
            const basicToken = btoa(`${username}:${password}`)
            const withBasicApi = authApi.extend({
                headers: {
                    'Authentication': `Basic ${basicToken}`
                }
            })

            // TODO: perform request. If successful return success.

            return await withBasicApi.post('login')
        },
    }))

