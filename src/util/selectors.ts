export enum CombatSkill {
  Shared = "combat",
  Strength = "strength",
  Defense = "defense",
  Attack = "attack",
  Constitution = "constitution",
}

export enum MiscSkill {
  Idling = "idling",
  Crafting = "crafting",
  Enchanting = "enchanting",
  Runecrafting = "runecrafting",
}

export enum ProgressSkill {
  Cooking = "cooking",
  Fishing = "fishing",
  Mining = "mining",
  Smithing = "smithing",
  Woodcutting = "woodcutting",
}

export type Skill = CombatSkill | MiscSkill | ProgressSkill;

export const Status = {
  smelting: ProgressSkill.Smithing,
  cooking: ProgressSkill.Cooking,
  mining: ProgressSkill.Mining,
  cutting: ProgressSkill.Woodcutting,
  "fish|nets|cage": ProgressSkill.Fishing,
  runes: MiscSkill.Runecrafting,
};

export const skillHeaders = {
  [CombatSkill.Attack]: '[data-for="attackHeader"]',
  [ProgressSkill.Mining]: '[data-for="miningHeader"]',
  [ProgressSkill.Woodcutting]: '[data-for="woodcuttingHeader"]',
  [CombatSkill.Shared]: '[data-for="combat-level-tooltipHeader"]',
  [ProgressSkill.Fishing]: '[data-for="fishingHeader"]',
  [MiscSkill.Enchanting]: '[data-for="enchantingHeader"]',
  [MiscSkill.Runecrafting]: '[data-for="runecraftingHeader"]',
  [ProgressSkill.Smithing]: '[data-for="smithingHeader"]',
  [MiscSkill.Crafting]: '[data-for="craftingHeader"]',
  [ProgressSkill.Cooking]: '[data-for="cookingHeader"]',
  [CombatSkill.Constitution]: '[data-for="constitutionHeader"]',
  [CombatSkill.Strength]: '[data-for="strengthHeader"]',
  [CombatSkill.Defense]: '[data-for="defenseHeader"]',
};

export const levels = {
  ...Object.keys(skillHeaders).reduce<
    { [key in ProgressSkill | CombatSkill | MiscSkill]?: string }
  >(
    (levels, skill) => ({
      ...levels,
      [skill]: `${skillHeaders[skill]} text`,
    }),
    {}
  ),
  [CombatSkill.Shared]: `${skillHeaders[CombatSkill.Shared]} > span`,
};

export const resources = {
  [ProgressSkill.Mining]: ".play-area.theme-mining",
  [ProgressSkill.Woodcutting]: ".play-area.theme-woodcutting",
  [ProgressSkill.Fishing]: ".play-area.theme-fishing",
  [ProgressSkill.Smithing]: ".play-area.theme-smithing",
  [ProgressSkill.Cooking]: ".play-area.theme-cooking",
  [MiscSkill.Crafting]: "#crafting-table",
};

export const verbs = {
  [ProgressSkill.Fishing]: "Fish",
  [ProgressSkill.Mining]: "Mine",
  [ProgressSkill.Woodcutting]: "Chop",
  [ProgressSkill.Smithing]: "Smelt",
  [ProgressSkill.Cooking]: "Cook",
  Stop: "Stop",
};

export const combat = {
  styles: '.combat-fight [role="tablist"] li:nth-child(3)',
  [CombatSkill.Attack]: ".combat-fight-attack-styles > div:nth-child(1)",
  [CombatSkill.Strength]: ".combat-fight-attack-styles > div:nth-child(2)",
  [CombatSkill.Defense]: ".combat-fight-attack-styles > div:nth-child(3)",
  [CombatSkill.Shared]: ".combat-fight-attack-styles > div:nth-child(4)",
};

export const disconnectPrompt = ".MuiPaper-root:contains(disconnected)";
