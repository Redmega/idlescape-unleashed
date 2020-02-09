import { Skill } from "./selectors";

export enum MessageAction {
  AutoRefresh = "refresh",
  CraftMax = "craft_max",
}

export interface IMessage {
  action: MessageAction;
  skill?: Skill;
  active?: boolean;
}
