let remove: (() => void) | null = null;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themesMenu = document.getElementById("themes-menu");

export const getThemePreference = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("theme") ?? "system";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const updateIcon = (themePreference: string) => {
  document.querySelectorAll(".theme-toggle-icon").forEach((element) => {
    (element as HTMLElement).style.scale =
      element.id === themePreference ? "1" : "0";
  });
};

export const updateTheme = () => {
  if (remove != null) {
    remove();
  }
  mediaQuery.addEventListener("change", updateTheme);
  remove = () => {
    mediaQuery.removeEventListener("change", updateTheme);
  };

  const themePreference = getThemePreference();
  const isDark =
    themePreference === "dark" ||
    (themePreference === "system" && mediaQuery.matches);

  updateIcon(themePreference);
  document.documentElement.classList[isDark ? "add" : "remove"]("dark");
};

updateTheme();

document.addEventListener("click", () => themesMenu?.classList.remove("open"));

document.getElementById("theme-toggle-btn")!.addEventListener("click", (e) => {
  e.stopPropagation();
  const isClosed = !themesMenu?.classList.contains("open");
  themesMenu?.classList[isClosed ? "add" : "remove"]("open");
});

document.querySelectorAll(".themes-menu-option").forEach((element) => {
  element.addEventListener("click", (e) => {
    localStorage.setItem(
      "theme",
      (e.target as HTMLElement).innerText.toLowerCase().trim(),
    );
    updateTheme();
  });
});
