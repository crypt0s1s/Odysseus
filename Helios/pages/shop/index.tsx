import { NextPageWithLayout } from "../_app";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SearchPanel from "./SearchPanel";
import { StoreContext, getShop } from "@/api";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import React from "react";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const { isSuccess } = getShop();
  return (
    <main className="bg-white">
      <div className="flex flex-col">
        <NavBar />
        <div className="flex flex-row">
          {/* TODO fix on smaller screens SideBar shrinks and is not longer the correct width */}
          <SideBar />{" "}
          <div className="flex flex-col w-screen">
            <SearchPanel />
            {/* <ShopItemGrid /> */}
            <ShopItemGridTest name="CoolBook!" minPrice={20} />
          </div>
        </div>
      </div>
    </main>
  );
};

const ShopItemGrid = observer(() => {
  const { shop } = useContext(StoreContext);
  const { isPending, isSuccess, error } = getShop();
  console.log("Shop Item Grid error: " + error);
  console.log(shop.shopItems);
  return (
    <div className="bg-gray-100 p-6 grid flex-1 grid-cols-4 grid-rows-4 gap-4">
      {isSuccess && shop.shopItems.map((item) => <ShopItem item={item} />)}
    </div>
  );
});

function ShopItemGridTest({
  name,
  minPrice,
}: {
  name: string;
  minPrice: number;
}) {
  const newItem: ShopItemModel = {
    id: 12345,
    name: name,
    minPrice: minPrice,
    maxPrice: null,
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
  };

  return (
    <div className="bg-gray-100 p-6 grid flex-1 grid-cols-4 grid-rows-4 gap-4">
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
      <ShopItem item={newItem} />
    </div>
  );
}

function ShopItem({ item }: { item: ShopItemModel }) {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/shop/${id}`);
  };

  return (
    <div>
      {/* <div className="bg-blue-500 aspect-video" /> */}
      <img
        className="aspect-video object-cover cursor-pointer"
        src={item.imageUrl}
        alt={item.imageAlt}
        onClick={() => handleClick(item.id)}
      />
      <div className="bg-white p-6 gap-2 flex-col flex">
        <h5
          className="text-black cursor-pointer"
          onClick={() => handleClick(item.id)}
        >
          {item.name}
        </h5>

        <p className="text-blue-500">$ {item.minPrice}</p>
      </div>
    </div>
  );
}

interface ShopItemModel {
  id: number;
  name: string;
  minPrice: number;
  // TODO are the '?' correct? I didn't change the '| null' from before - thought I'd check.
  maxPrice?: number | null;
  imageUrl: string;
  imageAlt?: string;
}

export default Page;
