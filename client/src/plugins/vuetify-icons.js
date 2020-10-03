import {
  mdiHelpCircleOutline,
  mdiClose,
  mdiMagnify,
  mdiRefresh,
  mdiPlus,
  mdiDelete,
  mdiChevronLeft,
  mdiChevronDown,
  mdiPageFirst,
  mdiChevronRight,
  mdiPageLast,
  mdiLogin,
  mdiExitToApp,
  mdiAlertCircle,
  mdiAlert,
  mdiTranslate,
  mdiEye,
  mdiEyeOff,
  mdiAccountCircleOutline
} from "@mdi/js";
const icons = {
  iconfont: "mdiSvg",
  values: {
    hidePassword: mdiEyeOff,
    showPassword: mdiEye,
    translate: mdiTranslate,
    help: mdiHelpCircleOutline,
    close: mdiClose,
    search: mdiMagnify,
    refresh: mdiRefresh,
    add: mdiPlus,
    down: mdiChevronDown,
    delete: mdiDelete,
    arrowLeft: mdiChevronLeft,
    arrowRight: mdiChevronRight,
    previousPage: mdiChevronLeft,
    nextPage: mdiChevronRight,
    firstPage: mdiPageFirst,
    lastPage: mdiPageLast,
    signin: mdiLogin,
    signup: mdiAccountCircleOutline,
    signout: mdiExitToApp,
    error: mdiAlertCircle,
    warning: mdiAlert
  }
};

export default icons;
