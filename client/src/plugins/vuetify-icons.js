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
  mdiExitToApp,
  mdiAlertCircle,
  mdiAlert,
  mdiTranslate
} from "@mdi/js";
const icons = {
  iconfont: "mdiSvg",
  values: {
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
    exit: mdiExitToApp,
    error: mdiAlertCircle,
    warning: mdiAlert
  }
};

export default icons;
