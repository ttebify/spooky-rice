import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
} from "body-scroll-lock";
import { FaTimes } from "react-icons/fa";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import SiteLogo from "../SiteLogo";
import { navigationItems } from "../../globals";
import cls from "classnames";
import Link from "../Link";
import DarkmodeSwitch from "../Tools/DarkmodeSwitch";
import Section from "./Section";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const mobileNavELement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileNavELement.current) return;
    if (open) {
      disableBodyScroll(mobileNavELement.current);
    } else {
      enableBodyScroll(mobileNavELement.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <Section
      containerClass="shadow bg-[#f2f4f8] dark:bg-[#1e1d2d]"
      className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between !py-5 !max-w-screen-xl"
    >
      <div className="flex flex-row items-center justify-between shrink-0 space-x-3">
        <SiteLogo text="Spooky Rice" />
        <div className="space-x-3">
          <DarkmodeSwitch />
          <button
            title="Menu"
            onClick={openMenu}
            arial-label="Menu"
            className="lg:hidden cursor-pointer ring ring-gray-300 rounded-full p-2 hover:ring-0"
          >
            <RiBarChartHorizontalLine className="h-6 w-6" />
          </button>
        </div>
      </div>
      <nav
        ref={mobileNavELement}
        className={cls(
          "fixed lg:relative w-full h-full inset-0 lg:!bg-transparent transition-all duration-200",
          "overflow-hidden capitalize z-50 lg:z-auto flex flex-col flex-wrap",
          "items-center border-x-8 border-[#575757] lg:border-none",
          "bg-[#f2f4f8] dark:bg-[#1e1d2d]",
          { flex: open, "hidden lg:flex lg:justify-between": !open }
        )}
      >
        <button
          onClick={closeMenu}
          title="close"
          className="block ml-auto m-8 lg:hidden cursor-pointer rounded-full p-2"
        >
          <FaTimes className="h-7 w-7" />
        </button>
        <ul className="flex flex-col lg:flex-row lg:justify-end lg:w-full lg:items-center">
          {navigationItems.map((nav) => (
            <li key={nav.id}>
              <Link
                to={nav.href}
                className="block text-left p-1 mb-8 lg:mb-0 hover:underline text-2xl
                  lg:text-lg font-semibold lg:ml-3"
                onClick={closeMenu}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
