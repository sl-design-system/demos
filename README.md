# demos

Monorepo containing demo apps that showcase SLDS components.

## Getting Started

### Prerequisites

Make sure you have [Node.js](httpss://nodejs.org/) and [Yarn](httpss://yarnpkg.com/) installed.

### Installation

1.  Clone the repository.
2.  Install the dependencies by running the following command in the root of the project:

    ```bash
    yarn install
    ```

## Running the demo apps

When you want to run an angular demo app, you can run the following command:

```bash
yarn workspace angular-demo start
```

When you want to run a lit demo app, you can run the following command:

```bash
yarn workspace lit-demo dev
```

When you want to run a svelte demo app, you can run the following command:

```bash
yarn workspace svelte-demo dev
```

When you want to run a vue demo app, you can run the following command:

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

You can also lint a specific application by running the following command:

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

You can test a local (unpublished) version of an SLDS component (for example, from your separate `components` repository) in two ways:

1. **Using Yarn Link (v1) or Yarn Plug’n’Play Link (v2+)**
   - Yarn 1 (classic):
     ```bash
     cd /Users/anna.sobczak/IdeaProjects/components/packages/components/button
     yarn link
     cd /Users/anna.sobczak/IdeaProjects/demos_2
     yarn link @sl-design-system/button
     yarn install
     ```
   - Yarn 2/3/4 (Berry + PnP) no longer exposes `yarn link` by default. To enable it, import the workspace-tools plugin:
     ```bash
     cd /Users/anna.sobczak/IdeaProjects/components/packages/components/button
     yarn plugin import workspace-tools
     yarn link create
     ```
     Then in the demos monorepo root:
     ```bash
     cd /Users/anna.sobczak/IdeaProjects/demos_2
     yarn link use @sl-design-system/button
     ```
     If you still face issues, either switch to the `node-modules` linker in `.yarnrc.yml` or fall back to `npm link`:
     ```bash
     # switch to node-modules linker
     echo "nodeLinker: node-modules" > .yarnrc.yml
     yarn install
     yarn link && yarn link @sl-design-system/button
     ```
   - After linking, rebuild or restart your demo; it will now resolve the local button sources.

2. **Using a File Dependency (per-workspace or globally)**
    - **Per-workspace**: Install into one demo only (replace `<demo>` with your workspace name, e.g. `angular-demo`, `lit-demo`, `svelte-demo`, or `vue-demo`):
      ```bash
      yarn workspace angular-demo add @sl-design-system/button file:../components/packages/components/button
      yarn workspace lit-demo add @sl-design-system/button file:../components/packages/components/button
      # or for Svelte:
      yarn workspace svelte-demo add @sl-design-system/button file:../components/packages/components/button
      # or for Vue:
      yarn workspace vue-demo add @sl-design-system/button file:../components/packages/components/button
      ```
    - **Globally at root**: Install into all workspaces from the root using the `-W` flag:
      ```bash
      yarn add @sl-design-system/button file:../components/packages/components/button -W
      ```
    - Run `yarn install` to update all dependencies accordingly.

Both methods let you integrate a local component version into your demos. Note:
- **Yarn Link** reflects combined changes immediately (with rebuild/restart of component and demo).
- **File** dependencies copy at install time, so you must rerun `yarn install` (or re-add) and rebuild/restart the demo to pick up any changes.

**Keeping component updates in sync**

- If you used **Yarn Link**, the demo apps receive updates via the symlink but you must rebuild the component package (e.g., `yarn build` or its watch mode) in the components repo, and then restart your demo's dev server to pick up the new code.
- If you used a **file:** dependency, Yarn copies the folder at install time. Any later changes in the components repo won’t be reflected until you re-run `yarn install` (or re-add the dependency) in the demos monorepo, and rebuild or restart the demo.
- For continuous development, we recommend using **Yarn Link** with the component repo’s own watch/build script so changes propagate faster without reinstalling.
