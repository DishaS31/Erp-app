// Theme change function
export const setTheme = (theme) => {
  if (theme === "default") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }

  localStorage.setItem("theme", theme);
};

// App load par saved theme apply
export const loadTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "default";

  if (savedTheme === "default") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
};


export const setFontFamily = (font) => {
  document.documentElement.style.setProperty(
    "--app-font",
    font
  );
  localStorage.setItem("font", font);
};

export const loadFontFamily = () => {
  const savedFont = localStorage.getItem("font");
  if (savedFont) {
    document.documentElement.style.setProperty(
      "--app-font",
      savedFont
    );
  }
};
