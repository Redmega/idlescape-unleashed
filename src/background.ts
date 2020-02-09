import { IMessage, MessageAction } from "./util/message";
import storage from "./util/storage";
import { Toggle } from "./util/types";

const addMenuOption = async (props: chrome.contextMenus.CreateProperties) =>
  new Promise((resolve, reject) =>
    chrome.contextMenus.create(
      {
        contexts: ["all"],
        documentUrlPatterns: ["https://idlescape.com/*"],
        ...props,
      },
      resolve
    )
  );

chrome.runtime.onInstalled.addListener(async function(details) {
  /**
   * Main Entrypoint
   */
  await addMenuOption({
    id: "idlescape",
    title: "Idlescape++",
  });

  /**
   * Auto Refresh
   * Automatically refreshes the page if a disconnect message is found
   */
  const isAutoRefreshEnabled =
    (await storage.get<Toggle>(MessageAction.AutoRefresh, Toggle.On)) === Toggle.On;

  await addMenuOption({
    parentId: "idlescape",
    id: MessageAction.AutoRefresh,
    checked: isAutoRefreshEnabled,
    type: "checkbox",
    title: "Refresh when Disconnected?",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MessageAction.AutoRefresh) {
    storage.set(MessageAction.AutoRefresh, info.checked ? Toggle.On : Toggle.Off);
    chrome.tabs.sendMessage(tab.id, {
      active: info.checked,
      action: MessageAction.AutoRefresh,
    } as IMessage);
  }
});
