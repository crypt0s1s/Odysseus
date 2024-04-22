import { NextPageWithLayout } from "../_app";
import FilterSidebar from "./FilterSidebar";
import NavBar from "./NavBar";
import SearchPanel from "./SearchPanel";
import { StoreContext, getShop } from "@/api";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import React from "react";
import { useRouter } from "next/router";
import { ShopItem } from "@/api/store/shop/models";
import { ShopItemDetails } from "@/api/store/shop/models/shopItemDetailsModel";

const Page: NextPageWithLayout = () => {
  const { isSuccess } = getShop();
  return (
    <main className="bg-white">
      <div className="flex flex-col">
        <NavBar />
        <div className="flex flex-row">
          {/* TODO fix on smaller screens SideBar shrinks and is not longer the correct width */}
          <FilterSidebar />{" "}
          <div className="flex flex-col w-screen">
            <SearchPanel />
            <ShopItemGrid />
          </div>
        </div>
      </div>
    </main>
  );
};

const ShopItemGrid = observer(() => {
  const { shop } = useContext(StoreContext);
  const { isPending, isSuccess, error } = getShop();
  return (
    <div className="bg-gray-100 p-6 grid flex-1 grid-cols-4 grid-rows-4 gap-4">
      {isSuccess && shop.shopItems.map((item) => <ShopGridItem item={item} />)}
    </div>
  );
});

function ShopItemGridTest() {
  const newItem: ShopItem = {
    id: "12345",
    name: "A Fine Bev",
    minPrice: 125.0,
    imageUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
    imageAlt: "",
  };

  return (
    <div className="bg-gray-100 p-6 grid flex-1 grid-cols-4 grid-rows-4 gap-4">
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
      <ShopGridItem item={newItem} />
    </div>
  );
}

function ShopGridItem({ item }: { item: ShopItem }) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/shop/${id}`);
  };

  return (
    <div>
      <img
        className="aspect-video object-contain cursor-pointer bg-white p-3"
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

export default Page;
