import $ from "jquery";
import { Skill, levels, CombatSkill } from "./util/selectors";
import { MessageAction, IMessage } from "./util/message";

// Plugins
import init from "./init";
import autoProgress from "./plugins/autoprogress";
import autoRefresh from "./plugins/autorefresh";
init();

chrome.runtime.onMessage.addListener(async (message: IMessage, sender, sendResponse) => {
  switch (message.action) {
    case MessageAction.AutoProgress:
      if (!message.skill) {
        alert("Invalid Skill Selected");
        return;
      }
      await autoProgress(message.skill);
      break;
    case MessageAction.AutoRefresh:
      autoRefresh(message.active);
      break;
    default:
      console.warn("Unhandled message", JSON.stringify(message));
      break;
  }
});
