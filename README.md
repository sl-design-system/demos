# Demos repository

This monorepository contains demo apps showcasing SL Design System (SLDS) components.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Running Demos](#running-demos)
- [Building for Production](#building-for-production)
- [Linting & Formatting](#linting--formatting)
- [Testing Local Components](#testing-local-components)
- [Resources](#resources)

## Getting Started

**Corepack & Yarn version**

If you are using Corepack to manage Yarn, enable it with:

```bash
corepack enable
```

To pin or switch Yarn versions (optional):

```bash
corepack prepare yarn@4.9.2 --activate
yarn --version # should output 4.x.x
```

> Note: Yarn 4.x reads registry settings from `.yarnrc.yml` and your `SLDS_PACKAGES_AUTH_TOKEN` environment variable for authenticating private packages—no project-level `.npmrc` is needed.

### Prerequisites

- Node.js v18+ LTS (install via https://nodejs.org or nvm)
- Yarn v4+ (enable via Corepack or install from https://yarnpkg.com)

In order to authenticate to SLDS private packages, you must set the `SLDS_PACKAGES_AUTH_TOKEN` environment variable in your shell. For example:

```bash
export SLDS_PACKAGES_AUTH_TOKEN=your_token_here
```

## Installation

1.  Clone the repository.
2.  Install the dependencies by running the following command in the root of the project:

    ```bash
    yarn install
    ```

## Available Scripts

Run these commands from the monorepo root:

- `yarn build` Builds all demo apps (uses Wireit)
- `yarn format` Formats code via Prettier
- `yarn lint` Runs ESLint on all workspaces
- `yarn lint:fix` Fixes lint errors via ESLint
- `yarn stylelint` Runs stylelint on CSS/SCSS

## Running Demos

Use `yarn workspace <name> <script>` to serve or build individual demos:

```bash
yarn workspace angular-demo start    # ng serve on localhost:4200
yarn workspace lit-demo dev          # watch build and preview
yarn workspace svelte-demo dev       # watch build and preview
yarn workspace vue-demo dev          # watch build and preview
```

## Building for Production

```bash
yarn workspace angular-demo build
yarn workspace lit-demo build
yarn workspace svelte-demo build
yarn workspace vue-demo build
```

Or build all at once:

```bash
yarn build
```

## Linting & Formatting

```bash
yarn lint
yarn lint:fix
yarn format
```

## Testing Local Components

You can test a local (unpublished) version of an SLDS component (for example, from your separate `components` repository) using the built-in [portal protocol](https://yarnpkg.com/protocol/portal) (in Yarn 2+) or via [file protocol](https://yarnpkg.com/protocol/file).

The example below shows how to set up a local `sl-button` component (`@sl-design-system/button`) in demo apps.

1. **Using the Portal Protocol (Yarn 2+)**

   In demos monorepo root `package.json`, update the component dependency to point to your local path:

   ```json
   "@sl-design-system/button": "portal:../components/packages/components/button"
   ```

   Then install dependencies:

   ```bash
   yarn install
   ```

   Yarn will create a live symlink into your local component folder. Rebuild or watch your component (`yarn run build --watch`) in the `components` repo and restart any demo dev server to pick up changes immediately.

   For continuous development, we recommend using the **portal protocol** with the component repo’s own watch/build script so changes propagate faster without reinstalling.

2. **Using a File Dependency**

   If you prefer a [file-based dependency](https://yarnpkg.com/protocol/file), point directly to your local component folder:
   - **Globally at root**:
     ```bash
     yarn add @sl-design-system/button file:../components/packages/components/button -W
     ```

   Then install or reinstall dependencies:

   ```bash
   yarn install
   ```

   Yarn will copy the component code into your workspace at installation time. To pick up later changes in the component repository, re-run `yarn install` and restart your demo dev server.

## Resources

- SL Design System docs: https://sanomalearning.design/
- Storybook: https://storybook.sanomalearning.design/
