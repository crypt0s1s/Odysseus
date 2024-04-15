import { StoreContext, getShop, getShopDetails } from "@/api";
import { ShopItemDetails } from "@/api/store/shop/models/shopItemDetailsModel";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { useContext } from "react";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { shop } = useContext(StoreContext);
  const { isPending, isSuccess, error } = getShopDetails();
  console.log("Shop Item error: " + error);
  console.log("Shop Item Details: " + shop.shopItemDetails);

  var idString: string;
  // var detailedShopItem;

  // if (typeof id === "string") {
  //   idString = id;
  //   detailedShopItem = shop.getShopItemDetailsById(idString);
  //   console.log("ID Item Details: " + detailedShopItem);
  // }

  const detailedShopItem: ShopItemDetails = {
    id: "12345",
    name: "Orange Juice",
    description:
      "A fine tasting bev which deserves the utmost respect. It is not merely a drink, but a tale woven with every drop, an elixir of elegance and sophistication that beckons the soul to indulge in its liquid poetry." +
      " In its depths, one finds not just refreshment, but a moment of serenity, a respite from the chaos of the world, encapsulated in a single glass of liquid bliss.",
    minPrice: 3.01,
    imageUrl:
      "https://cdn0.woolworths.media/content/wowproductimages/large/315649.jpg",
    imageAlt: "",
  };

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
