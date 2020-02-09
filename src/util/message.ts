import { Skill } from "./selectors";

export enum MessageAction {
  AutoRefresh = "refresh",
}

export interface IMessage {
  action: MessageAction;
  skill?: Skill;
  active?: boolean;
}
