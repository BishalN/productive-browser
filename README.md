# Productive Browser Extension

A browser extension that helps you stay productive.

# Build from source

- Clone the repo
- Install dependencies with `yarn`
- Run `yarn start`
- Load the `dist/` directory to your browser

# For packaging and deployment

- Update dist/manifest.json with the correct version number
- Also different syntaxt for different target browsers e.g for `background_scripts`
- use `web-ext build` command to build the extension
