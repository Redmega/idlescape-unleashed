import $ from "jquery";
import { waitForElement } from "../util";

/**
 * CraftItem is one item to be crafted, with each resource required as key, and the amount as value
 */
interface CraftItem {
  [resource: string]: number;
}

export default async function craftMax(item: CraftItem) {
  console.log("Currently crafting", item);

  let max = Infinity;

  // Make sure we're on the inventory tab
  $('.nav-tab-inventory .tab[role="tab"]:contains(Inventory)').trigger("click");

  for (let [resource, amount] of Object.entries(item)) {
    // Figure out how much we have
    const currentResource = Number(
      $(".inventory-container-all-items")
        .find(`img[src="${resource}"]`)
        .next()
        .text()
    );
    console.log("we have ", currentResource, " of ", resource);

    // If the total number we can make is less than our current running total, save it.
    const craftable = Math.floor(currentResource / amount);
    if (craftable < max) {
      max = craftable;
    }
  }

  console.log("We can make ", max, "of that");
  const $dialog = await waitForElement(".MuiDialog-paper:contains(Crafting)", 50);
  console.log("Dialog is ", $dialog);
  const $button = $(`
  <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary close-dialog-button" type="button">
  <span class="MuiButton-label">Max (${max})</span>
  <span class="MuiTouchRipple-root"></span>
  </button>
  `);

  /**
   * Because of the way Idlescape handles input change events, simply changing the value and triggering a change event did not work. It kept reverting to the previous value.
   * As such, we sort of hackily get around that by creating a dummy input with the max value, selecting that text, and utilizing the browser's copy+paste commands
   */
  $button.click(() => {
    const $selectbox = $(`<input>`)
      .css({
        position: "absolute",
        zIndex: "99999999",
        top: 0,
        left: 0,
      })
      .attr("value", max)
      .appendTo("body")
      .trigger("select")
      .trigger("focus");

    document.execCommand("copy");

    $dialog
      .find(".MuiDialogContent-root input")
      .trigger("select")
      .trigger("focus");

    document.execCommand("paste");

    $selectbox.remove();

    $dialog.find(".sell-item-button").trigger("click");
  });

  $button.insertAfter($dialog.find(".MuiDialogActions-root button").first());
}

function setCraftingTarget(this: HTMLElement, event: MouseEvent) {
  const item: CraftItem = {};

  $(this)
    .find(".requirements > .resource")
    .each(function(i, el) {
      const $el = $(el);
      const resource = $el.find("img").attr("src");
      const count = Number($el.text().replace(/[x\s]/g, ""));
      item[resource] = count;
    });

  craftMax(item);
}

let listeners = [];

export async function init() {
  // The crafting UI can sometimes take a little bit to load. We wait for it to be initialized here.
  const table = (await waitForElement("#crafting-table")).get(0);

  console.log("Enabling Max Crafting button...");

  // Setup our listeners on all existing craftable elements
  $(table)
    .find(".craft-can-craft")
    .each(function() {
      this.addEventListener("click", setCraftingTarget);
      listeners.push(this);
    });

  // Add an observer to watch for changes and destroy or create listeners based on craftable status
  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      const el = mutation.target as HTMLElement;
      if (el.classList.contains("craft-can-craft")) {
        // This resource is now craftable. Add the listener.
        console.log("Adding craft listener");
        el.addEventListener("click", setCraftingTarget);
        listeners.push(el);
      } else {
        // This resource is not craftable anymore. Check if we have a listener already
        if (listeners.includes(el)) {
          // We already made a listener for this one
          console.log("Removing craft listener");
          el.removeEventListener("click", setCraftingTarget);
          listeners = listeners.filter(l => l !== el);
        }
      }
    }
  });

  observer.observe(table, {
    attributeFilter: ["class"],
    attributeOldValue: true,
    subtree: true,
  });
}
