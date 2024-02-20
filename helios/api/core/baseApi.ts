import ky, { KyInstance } from "ky"

const baseEndpoint = process.env.NEXT_PUBLIC_BASE_ENDPOINT

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
