import { RouteComponentProps } from "@reach/router";
import React from "react";
import Button from "../components/Buttons";
import Link from "../components/Link";

const NotFoundPage = (_props: RouteComponentProps) => {
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center space-y-2">
      <title>Not found</title>
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
