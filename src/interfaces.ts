interface ILogEntry {
  uuid: string;
  timestamp: string;
}

interface IEntry {
  uuid: string;
  timestamp: string;
}

export interface IActivityLogEntry extends ILogEntry {
  message: string;
}

export interface IGeolocationEntry extends ILogEntry {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface IKeyLogEntry extends ILogEntry {
  url: string;
  buffer: string;
}

export interface INavigationLogEntry extends ILogEntry {
  url: string;
}

export interface IScreenshotLogEntry extends ILogEntry {
  imageData: string;
  url: string;
}

// export interface IInputsData extends ILogEntry {
//     url: string;
// }

export interface IRequestData extends ILogEntry {
  request: chrome.webRequest.WebRequestBodyDetails;
}

export interface IClipboardData extends ILogEntry {
  text: string;
  url: string;
}

export interface INoteEntry extends ILogEntry {
  text: string;
}

export interface IPBOD extends IEntry {
  name: string;
  image?: string;
  richText?: string;
}

export interface ISettingsGoals {
  goalOrQuote: string;
  authorName: string;
  useRandomQuote: boolean;
}

export interface ISettingsBackground {
  id: string;
  url: string;
  height?: number;
  width?: number;
  description?: string;
  tags?: string[];
  useDefault: boolean;
}

export interface ITodo extends IEntry {
  text: string;
  completed: boolean;
  updatedAt: string;
}
