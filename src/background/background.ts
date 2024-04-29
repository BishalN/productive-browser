import { StorageKey } from "../consts";
import { IPBOD, ISettingsGoals } from "../interfaces";
import { contextData, simplePrepend } from "../utils/shared-utils";

chrome.runtime.onInstalled.addListener(async function () {
  // add default values to storage

  await chrome.storage.local.set({
    [StorageKey.SETTINGS_GOALS_QUOTES]: {
      authorName: "Elon Musk",
      goalOrQuote:
        "I think it is possible for ordinary people to choose to be extraordinary.",
      useRandomQuote: false,
    },
  });

  await simplePrepend<IPBOD>(StorageKey.SETTINGS_PBODS, {
    name: "Elon Musk",
    image:
      "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
    richText:
      "I think it is possible for ordinary people to choose to be extraordinary.",
    ...contextData(),
  });

  chrome.runtime.openOptionsPage();
});

chrome.runtime.onStartup.addListener(function () {
  chrome.runtime.openOptionsPage();
});

// when the action is clicked, start oauth flow
chrome.action.onClicked.addListener(async function () {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (token) {
      chrome.identity.getProfileUserInfo(
        { accountStatus: chrome.identity.AccountStatus.ANY },
        (info) => {
          console.log(info);
          // may be add this info to local storage even though its not important since\
          // its cached already i.e idempotent
          if (info) {
            chrome.runtime.openOptionsPage();
          }
        }
      );
    }
  });
});
