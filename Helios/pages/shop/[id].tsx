import { StoreContext, getShop, getShopDetails } from "@/api";
import { ShopItemDetails } from "@/api/store/shop/models/shopItemDetailsModel";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { useContext } from "react";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { shop } = useContext(StoreContext);

  var idString: string = "";
  if (typeof id === "string") {
    idString = id;
  }

  console.log("ID to fetch: " + idString);

  const { isPending, isSuccess, error } = getShopDetails(idString);

  // console.log("Shop Item error: " + error);

  var detailedShopItem = shop.shopItemDetails;

  if (detailedShopItem == undefined || detailedShopItem == null) {
    return (
      <div className="bg.white w-screen h-screen">
        <h2>No shop item details found.</h2>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <img
          className="w-[550px] h-[550px] object-cover p-8"
          src={detailedShopItem.imageUrl}
        ></img>
        <InfoColumn item={detailedShopItem} />
      </div>
    );
  }
};

function InfoColumn({ item }: { item: ShopItemDetails }) {
  return (
    <div className="flex flex-col p-8 pl-28">
      <h1>{item.name}</h1>
      <p className="text-2xl">$ {item.minPrice}</p>
      <div className="w-[550px]">
        <p className=""> {item.description}</p>
      </div>
    </div>
  );
}

export default Page;
