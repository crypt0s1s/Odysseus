import { StoreContext, getShop, getShopDetails } from "@/api";
import { ShopItemDetails } from "@/api/store/shop/models/shopItemDetailsModel";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { useContext } from "react";
import React, { useState } from "react";
import ShoppingCartSidebar from "./CartSidebar";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { shop } = useContext(StoreContext);
  var idString: string = "";
  if (typeof id === "string") {
    idString = id;
  }
  const { isPending, isSuccess, error } = getShopDetails(idString);
  // console.log("Shop Item error: " + error);
  var detailedShopItem = shop.shopItemDetails;
  // State for isCartOpen
  const [isCartOpen, setIsCartOpen] = useState(false);

  function InfoColumn({ item }: { item: ShopItemDetails }) {
    var steps: string[] = [];

    return (
      <div className="flex flex-col pt-6">
        <h1>{item.name}</h1>
        <p className="text-2xl">$ {item.minPrice}</p>
        <p className=""> {item.description}</p>
        <div className="flex flex-row py-6 y gap-x-4 h-[98px]">
          <QuantitySelector />
          <ButtonAddToCart />
        </div>
      </div>
    );
  }

  function ButtonAddToCart() {
    const handleClick = () => {
      setIsCartOpen(false); // Update isCartOpen state
      console.log("Button clicked!" + isCartOpen);
    };

    return (
      <button
        className="bg-white hover:bg-amber-100 border border-black  text-black px-10 rounded-lg"
        onClick={handleClick}
      >
        Add To Cart
      </button>
    );
  }

  if (detailedShopItem == undefined || detailedShopItem == null) {
    return (
      <div className="bg-white w-screen h-screen">
        <h2>No shop item details found.</h2>
      </div>
    );
  } else {
    return (
      <div>
        <div className="absolute flex flex-row bg-white h-screen w-screen z-0">
          <img
            className="w-[550px] h-[550px] object-cover p-8"
            src={detailedShopItem.imageUrl}
          ></img>
          <InfoColumn item={detailedShopItem} />
        </div>
        {isCartOpen && <ShoppingCartSidebar />} {/* Conditionally render */}
      </div>
    );
  }
};

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    // onchange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      // onChange(quantity - 1);
    }
  };

  const handleQuantityChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value);

    //This check is better than checking typeof newQuantity === "number", as it takes into account empty input field.
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      // onChange(newQuantity);
    } else {
      // If input becomes empty, default back to 1
      setQuantity(1);
      // onChange(1);
    }
  };

  return (
    <div className="flex items-center border rounded-lg border-black w-28">
      <button
        className="bg-white text-black hover:bg-amber-100 h-full w-16 rounded-l-lg flex items-center justify-center focus:outline-none"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="numeric"
        className="flex w-full text-center appearance-none focus:outline-none border-none"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button
        className="bg-white text-black hover:bg-amber-100 h-full w-16 rounded-r-lg flex items-center justify-center focus:outline-none"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};
export default Page;
