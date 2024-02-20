import Image from "next/image";
import { StoreContext, Profile } from "../../api";
import React, { useContext } from "react";
import sunIcon from "../../helen/icons/sun.svg";
import cartIcon from "../../helen/icons/cart.svg";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:overflow-hidden">
      <div className="flex flex-row w-full bg-red-400 justify-between gap-4 p-10">
        <Logo />
        <NavBar />
      </div>

      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}

const CartIcon = observer(() => {
  const { catalogue } = useContext(StoreContext);
  return (
    <div className="relative">
      <Image
        priority
        width={30}
        height={30}
        src={cartIcon}
        alt="Shopping Cart"
      />
      {catalogue.cart.size > 0 && (
        <div className="absolute -top-2 -right-2 select-none aspect-square h-6 w-6 rounded-md bg-sky-400 items-center">
          <p className="align-center justify-center text-center">
            {catalogue.cart.size}
          </p>
        </div>
      )}
    </div>
  );
});

const NavBar = observer(() => {
  const { profile } = useContext(StoreContext);
  const router = useRouter();

  return (
    <div className="flex flex-row w-full bg-red-400 justify-end gap-4 items-center">
      {profile.profile && (
        <div>
          <h5>Good evening {profile.profile.displayName}</h5>
        </div>
      )}
      <CartIcon />
      {profile.profile ? (
        <HeliosButton
          text="Profile"
          onClick={() => {
            console.log("profile in clicked");
          }}
        />
      ) : (
        <HeliosButton
          text="Sign in"
          onClick={() => {
            router.push("login");
          }}
        />
      )}
    </div>
  );
});

const Logo = () => {
  return (
    <div>
      <Image priority width={50} height={50} src={sunIcon} alt="Helios icon" />
    </div>
  );
};

const SignedOutNavbar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row w-full bg-red-400 justify-end gap-4 items-center">
      <HeliosButton
        text="Sign in"
        onClick={() => {
          router.push("login");
        }}
      />
      <HeliosButton
        text="Cart"
        onClick={() => {
          console.log("cart clicked");
        }}
      />
    </div>
  );
};

const SignedInNavBar = ({ profile }: { profile: Profile }) => {
  return (
    <div className="flex flex-row w-full bg-red-400 justify-end gap-4 items-center">
      <div>
        <h5>Good evening {profile.displayName}</h5>
      </div>
      <button onClick={() => console.log("icon clicked")}>
        <Image
          priority
          width={30}
          height={30}
          src={cartIcon}
          alt="Shopping Cart"
        />
      </button>
      <HeliosButton
        text="Profile"
        onClick={() => {
          console.log("profile in clicked");
        }}
      />
      <HeliosButton
        text="Cart"
        onClick={() => {
          console.log("cart clicked");
        }}
      />
    </div>
  );
};

const HeliosButton = ({ text, onClick }: HeliosButtonProps) => {
  return (
    <button
      className="flex rounded-lg bg-sky-400 p-3 w-20 justify-center"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

interface HeliosButtonProps {
  text: string;
  onClick: () => void;
  // TODO: child props? Forget how this works lol
}
