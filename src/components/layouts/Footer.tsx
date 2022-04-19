import React from "react";
import ttebLogo from "../../images/tteb-logo.jpg";
import Section from "./Section";

interface FooterProps extends React.ComponentProps<"footer"> {}

export default function Footer(_props: FooterProps) {
  return (
    <Section containerClass="bg-[#F2F4F8] dark:bg-[#556C8A]">
      <footer
        className="text-center p-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 justify-between
          items-center font-medium text-base"
      >
        <div className="inline-flex items-center">
          <span>Audited by</span>
          <a href="https://tteb.finance/" className="inline-block mx-2">
            <img
              src={ttebLogo}
              alt="TTEB Logo"
              placeholder="blurred"
              width={70}
              height={40}
              className="filter bg-blend-multiply bg-[#F2F4F8]"
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
