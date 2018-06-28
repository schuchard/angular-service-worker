# NgServiceWorker

Demo: [briebug-service-worker.netlify.com](https://briebug-service-worker.netlify.com)

## Getting Started

[yarn](https://yarnpkg.com/en/docs/install#mac-stable) vs npm

```shell
yarn === npm install
yarn CMD === npm run CMD
```

### Install dependencies

```shell
yarn
```

## Commands

### Run the service worker app locally

This does a `prod` build and serves the static files from `./dist`

```shell
yarn start
```

### Start only the server

_note: `-c-1` option will disable server caching_

```shell
yarn start:server
```

### Register a new service worker configuration

This will update the service worker config file, `ngsw.json`, in the `dist` folder.

After making a change to `ngsw-config.json` and with `yarn start` running you can run this command, reload the page, and the client will register the new service worker changes. 

```shell
yarn ngsw
```

---

## Demo steps

The following steps assume you've setup a service worker with [ng add  @angular/pwa](https://angular.io/guide/service-worker-getting-started#adding-a-service-worker-to-your-project)

### 1. Prefetch assets

With goal of making this app work offline, we're going to pre-fetch all the assets so they're available regardless of connectivity. We will cache the Google fonts & icons as well as a fallback image we'll use later in the app. In the `ngsw-config.json` file make the following changes to the assets `assetGroups`:

```json
"assetGroups": [
  ...,
  {
    "name": "assets",
    "installMode": "lazy", // 1. change this to "prefetch"
    "updateMode": "prefetch",
    "resources": {
      "files": ["/assets/**"],
      // 2. add the following "urls"
      "urls": ["https://fonts.googleapis.com/**", "https://fonts.gstatic.com/**"]
    }
  }
]
```

### 2. Cache api response

We have a view that displays a list of SpaceX launches. After a successful request we'll want to cache the response for 1 week. In the `ngsw-config.json` add a `dataGroups` prop with the following configuration.

```json
"dataGroups": [
  {
    "name": "spacex-api", // unique name
    "urls": ["**//api.spacexdata.com/**"], // path to match
    "cacheConfig": {
      "strategy": "performance", // load from the cache if available, otherwise network request
      "maxSize": "1", // cache 1 entry
      "maxAge": "7d" // cache for 7 days
    }
  }
]
```

### 3. Service worker status

Review the `src/app/core/services/app-status.service.ts`. It contains some basic helpers for dealing with update notifications, programmatically check for updates, and reloading the application if desired.

Review the `src/app/sw-nav/sw-nav.component.html`. It contains service worker state logic for notifying the user that a new update is available.

Review the `src/app/launch` component, it contains fallback image functionality when the app is offline to manage the only non-cached assets (each individual launch patch image).

### 4. Load the app

- run `yarn start`
- Open a new chrome tab and the network inspector, then load the app at `localhost:4200`
- access the Launches tab
- notice normal network requests for all assets
- reload the app at `localhost:4200`

Notice that the following requests are being served `(from serviceWorker)` under the `Size` column.

- all hashed files from the `dist` folder (`html`, `css`, `js`)
- `api.spacexdata.com/v2/launches` api request for launch data
- assets - `assets/images/rocket-default.png`

From the Launches tab, toggle the offline button in the Network tab and observe that a fallback image is used in place of the launch patches from the api.

- temporarily modify the `appData` value in `ngsw-config.json`
- in a new shell run `yarn ngsw`. This will great a new `ngsw.json` file in the `dist` folder
- reload the app
- the app will request this file on every load with a cache busting param and register that a new "version" of the app is available. This will trigger a "autorenew" icon to appear in the nav bar allowing you to refresh the app to the latest version.

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
