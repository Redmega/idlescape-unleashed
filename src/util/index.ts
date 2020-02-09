import $ from "jquery";
import { levels, Skill, Status, MiscSkill } from "./selectors";
import { ms } from "./time";

export const watchLevel = (skill: Skill, goal: number, callback: () => void) => {
  const level = Number($(levels[skill]).text());
  if (level >= goal) {
    callback();
  }
};

export const getCurrentStatus = (): Skill => {
  const status = $(".status-action").text();

  const actions = Object.keys(Status);
  for (const action of actions) {
    if (new RegExp(action, "ig").test(status)) {
      return Status[action];
    }
  }
  return MiscSkill.Idling;
};

export const dismissNotification = () => {
  if ($(".MuiDialog-root").length) {
    $(".MuiDialog-root .close-dialog-button").trigger("click");
  }
};

export const waitForElement = async (
  selector: string,
  interval: number = 250
): Promise<JQuery<HTMLElement>> => {
  let el = $(selector);
  if (el.length === 0) {
    await ms(interval);
    el = await waitForElement(selector);
  }
  return el;
};
