require('dotenv').config()
const fs = require('fs')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const tsconfigClient = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.client.json'), 'utf-8'))
const tsconfigServer = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tsconfig.server.json'), 'utf-8'))
if (process.argv.length <= 2) {
    if (NODE_ENV == 'testing') {
        tsconfigClient.exclude = ["node_modules", "./src/server", "./src/tests/*.ts"]
        tsconfigServer.exclude = ["node_modules", "./src/client", "./src/tests/*.tsx"]
    } else {
        tsconfigClient.exclude = ["node_modules", "./src/server", "./src/tests"]
        tsconfigServer.exclude = ["node_modules", "./src/client", "./src/tests"]
    }
} else {
    tsconfigClient.exclude = undefined
    tsconfigServer.exclude = undefined
}
fs.writeFileSync(path.join(__dirname, '..', 'tsconfig.client.json'), JSON.stringify(tsconfigClient, null, 2), 'utf-8')
fs.writeFileSync(path.join(__dirname, '..', 'tsconfig.server.json'), JSON.stringify(tsconfigServer, null, 2), 'utf-8')