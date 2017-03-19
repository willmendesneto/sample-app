# Sample App

To run the dev server:

```
yarn install
npm start
```

Navigate your browser to http://localhost:4000/sample-app

If you want to run the Spring Server:

```
./gradlew bootRun
```

It starts up on http://localhost:8093/sample-app. This isn't necessary, but I left it in as it is the server I am using.

## Troubles with Hot Module Replacement

Make changes to some JSX while webpack dev-server is running. Changes are detected. App recompiles. 
Browser does not update. Changes are reflected if the browser is refreshed.

Console log:

```
[WDS] App updated. Recompiling...
[WDS] App hot update...
[HMR] Checking for updates on the server...
[WDS] App hot update...
XHR finished loading: GET "http://localhost:4000/sample-app/9dca3639ba77c6e730eb.hot-update.json".
[HMR] Updated modules:
[HMR]  - ./src/main/web/app/routes/About/index.js
[HMR] App is up to date.
```
