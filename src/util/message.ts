import { Skill } from "./selectors";

export enum MessageAction {
  TestCombatLevel = "test",
  AutoProgress = "auto",
  AutoRefresh = "refresh",
}

export interface IMessage {
  action: MessageAction;
  skill?: Skill;
  active?: boolean;
}
