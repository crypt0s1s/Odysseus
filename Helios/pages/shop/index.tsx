import { NextPageWithLayout } from "../_app";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SearchPanel from "./SearchPanel";
import { StoreContext, getShop } from "@/api";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

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
  console.log(error);
  return (
    <div className="bg-gray-100 p-6 grid flex-1 grid-cols-4 grid-rows-4 gap-4">
      {isSuccess && shop.shopItems.map((item) => <ShopItem item={item} />)}
    </div>
  );
});

function ShopItem({ item }: { item: ShopItemModel }) {
  return (
    <div>
      <div className="bg-blue-500 aspect-video" />
      <div className="bg-white p-6 gap-2 flex-col flex">
        <h5 className="text-black">{item.name}</h5>

        <p className="text-blue-500">$ {item.minPrice}</p>
      </div>
    </div>
  );
}

interface ShopItemModel {
  name: string;
  minPrice: number;
  maxPrice: number | null;
  imageUrl: string;
}

export default Page;
