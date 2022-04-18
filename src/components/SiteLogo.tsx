import React from "react";
import Link from "./Link";

export default function SiteLogo(props: { text: string }) {
  return (
    <div className="inline-flex items-center shrink-0 font-bold text-xl">
      <Link to="/">
        <span>{props.text}</span>
      </Link>
    </div>
  );
}
