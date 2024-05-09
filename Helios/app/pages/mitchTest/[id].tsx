// pages/page/[id].tsx

import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Welcome! You made it to page: {id}!</h1>
    </div>
  );
};

export default Page;
