import { ShopItemDetails } from "@/api/store/shop/models/shopItemDetailsModel";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const newItem: ShopItemDetails = {
    id: "12345",
    name: "A Fine Bev",
    description:
      "A fine tasting bevvy which deserves the utmost respect. It is not merely a drink, but a tale woven with every drop, an elixir of elegance and sophistication that beckons the soul to indulge in its liquid poetry." +
      "In its depths, one finds not just refreshment, but a moment of serenity, a respite from the chaos of the world, encapsulated in a single glass of liquid bliss.",
    minPrice: 125.0,
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
    imageAlt: "",
  };

  return (
    <div className="flex flex-row">
      <ItemPicture item={newItem} />
      <InfoColumn item={newItem} />
    </div>
  );
};

function InfoColumn({ item }: { item: ShopItemDetails }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex flex-col p-8 pl-28">
      <h1>{item.name}</h1>
      <p className="text-2xl">$ {item.minPrice}</p>
      <div className="w-[550px]">
        <p className=""> {item.description}</p>
        <p className="text-sm pt-10">Test Item ID: {id}</p>
      </div>
    </div>
  );
}

function ItemPicture({ item }: { item: ShopItemDetails }) {
  return (
    <img
      className="w-[550px] h-[550px] object-cover p-8"
      src={item.imageUrl}
    ></img>
  );
}

export default Page;
