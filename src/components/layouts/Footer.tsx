import React from "react";
import ttebLogo from "../../images/tteb-logo.png";
import Section from "./Section";

interface FooterProps extends React.ComponentProps<"footer"> {}

export default function Footer(_props: FooterProps) {
  return (
    <Section containerClass="bg-[#9aa0ab] dark:bg-[#556C8A] !text-[#f2f4f8]">
      <footer
        className="text-center px-4 py-8 flex flex-col space-y-2 sm:flex-row sm:space-y-0 justify-between
          items-center font-medium text-base"
      >
        <div className="inline-flex items-center">
          <span>Audited by</span>
          <a href="https://tteb.finance/" className="inline-block mx-2">
            <img
              src={ttebLogo}
              alt="TTEB Logo"
              width={70}
              height={40}
            />
          </a>
        </div>
        <div>
          &copy; Spooky Rice - {new Date().getFullYear()}
        </div>
      </footer>
    </Section>
  );
}
