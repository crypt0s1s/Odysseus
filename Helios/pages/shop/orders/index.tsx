import { NextPageWithLayout } from "../../_app";
import FilterSidebar from "../FilterSidebar";
import NavBar from "../NavBar";
import SearchPanel from "../SearchPanel";
import { StoreContext, getShop } from "@/api";
import { Order, OrderModel, ShopItemModel } from "@/api/store/shop/models";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router";
import { ShopItem } from "@/api/store/shop/models";
import { CartItemQuantityModel } from "@/api/store/shop/models/cartItemQuantityModel";
import Image from "next/image";
import { ShopItemDetailsModel } from "@/api/store/shop/models/shopItemDetailsModel";

const Page: NextPageWithLayout = observer(() => {
  const { shop } = useContext(StoreContext);
  var timesVisited = shop.orderViewCount;
  // TODO: display different orders based on number of times page visited
  useEffect(() => {
    shop.incrementOrderViewCount();
  }, []);

  return (
    <main className="bg-white h-screen">
      <div className="flex flex-col bg-white pb-12">
        <NavBar />
        <div className="mx-12 gap-12 flex-col flex">
          {/* TODO: remove */}
          <h1>{timesVisited}</h1>
          {/* TODO: add mocks by no of times visited */}
          <OrderComponent order={sampleOrder} />
          {timesVisited == 3 && <OrderComponent order={sampleOrder} />}
          {/* <OrderComponent order={sampleOrder} />
          <OrderComponent order={sampleOrder2} /> */}
        </div>
      </div>
    </main>
  );
});

const shopItemModel = ShopItemDetailsModel.create({
  id: "1242424",
  name: "Panadol",
  //Change this to price?
  minPrice: 23.42,
  imageUrl:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
  imageAlt: "",
  description: "Test",
});

const cartItemQuantityModel = CartItemQuantityModel.create({
  item: shopItemModel,
  quantity: 3,
});

const shopItemModel2 = ShopItemDetailsModel.create({
  id: "12424244",
  name: "water",
  //Change this to price?
  minPrice: 23.42,
  imageUrl:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
  imageAlt: "",
  description: "Test",
});

const cartItemQuantityModel2 = CartItemQuantityModel.create({
  item: shopItemModel2,
  quantity: 1,
});

const sampleOrder = OrderModel.create({
  id: "12124e123123",
  dateTime: "15th June 12:42pm",
  totalPrice: 4242.12,
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png",
  items: [cartItemQuantityModel, cartItemQuantityModel2],
});

const shopItemModel3 = ShopItemDetailsModel.create({
  id: "12424244",
  name: "Choc",
  //Change this to price?
  minPrice: 99.99,
  imageUrl:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
  imageAlt: "",
  description: "Test",
});

const shopItemModel4 = ShopItemDetailsModel.create({
  id: "12424244",
  name: "Miiilk",
  //Change this to price?
  minPrice: 23.42,
  imageUrl:
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.cmsmax.com%2Feq4rxnkvcouvc1anfqqhe%2Fcutwater-4pk-white-russian.png&f=1&nofb=1&ipt=9e35ceed93b7e6bc899e4cb6f2adcf95cb18164bb08df3f37f55159d3082e10f&ipo=images",
  imageAlt: "",
  description: "Test",
});

const cartItemQuantityModel3 = CartItemQuantityModel.create({
  item: shopItemModel3,
  quantity: 4,
});

const cartItemQuantityModel4 = CartItemQuantityModel.create({
  item: shopItemModel4,
  quantity: 5,
});

const sampleOrder2 = OrderModel.create({
  id: "12124e123124",
  dateTime: "15th June 12:42pm",
  totalPrice: 9999.99,
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png",
  items: [cartItemQuantityModel3, cartItemQuantityModel4],
});

const OrderComponent = ({ order }: { order: Order }) => {
  //<h5 className="flex">{order.items.reduce((v, c) => v + c.quantity, 0)} items</h5>

  return (
    <div className="flex bg-orange-200 flex-col rounded-xl p-3">
      <div className="flex flex-row items-center gap-3 justify-between">
        <div className="flex flex-row opacity-70 gap-6">
          <div className="flex flex-col">
            <h5 className="flex">ORDER PLACED</h5>
            <h5 className="flex">{order.dateTime}</h5>
          </div>
          <div className="flex flex-col">
            <h5 className="flex">TOTAL</h5>
            <h5 className="flex">${order.totalPrice}</h5>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="flex">ORDER #</h4>
          <h4 className="flex">{order.id}</h4>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-6 w-full">
          {order.items.map((item, i) => (
            <ItemDisplay item={item.item} amount={item.quantity} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ItemDisplay = ({ item, amount }: { item: ShopItem; amount: number }) => {
  return (
    <div className="flex-row flex grow w-full items-start align-top bg-white p-4 rounded-lg gap-2 justify-between">
      <img
        className="aspect-video object-contain w-48"
        src={item.imageUrl}
        alt={item.imageAlt ?? ""}
      />
      <div className="gap-2 flex-col flex align-top items-end grow">
        <h5 className="text-black cursor-pointer">{item.name}</h5>
        {amount == 1 && <p className="text-black">${item.minPrice}</p>}
        {amount > 1 && (
          <p className="flex text-black">
            {amount} x ${item.minPrice}
          </p>
        )}
        {amount > 1 && (
          <p className="text-black">TOTAL: ${item.minPrice * amount}</p>
        )}
      </div>
    </div>
  );
};

const ShopItemGrid = observer(() => {
  const { shop } = useContext(StoreContext);
  const { isPending, isSuccess, error } = getShop();
  return <div />;
  // return (
  //   <div className="bg-gray-100 p-6 grid flex-1 grid-cols-4 grid-rows-4 gap-4">
  //     {isSuccess && shop.shopItems.map((item) => <ShopGridItem item={item} />)}
  //   </div>
  // );
});

export default Page;
