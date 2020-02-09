# Contributing

When contributing to this repository, please first discuss the change you wish to make using the Issue Tracker.

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Feature/Enhancement Guidelines

- The Idlescape devs have said they do not want any automation tools that play the game for you. Any such pull requests that add "botting" to the extension will be closed without review. If you have questions about whether something constitutes as botting, feel free to open an issue and describe the feature or enhancement.

## Technical Guidelines

- Make sure that you use Prettier formatter and that your IDE is reading the `.prettierc` file to use the correct format settings. We use Prettier so that we don't have to nitpick about code style in our PRs.
- Don't add dependencies unless they're necessary. Having just `jquery` as a dependency should be good enough for almost everything this extension will need to do. If you believe your feature or enhancement necessitates pulling in another dependency, discuss it in the issue first. We might be able to come up with a different way to solve your problem.
- Use types everywhere. Properly typing our code makes it possible to quickly iterate and reuse code, not to mention it makes autocomplete a breeze on most IDEs.

## Development

- Idlescape Unleashed should be developed on `node >= 8`
- We use yarn for package management. You can install dependencies with `yarn install` and run commands like `yarn build` or `yarn dev`.
- `yarn dev` will run a parcel server which will automatically watch for changes in `src/` and buld to `dist/`. If you do this, all you need to do after making changse and saving is click "Reload" on the extension card to get the new code into the browser.
