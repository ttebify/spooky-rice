import React from "react";
import type { ButtonProps } from "../../types";
import cls from "classnames";
import { RiLoaderLine } from "react-icons/ri";

export default function Button({
  className,
  label,
  children,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cls(
        "rounded-full px-4 py-1.5 ring-1 bg-[#F2F4F8] dark:bg-[#13B5EC] ring-black shadow-md text-sm text-black",
        "disabled:cursor-not-allowed disabled:opacity-40 text-center hover:shadow focus:shadow",
        "focus-within:shadow shadow-[#A5B0C3] dark:shadow-none disabled:shadow-none",
        className
      )}
      {...props}
      title={label}
    >
      {children}
      {loading && (
        <RiLoaderLine className="animate-spin inline-block h-5 w-5 ml-1" />
      )}
    </button>
  );
}
