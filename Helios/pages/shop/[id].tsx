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

  const detailedShopItem = shop.shopItemDetails.find(
    (item) => item.id === id
  ) as ShopItemDetails;

  console.log("ID Item Details: " + detailedShopItem);

  // const detailedShopItem: ShopItemDetails = {
  //   id: "12345",
  //   name: "A Fine Bev",
  //   description:
  //     "A fine tasting bevvy which deserves the utmost respect. It is not merely a drink, but a tale woven with every drop, an elixir of elegance and sophistication that beckons the soul to indulge in its liquid poetry." +
  //     "In its depths, one finds not just refreshment, but a moment of serenity, a respite from the chaos of the world, encapsulated in a single glass of liquid bliss.",
  //   minPrice: 125.0,
  //   imageUrl:
  //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
  //   imageAlt: "",
  // };

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
