import React from "react";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { useAppContext } from "../../hooks/useAppContext";

export default function DarkmodeSwitch() {
  const { darkMode, toggleDarkmode } = useAppContext();

  return (
    <button
      onClick={toggleDarkmode}
      title="Toggle darkmode"
      className="inline-block cursor-pointer rounded-full p-2 text-gray-600  dark:text-yellow-400"
    >
      {darkMode === true ? (
        <RiSunFill className="h-7 w-7" />
      ) : (
        <RiMoonFill className="h-7 w-7" />
      )}
    </button>
  );
}
