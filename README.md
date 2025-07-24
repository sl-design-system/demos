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

TODO: Describe how to test the components (locally, from `components` repo) in the demo apps.