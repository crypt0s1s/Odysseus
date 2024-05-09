import { KyInstance } from "ky"
import { createHeliosApi } from "./baseApi"
import { ApiValues } from "."

export class Repository {
  protected api: KyInstance 

  constructor(
    { version, baseUrl, subscriptionKey }: ApiValues, 
    interceptors: ((request: Request) => void)[] = [],
  ) {
    // TODO: add sucription interceptor
      // TODO: add back in versioning
    //const endpoint = `${version}/${baseUrl}`
    const endpoint = `${baseUrl}`
    this.api = createHeliosApi(endpoint, interceptors)
  }
}

