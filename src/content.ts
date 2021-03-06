import { MessageAction, IMessage } from "./util/message";

// Plugins
import init from "./init";
import autoRefresh from "./plugins/autorefresh";
init();

chrome.runtime.onMessage.addListener(async (message: IMessage, sender, sendResponse) => {
  switch (message.action) {
    case MessageAction.AutoRefresh:
      autoRefresh(message.active);
      break;
    default:
      console.warn("Unhandled message", JSON.stringify(message));
      break;
  }
});
