import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  var item: ShopItemModel = { name: "Lego", minPrice: 10.99, imageURL: "" };
  return (
    <main className="bg-white p-8">
      <h1>Hello World</h1>
      <div className="bg-red-500 h-8 w-8"></div>

      <div className="bg-gray-200 p-6 grid grid-cols-4 grid-rows-4 gap-4">
        {Array.from(Array(11).keys()).map(() => {
          return <ShopItem item={item} />;
        })}
      </div>
    </main>
  );
};

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
  maxPrice?: number;
  imageURL: string;
}

export default Page;
