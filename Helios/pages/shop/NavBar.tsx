import { useRouter } from "next/router";

interface NavBarProps {
  showBackButton: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showBackButton }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center top-0 left-0 h-[48px] w-screen bg-white outline-4 text-black border-b-2">
      <h5 className="p-2 px-4">
        <b>Odysseus</b>
        {showBackButton && (
          <button className="px-4 text-blue-500" onClick={goBack}>
            &lt; Back
          </button>
        )}
      </h5>
    </div>
  );
};

export default NavBar;
