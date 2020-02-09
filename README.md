# Idlescape Unleashed

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

An as-of-yet unpublished chrome extension to help you get the most of your Idlescape game.

## Usage

You can right click anywhere on your Idlescape game page to access the Idlescape Unleashed menu.

## Features

### Auto Refresh

Don't you hate it when you end up wasting an entire night of idling because the game got disconnected somehow?

Enabled by default, this setting will detect when you get disconnected and automatically refresh your browser window so it doesn't disrupt your idling

### Auto Progress

_This one is subject to developer approval_

Will pick the highest unlocked zone in a skill and idle on it. When the next level unlocks, it'll automatically idle on the new level.

## Installing

The extension is not yet out on the chrome web store (@Redmega just needs to register & pay for a developer account).

For now you can use it manually by adding it to chrome as an unpacked extension using "developer mode".

1. Navigate to [chrome://extensions/](chrome://extensions/)
2. Make sure the "Developer Mode" toggle is enabled on the top right of the page
3. Clone this repo and run `yarn install && yarn build`
4. Click the "Load Unpacked" button on the top left of the chrome extensions page
5. Select the newly created `dist` folder
6. (Optional) If you are iterating on the code, make sure after each change that you "Refresh" the extension by clicking the refresh button on the Idlescape Unleashed extension card

## Contributing

Please see the [Contributing](CONTRIBUTING.md) guide
