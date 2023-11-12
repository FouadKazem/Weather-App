#!/bin/bash
export NODE_ENV=testing
node scripts/modify-tsconfig.js
tsc --p ./tsconfig.server.json --rootDir ./src --outDir ./tmp/testing
tsc --p ./tsconfig.client.json --rootDir ./src --outDir ./tmp/testing
webpack --config webpack.config.js
node scripts/modify-tsconfig.js --clean
jest tmp/testing/tests --testTimeout=10000