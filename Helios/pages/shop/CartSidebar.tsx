import { StoreContext } from "@/api";
import {
  ShopItem,
  ShoppingCart,
  ShoppingCartModel,
} from "@/api/store/shop/models";
import {
  CartItemQuantity,
  CartItemQuantityModel,
} from "@/api/store/shop/models/cartItemQuantityModel";
import { ShopItemDetails } from "@/api/store/shop/models/shopItemDetailsModel";
import { types } from "mobx-state-tree";
import router from "next/router";
import { ReactNode, useContext } from "react";

interface CartSidebarProps {
  setIsCartOpen: (isOpen: boolean) => void;
}

// Cart sidebar should float on top of other screen elements.
const CartSidebar: React.FC<CartSidebarProps> = ({ setIsCartOpen }) => {
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const { shop } = useContext(StoreContext);

  const shopItemTest: ShopItemDetails = {
    id: "12345",
    name: "Orange Juice",
    minPrice: 3.01,
    imageUrl:
      "https://cdn0.woolworths.media/content/wowproductimages/large/315649.jpg",
    imageAlt: "",
    description: "Orange time.",
  };

  const shopItemTest2: ShopItemDetails = {
    id: "54321",
    name: "Drink Bottle",
    minPrice: 15.99,
    imageUrl:
      "https://www.wiltshire.com.au/cdn/shop/products/48183WILTSHIRESSBOTTLETEAL900MLOP1web.jpg?v=1644203524",
    imageAlt: "",
    description: "Drink time.",
  };

  const cartTest = ShoppingCartModel.create();

  cartTest.addCartItem(shopItemTest, 3);
  cartTest.addCartItem(shopItemTest2, 150);

  function HeadingSection() {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-semibold ">Shopping Cart</h3>

          <button onClick={handleCloseCart}>
            <span className="text-2xl px-4" aria-hidden="true">
              &times;
            </span>{" "}
            {/* Unicode character for "x" symbol */}
          </button>
        </div>
        <hr className="border-slate-200 w-10/12" />
      </div>
    );
  }

  return (
    <div className="absolute z-10 top-0 right-0 flex flex-col w-[450px] h-screen py-4 bg-white border-l-2 shadow-xll">
      <div className="pl-5">
        <HeadingSection />
        <ItemSection cart={shop.shoppingCart} />
      </div>
      <div className="flex-grow"></div>
      <div>
        <div className="py-1 pl-5">
          <TotalSection cart={shop.shoppingCart} />
        </div>
        <BottomButtonsSection />
      </div>
    </div>
  );
};

function ItemSection({ cart }: { cart: ShoppingCart }) {
  return (
    <div className="flex flex-col py-4 gap-4">
      {cart.cartItemList.map((item) => (
        <ItemSectionComponent cartItem={item} />
      ))}

      {/* <ItemSectionComponent cartItem={shop.shoppingCart.cartItemList[0]} /> */}
    </div>
  );
}

function ItemSectionComponent({ cartItem }: { cartItem: CartItemQuantity }) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <img
        className="object-cover aspect-square w-32 p-8 border border-slate-200 rounded-2xl"
        src={cartItem.item.imageUrl}
      ></img>
      <div className="flex flex-col items">
        <span className="text-lg">{cartItem.item.name}</span>
        <div className="flex flex-row gap-3">
          <span>{cartItem.quantity}</span>
          <span>x</span>
          <span className="text-amber-500">$ {cartItem.item.minPrice}</span>
        </div>
      </div>
    </div>
  );
}

function TotalSection({ cart }: { cart: ShoppingCart }) {
  const totalPrice = cart.calculateTotalCost().toFixed(2);

  return (
    <div className="flex flex-row items-center py-4">
      <span className="text-lg">Subtotal</span>
      <div className="w-20"></div>
      <span className="text-lg text-amber-500">$ {totalPrice}</span>
    </div>
  );
}

function BottomButtonsSection() {
  return (
    <div>
      <hr className="border-slate-200" />
      <div className="flex flex-row items-center p-5 gap-x-5 justify-evenly">
        <ButtonCart />
        <ButtonCheckout />
      </div>
    </div>
  );
}

const buttonStyle =
  "bg-white hover:bg-amber-100 border border-black text-black w-2/5 pt-[4px] pb-[6px] rounded-full";

function ButtonCheckout() {
  const handleClick = () => {
    router.push(`/shop/orders`);
  };

  return (
    <button className={buttonStyle} onClick={handleClick}>
      <text className="text-sm">Checkout</text>
    </button>
  );
}

function ButtonCart() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <button className={buttonStyle} onClick={handleClick}>
      <text className="text-sm">Cart</text>
    </button>
  );
}

export default CartSidebar;
