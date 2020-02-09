import $ from "jquery";
import { Skill, resources, verbs, skillHeaders } from "../util/selectors";
import { getCurrentStatus } from "../util";
import { seconds } from "../util/time";
/**
 * Auto levels a skill, progressively moves on to next highest activity
 *
 * Note: Should only be used with progressible skills, skills that unlock new activities at certain level thresholds.
 * This is taken care of in the context menu, where we only create options for progressible skills
 *
 * @param skill The skill to auto level
 */
export default async function autoProgress(skill: Skill) {
  /**
   * Step 1: Ensure that we are performing the desired skill
   */

  // Switch to that tab
  $(skillHeaders[skill]).trigger("click");

  // Find the last valid activity and start it, if not already started
  const $bestActivity = getBestActivity(skill);
  console.log("Best activity is ", $bestActivity.get(0));
  $bestActivity
    .find(`.resource-container-button button:contains(${verbs[skill]})`)
    .trigger("click");

  await seconds(0.5);

  if (getCurrentStatus() !== skill) {
    // We can't actually perform that skill right now, for some reason. Let the user know.
    alert(
      `Unable to start activity in "${$bestActivity.find(".resource-container-title").text()}"`
    );
    return;
  } else {
    return pollNextActivity(skill);
  }
}

async function pollNextActivity(skill: Skill): Promise<void> {
  console.log("Polling next activity");

  const $initialActivity = getNextActivity(skill);

  const $lockNode = $initialActivity.find(".locked-cover");

  console.log("Next locked activity is ", $initialActivity.get(0));
  console.log("Lock cover is ", $lockNode.get(0));

  // There is no locked activity. We're done here.
  if (!$initialActivity.length) {
    console.log("No better activity available. Just idling at highest.");
    return;
  }

  console.log("Listening for changes to the lock");

  return new Promise((resolve, reject) => {
    const observeNextActivity = (mutations: Array<MutationRecord>, observer: MutationObserver) => {
      console.log("Node mutated. Checking for lock removal");
      for (const mutation of mutations) {
        console.log("Removed nodes: ", mutation.removedNodes);
        if (Array.from(mutation.removedNodes).includes($lockNode.get(0))) {
          console.log("Lock has been removed!");
          // Our lock has been removed. Stop listening to changes and progress to the next step
          observer.disconnect();
          resolve(autoProgress(skill));
        }
      }
    };

    const observer = new MutationObserver(observeNextActivity);
    observer.observe($initialActivity.get(0), { childList: true });
  });
}

/**
 * Returns the last activity in a skill that is unlocked
 */
function getBestActivity(skill: Skill) {
  return $(resources[skill])
    .find(".resource-container")
    .not(":has(>.locked-cover)")
    .last();
}

/**
 * Returns the first locked activity in a skill
 */
function getNextActivity(skill: Skill) {
  return $(resources[skill])
    .find(".resource-container")
    .has("> .locked-cover")
    .first();
}
