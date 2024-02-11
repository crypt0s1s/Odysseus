import ky, { KyInstance } from "ky"

// TODO: add to env
const baseEndpoint = 'http://127.0.0.1:8080/'

const baseApi = ky.create({
    headers: {
        "Content-Type": 'application/json'
    }
})

export function createHeliosApi(sectionUrl: string, interceptors: ((request: Request) => void)[] = []): KyInstance {
    return baseApi.extend({
        prefixUrl: `${baseEndpoint}${sectionUrl}`,
        hooks: {
            beforeRequest: interceptors
        }
    })
}
