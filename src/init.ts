import { init as initAutoRefresh } from "./plugins/autorefresh";
import { init as initCraftMax } from "./plugins/craft-max";

export default async function init() {
  const log = console.log;

  console.log = (message?: any, ...params: any[]) =>
    log(`%c${message}`, "color: darkred; font-weight: bold;", ...params);

  console.log("Initializing Idlescape Unleashed Content Script");
  console.log(
    "Want to contribute? Join us on GitHub\nhttps://www.github.com/Redmega/idlescape-unleashed"
  );

  // Prevent further console logs from being printed in production mode
  if (process.env.NODE_ENV === "production") {
    console.log = () => undefined;
  }

  /**
   * Initialize plugins which have persistent state
   */
  await initAutoRefresh();
  await initCraftMax();
}
