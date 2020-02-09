import { IMessage, MessageAction } from "./util/message";
import { Skill, ProgressSkill } from "./util/selectors";
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

  /**
   * Auto Progress
   * Automatically starts performing the highest zone possible, and watches for the next zone to become available.
   */
  await addMenuOption({
    parentId: "idlescape",
    id: MessageAction.AutoProgress,
    title: "Auto Progress",
  });
  for (const skillName of Object.keys(ProgressSkill)) {
    await addMenuOption({
      id: `${MessageAction.AutoProgress}:${ProgressSkill[skillName]}`,
      title: skillName,
      parentId: MessageAction.AutoProgress,
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === MessageAction.TestCombatLevel) {
    chrome.tabs.sendMessage(tab.id, {
      action: MessageAction.TestCombatLevel,
    } as IMessage);
  }

  if (info.parentMenuItemId === MessageAction.AutoProgress) {
    const skill = (info.menuItemId as string).replace(
      `${MessageAction.AutoProgress}:`,
      ""
    ) as Skill;
    chrome.tabs.sendMessage(tab.id, {
      action: MessageAction.AutoProgress,
      skill,
    } as IMessage);
  }

  if (info.menuItemId === MessageAction.AutoRefresh) {
    storage.set(MessageAction.AutoRefresh, info.checked ? Toggle.On : Toggle.Off);
    chrome.tabs.sendMessage(tab.id, {
      active: info.checked,
      action: MessageAction.AutoRefresh,
    } as IMessage);
  }
});
