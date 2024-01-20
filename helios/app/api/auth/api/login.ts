import ky from 'ky'
import { ClientTokenResponse } from '../models/'
import { observable } from "mobx";

const endpoint = 'http://127.0.0.1:8080'
const authEndpoint = `${endpoint}/auth/`

// TODO: have a core api thingy that all the modules data extend from
const authApi = ky.create(
    {
        prefixUrl: authEndpoint,
        headers: {
            accept: 'application/json',
        }
    }
)

class AuthStore {
    @observable accessor jwtToken: String | undefined = undefined
}

export const authStore = new AuthStore()

// TODO: do I need this? I think that I can send the auth request anyway
//
const authenticatedAuthApi = authApi.extend({
    headers: {
        authentication: `Bearer ${authStore.jwtToken}`
    }
})

export const login = async ({email, password}: {email: string, password: string}) => {
    const basicToken = btoa(`${email}:${password}`)
    const response = await authApi.post(
        'login',
        { headers: { authorization: `Basic ${basicToken}` } }
    ).json()
    // TODO: remove delay
    await new Promise( resolve => setTimeout(resolve, 1000) )

    // TODO: consider adding a try catch here when casting as a standard?
    return response as ClientTokenResponse
}

export const verifyJWT = async () => {
    return await authenticatedAuthApi.post('validateLoggedInUser')
}
