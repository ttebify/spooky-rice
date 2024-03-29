import React from "react";
import clx from "classnames";
import { alertVariants } from "./";

export interface AlertProps extends React.ComponentPropsWithRef<"div"> {
  title: string;
  type?: typeof alertVariants[keyof typeof alertVariants];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = "info", title, children, onClick, ...props }, ref) => {
    const info = type === "info",
      success = type === "success",
      error = type === "error",
      warn = type === "warning";

    return (
      <div
        className={clx(
          "fixed right-1/2 md:right-4 translate-x-1/2 md:translate-x-0 transition-all duration-300 flex items-center",
          "max-w-xs md:max-w-sm mb-4 font-sans px-2 shadow-md rounded-md w-full border-l-8 bg-[#f2f4f8]",
          "border dark:bg-[#1e1d2d]",
          {
            "text-teal-500 border-teal-500": info,
            "text-red-500 border-red-500": error,
            "text-green-500 border-green-500": success,
            "text-yellow-500 border-yellow-500": warn,
          }
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        <div className="w-auto items-center py-2">
          <div className="text-sm font-medium">{title}</div>
          <p className="leading-tight text-xs font-light">{children}</p>
        </div>
      </div>
    );
  }
);

export default Alert;
