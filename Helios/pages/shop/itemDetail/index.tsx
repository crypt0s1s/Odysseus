import { NextPageWithLayout } from "@/pages/_app";

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex flex-row">
      <ItemPicture />
      <InfoColumn />
    </div>
  );
};

function InfoColumn() {
  return (
    <div className="flex flex-col p-8 pl-28">
      <h1>Asgard Sofa</h1>
      <p className="text-2xl">$2500</p>
      <div className="w-[550px]">
        <p className="">
          Setting the bar as one of the loudest speakers in its class, the
          Kilburn is a compact, stout-hearted hero with a well-balanced audio
          which boasts a clear midrange and extended highs for a sound.
        </p>
      </div>
    </div>
  );
}

function ItemPicture() {
  return <div className="w-[550px] h-[550px]  bg-cyan-500 p-8"></div>;
}

export default Page;
