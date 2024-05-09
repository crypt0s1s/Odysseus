// pages/index.tsx

import { useRouter } from "next/router";
import Link from "next/link";

const HomePage = () => {
  const router = useRouter();

  const handleClick = (number: number) => {
    router.push(`/mitchTest/${number}`);
  };

  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <button onClick={() => handleClick(42)}>Go to Page 42</button>
    </div>
  );
};

export default HomePage;
