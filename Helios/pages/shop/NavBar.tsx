import { useRouter } from "next/router";

interface NavBarProps {
  showBackButton: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showBackButton }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goToOrders = () => {
    router.push(`/shop/orders`);
  };

  return (
    <div className="flex flex-row items-center border-b-2 bg-white top-0 left-0 h-[48px] w-screen  outline-4 justify-between">
      <div className="flex items-center  text-black ">
        <h5 className="p-2 px-4">
          <b>Odysseus</b>
          {showBackButton && (
            <button className="px-4 text-blue-500" onClick={goBack}>
              &lt; Back
            </button>
          )}
        </h5>
      </div>
      <button className="px-8 text-blue-500" onClick={goToOrders}>
        Orders
      </button>
    </div>
  );
};

export default NavBar;
