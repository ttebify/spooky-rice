import React from "react";
import { Link as ReactRouterLink, LinkProps } from "@reach/router";
import cls from "classnames";

export default function Link({
  children,
  to,
  className,
  onClick,
}: LinkProps<undefined>) {
  const isInternal = /^\/(?!\/)/.test(to.toString());

  // Use React router Link for internal links, and <a> for others
  if (isInternal) {
    return (
      <ReactRouterLink
        to={to}
        className={cls(className)}
        onClick={onClick}
        getProps={({ isCurrent }) =>
          isCurrent && {
            style: { textDecoration: "underline", color: "#13B5EC" },
          }
        }
      >
        {children}
      </ReactRouterLink>
    );
  }
  return (
    <a
      href={to.toString()}
      rel={!isInternal ? "" : "nofollow noreferrer noopener"}
      target="_blank"
      className={cls(className)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
