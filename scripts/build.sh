#!/bin/bash
export NODE_ENV=production
node scripts/modify-tsconfig.js
webpack --config webpack.config.js
tsc --p ./tsconfig.server.json --rootDir ./src/server --outDir ./dist/
node scripts/modify-tsconfig.js --clean
node dist/server.js