#!/bin/sh
export NODE_ENV=development
tsc --p ./tsconfig.server.json -watch &
nodemon dist/server.js