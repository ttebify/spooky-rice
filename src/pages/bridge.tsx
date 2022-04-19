import { RouteComponentProps } from "@reach/router";
import React from "react";
import Helmet from "react-helmet";
import Button from "../components/Buttons";

const Bridge = (_props: RouteComponentProps) => {
  return (
    <main className="min-h-screen w-full flex flex-col py-10 items-center space-y-2">
      <Helmet>
        <title>Bridge AVAX, BSC, FTM and more</title>
      </Helmet>
      <h1>Bridge AVAX, BSC, FTM and more</h1>
      <Button>(coming soon)</Button>
    </main>
  );
};

export default Bridge;
