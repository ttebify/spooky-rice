import { RouteComponentProps } from "@reach/router";
import React from "react";
import Helmet from "react-helmet";

const Mint = (_props: RouteComponentProps) => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center space-y-2 pt-10">
      <Helmet>
        <title>Spooky NFT - (comming soon)</title>
      </Helmet>
      <h1>10,000 Spooky NFT's coming soon.</h1>
      <p>
        <br />
        NFT's will be used for lottery and as special boosts on your rice yield
      </p>
    </main>
  );
};

export default Mint;
