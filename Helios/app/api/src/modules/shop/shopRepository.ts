import { Repository } from "../../core/"
import { ShopItem, ShopItemDetails, ShopFetching } from "."
import { shopApiValues } from "./shopApiValues"

class ShopRepository extends Repository implements ShopFetching {
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

  async getShopItemDetails(id: String): Promise<ShopItemDetails> {
    let result = await this.api.get(`${id}`).json()

    return result as ShopItemDetails
  }
}

export const shopRepository: ShopFetching = new ShopRepository()
