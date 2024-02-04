import { rootStore } from "../.."

/**
 * Applies the authentication header to a request
 */
export const authHeaderInterceptor = (request: Request) => {
    const authStore = rootStore.auth
    // TODO: do I want to create an auth store and import it directly?
    if (authStore.jwtToken == null) return

    request.headers.set('Authentication', `Bearer ${authStore.jwtToken}`)
}
