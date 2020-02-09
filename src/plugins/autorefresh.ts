import $ from "jquery";
import { disconnectPrompt } from "../util/selectors";

let interval;

export default function autoRefresh(active?: boolean) {
  clearInterval(interval);
  // Every 5 seconds, check to see if we are disconnected
  if (active) {
    console.log("Enabling Auto Refresh... ");
    interval = setInterval(() => {
      const $disconnectPrompt = $(disconnectPrompt);
      if ($disconnectPrompt.length > 0) {
        window.location.reload();
      }
    }, 5000);
  } else {
    console.log("Disabling Auto Refresh...");
  }
}

import storage from "../util/storage";
import { MessageAction } from "../util/message";
import { Toggle } from "../util/types";

export async function init() {
  const isAutoRefreshEnabled =
    (await storage.get<Toggle>(MessageAction.AutoRefresh, Toggle.On)) === Toggle.On;
  autoRefresh(isAutoRefreshEnabled);
}
