const useDarkMode = (vuetify, callback = dark => { console.info(`Native dark mode: ${dark}`); }) => {
  const listener = e => {
    vuetify.theme.dark = e.matches;
  };
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", listener);
  vuetify.theme.dark = mediaQuery.matches;
  callback(mediaQuery.matches);
  return {
    destroy: function () {
      mediaQuery.removeEventListener("change", listener);
    }
  };
}

export { useDarkMode };
