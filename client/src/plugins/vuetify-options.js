import icons from "./vuetify-icons";
import { i18n } from "@/i18n";

const vuetifyOptions = {
  lang: {
    current: i18n.locale,
    defaulLocale: i18n.availableLocales[0],
    t: (key, ...params) => i18n.t(key, params)
  },
  icons,
  theme: {
    options: {
      customProperties: true
    },
    dark: false,
    themes: {
      light: {
        // primary: '#328288',
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        primary: "#fff",
        accent: "#009688",
        secondary: "#424242",
        info: "#2196F3",
        warning: "#ffc107",
        error: "#b71c1c",
        success: "#4caf50"
      }
    }
  }
};

export { i18n, vuetifyOptions };
