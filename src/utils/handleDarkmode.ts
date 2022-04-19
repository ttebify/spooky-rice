export default function handleDarkMode(option?: boolean): boolean {
  if (typeof window === "undefined") return false;
  // If options is defined, set the darkmode
  if (option !== undefined) {
    if (option === true) {
      localStorage.setItem("mode", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("mode", "light");
      document.documentElement.classList.remove("dark");
    }
    return option;
  } else {
    // Check the local storage
    if (
      localStorage.getItem("mode") === "dark" ||
      (!("mode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return true;
    } else {
      return false;
    }
  }
};
