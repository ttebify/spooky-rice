import { RouteComponentProps } from "@reach/router";
import React from "react";
import Helmet from "react-helmet";

const Bridge = (_props: RouteComponentProps) => {
  return (
    <main className="min-h-screen w-full flex flex-col py-10 items-center space-y-2 p-5
    bg-[url('../images/mint-page-bg.png')] bg-no-repeat bg-contain bg-center">
      <Helmet>
        <title>Bridge AVAX, BSC, FTM and more - (coming soon)</title>
      </Helmet>
      <h1>Bridge AVAX, BSC, FTM and more (coming soon)</h1>
    </main>
  );
};

export default Bridge;
