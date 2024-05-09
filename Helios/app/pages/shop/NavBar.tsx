import { ReactNode } from "react";

const NavBar = () => {
  return (
    <div
      className="flex items-center top-0 left-0 h-[48px] w-screen
       bg-white outline-4 text-black"
    >
      <h5 className="p-2 px-4">
        <b>Odysseus</b>
      </h5>
    </div>
  );
};

export default NavBar;
