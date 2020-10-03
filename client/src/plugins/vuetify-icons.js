import {
  mdiHelpCircleOutline,
  mdiClose,
  mdiMagnify,
  mdiRefresh,
  mdiPlus,
  mdiDelete,
  mdiChevronLeft,
  mdiPageFirst,
  mdiChevronRight,
  mdiPageLast,
  mdiExitToApp,
  mdiAlertCircle,
  mdiAlert
} from "@mdi/js";
const icons = {
  iconfont: "mdiSvg",
  values: {
    help: mdiHelpCircleOutline,
    close: mdiClose,
    search: mdiMagnify,
    refresh: mdiRefresh,
    add: mdiPlus,
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
