import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3x1">Welocme</h1>
      <Link href="/properties">Show Properties</Link>
    </div>
  );
};

export default HomePage;
