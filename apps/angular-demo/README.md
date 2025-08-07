# Angular Demo

An Angular demo app showcasing the SL Design System components in an Angular workspace.

## Getting Started

Clone the monorepo and install dependencies from the root:

```bash
yarn install
```

Then navigate to this demo and start the server:

```bash
cd apps/angular-demo
yarn start
```

> Note: You may need to set `SLDS_PACKAGES_AUTH_TOKEN` to access private design-system packages:
>
> ```bash
> export SLDS_PACKAGES_AUTH_TOKEN=<your-token>
> ```

## Prerequisites

- Node.js (>=18.x) or later
- Yarn v4+

## Installation

```bash
cd apps/angular-demo
yarn install
```

## Available Scripts

- `yarn start`
  Launches the Angular development server at http://localhost:4200

- `yarn build`
  Builds the production bundle into `apps/angular-demo/dist`

- `yarn lint`
  Runs ESLint on TypeScript files

- `yarn lint:fix`
  Runs ESLint with `--fix`

## Project Structure

- `angular.json` – CLI configuration for builds and serve,
- `tsconfig.app.json` – TypeScript config for this app,
- `src/` – Application source code.
