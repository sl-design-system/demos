# Demos

This is a monorepo containing demo apps that showcase SLDS components.

## Getting Started

> Note: Yarn 4.x reads registry settings from `.yarnrc.yml` and your `SLDS_PACKAGES_AUTH_TOKEN` environment variable for authenticating private packages—no project-level `.npmrc` is needed.

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

### Prerequisites

Make sure you have [Node.js](httpss://nodejs.org/) and [Yarn](httpss://yarnpkg.com/) installed.
- Ensure you have the LTS version of Node.js (>=18.x) installed. You can install via https://nodejs.org or tools like nvm:
  ```bash
  nvm install --lts && nvm use --lts
  ```
- Ensure Yarn (>=4.x) is available. If using Corepack (Node 16+):
  ```bash
  corepack enable
  yarn --version
  ```

In order to authenticate to SLDS private packages, you must set the `SLDS_PACKAGES_AUTH_TOKEN` environment variable in your shell. For example:

```bash
export SLDS_PACKAGES_AUTH_TOKEN=your_token_here
```

### Installation

1.  Clone the repository.
2.  Install the dependencies by running the following command in the root of the project:

    ```bash
    yarn install
    ```

## Running the demo apps

When you want to run an `angular demo app`, you can run the following command:

```bash
yarn workspace angular-demo start
```

When you want to run a `lit demo app`, you can run the following command:

```bash
yarn workspace lit-demo dev
```

When you want to run a `svelte demo app`, you can run the following command:

```bash
yarn workspace svelte-demo dev
```

When you want to run a `vue demo app`, you can run the following command:

```bash
yarn workspace vue-demo dev
```

## Building for Production

When you want to build an angular demo app for production, you can run the following command:

```bash
yarn workspace angular-demo build
```

When you want to build a lit demo app for production, you can run the following command:

```bash
yarn workspace lit-demo build
```

When you want to build a svelte demo app for production, you can run the following command:

```bash
yarn workspace svelte-demo build
```

When you want to build a vue demo app for production, you can run the following command:

```bash
yarn workspace vue-demo build
```

### Building all applications at once

It is also possible to build all applications at once, by running the following command in the root of the project:

```bash
yarn build
```

## Linting

You can run the linter on all applications at once by running the following command in the root of the project:

```bash
yarn lint
```

You can also `lint` a specific application by running the following command:

```bash
yarn workspace <workspace-name> lint
```

For example, to lint the Angular demo app, you would run:

```bash
yarn workspace angular-demo lint
```

You can also automatically fix any fixable linting errors by running the following command:

```bash
yarn lint:fix
```

## Formatting Code

You can automatically format all the code in the project by running the following command in the root of the project:

```bash
yarn format
```

TODO: Describe how to test the components (locally, from `components` repo) in the demo apps.

## Testing Local Component Versions

You can test a local (unpublished) version of an SLDS component (for example, from your separate `components` repository) using the built-in [portal protocol](https://yarnpkg.com/protocol/portal) in Yarn 2+ or via workspace link.

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

   Yarn will copy the component code into your workspace at install time. To pick up later changes in the component repo, re-run `yarn install` and restart your demo dev server.
