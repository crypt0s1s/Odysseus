import { createHeliosApi } from "@/api/core";
import { KyInstance } from "ky";
import { ShopItem } from "./models";
import { ShopItemDetails } from "./models/shopItemDetailsModel";

interface ApiValues {
  readonly version: string
  readonly baseUrl: string
  readonly subscriptionKey: string
}

const shopApiValues: ApiValues = {
  version: "v1",
  baseUrl: "shop",
  subscriptionKey: ""
}

class Repository {
  protected api: KyInstance 

  constructor(
    {version, baseUrl, subscriptionKey}: ApiValues, 
    interceptors: ((request: Request) => void)[] = [],
  ) {
    // TODO: add sucription interceptor
    const endpoint = `${version}/${baseUrl}`
    this.api = createHeliosApi(endpoint, interceptors)
  }
}

class ShopRepository extends Repository {
  // TODO: DI api values
  constructor() {
    super(shopApiValues)
  }

  async getShopItems(page: Number): Promise<[ShopItem]> {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    let result = await this.api.get("",  {body: params}).json()

    return result as [ShopItem]
  }

  async getShopItemDetails(id: Number): Promise<ShopItemDetails> {
    let result = await this.api.get(`${id}`).json()

    return result as ShopItemDetails
  }
}

