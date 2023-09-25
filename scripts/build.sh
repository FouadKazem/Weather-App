#!/bin/sh
export NODE_ENV=production
webpack --config webpack.config.js
tsc --p ./tsconfig.server.json
node dist/server.js