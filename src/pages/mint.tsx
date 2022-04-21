import { RouteComponentProps } from "@reach/router";
import React from "react";
import Helmet from "react-helmet";

const Mint = (_props: RouteComponentProps) => {
  return (
    <main className="min-h-screen w-full flex flex-col items-center space-y-4 pt-10 p-5">
      <Helmet>
        <title>Spooky NFT - (comming soon)</title>
      </Helmet>
      <h1>10,000 Spooky NFT's coming soon.</h1>
      <p>
        10,000 spooky rice paddies that can be purchased with $SOYA token on
        AVAX $BLUD token on FTM.
      </p>
      <p>
        NFT's will be used for lottery and as special boosts on your rice yield
      </p>
    </main>
  );
};

export default Mint;
