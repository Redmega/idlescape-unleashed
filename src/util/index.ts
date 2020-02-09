import $ from "jquery";
import { levels, Skill, Status, MiscSkill } from "./selectors";

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
