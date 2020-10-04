const useDarkMode = vuetify => {
  const listener = e => {
    vuetify.theme.dark = e.matches;
  };
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", listener);
  return {
    destroy: function () {
      mediaQuery.removeEventListener("change", listener);
    }
  };
}

export { useDarkMode };
