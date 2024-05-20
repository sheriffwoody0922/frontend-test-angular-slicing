### WalletHub Angular, React, and Node.js Tests

These tests require you have node v12.22.9 already installed

To begin, first, run npm install to make sure all dependencies are ready.

For Angular, the tests are each under /test-{word number} route (ex : http://localhost:4200/test-one; http://localhost:4200/test-two; http://localhost:4200/test-three).You will find the sources for each test under `./src/app` as `test-0{number}.ts` (ex : [src/app/test-01.ts](src/app/test-01.ts); [src/app/test-02.ts](src/app/test-02.ts)) and each files contains, at the top, the requirements for each test. Do `npm run start` from root to start the angular server.

For React, the tests are inside [./jsx-tests/src/](./jsx-tests/src/index.tsx) as `test-0{number}.tsx` and each files contains, at the top, the requirements for each test. Do `npm run react-serve` from root to start the react server which will be under http://localhost:8080

For Node.js, the tests are inside npm-tests, and each files contains, at the top, the requirements for each test. To run each test do `node ./npm-tests/test-0{number}.js` from root (ex : [node ./npm-tests/test-01.js](npm-tests/test-01.js)).