import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Helmet } from "react-helmet";
import Button from "../components/Buttons";
import Link from "../components/Link";

const NotFoundPage = (_props: RouteComponentProps) => {
  return (
    <main className="min-h-screen w-full flex flex-col py-10 items-center space-y-2 p-5 text-center">
      <Helmet>
        <title>Not found</title>
      </Helmet>
      <h1>Page not found</h1>
      <p>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
      </p>
      <Link to="/" className="">
        <Button>Go home</Button>
      </Link>
    </main>
  );
};

export default NotFoundPage;
