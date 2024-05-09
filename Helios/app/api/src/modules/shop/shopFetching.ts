import { Repository } from "../../core"
import { ShopItem, ShopItemDetails } from "."

export interface ShopFetching extends Repository {
  getShopItems(page: Number): Promise<[ShopItem]>
  getShopItemDetails(id: String): Promise<ShopItemDetails>
}

