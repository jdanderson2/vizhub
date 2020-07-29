# [VizHub](https://vizhub.com)

Built with React, Node, Lerna, and ShareDB.

To set up your development environment:

```
cd vizhub
npm install -g lerna # one time only
lerna bootstrap
cd packages/neoBackend
npm run dev # Leave this open in a console tab. Serves on port 4000
```
In another terminal:

```
cd ../packages/neoFrontend
npm start # Leave this open, it's a `create-react-app` dev server on port 3000
```

To login, we use the Github integration with the development credentials below.

# Testing

To run the end-to-end tests (in another terminal):

```
cd ../packages/neoCI
npm test # Beware: auth as CI test case is a bit brittle, fails sporadically
```

These tests use [Puppeteer](https://github.com/puppeteer/puppeteer), which has some [system-level dependencies](https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix) that need to be installed separately (OS-specific).

If you're ever in NPM hell with `package-lock` madness, try [this](https://gist.github.com/cancerberoSgx/1892ada276992f78f488a43b3a430c9b):

```
find . -name "node_modules" -exec rm -rf '{}' +; find . -name "package-lock.json" -exec rm -rf '{}' +;
```

# Environment Variables

Without setting any environment variables, the app should work in development using an in-memory database, without the ability to authenticate via GitHub.

To set up the app to use MongoDB, export the following:

```
export VIZHUB_MONGO_URI=mongodb://localhost:27017/vizhub
```

To enable authentication via GitHub, export the following:

```
export REACT_APP_VIZHUB_GITHUB_CLIENT_ID=17ed8d9fa67e695f1118
export VIZHUB_GITHUB_CLIENT_SECRET=b7673605d16aee3c66bb693578d4e1e2dac61baa
```

Don't forget to `source ~/.bashrc`!

Additional environment variables for use in production only are detailed in [Production Docs](docs/production.md).

# Codebase Maintenance

The codebase uses Prettier to auto-format code. Please run Prettier on all files after making changes:

`lerna run prettier`

You can run Pretter within a single package directory (e.g. `neoFrontend`):

`npm run prettier`

Upgrade all dependencies:

```
npm install -g npm-check-updates
lerna exec -- ncu -u
```

