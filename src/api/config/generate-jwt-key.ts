import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

function generateJwtKey() {
    if (!fs.existsSync(path.join(__dirname, '..', 'jwt.key'))) {
        fs.writeFileSync(
            path.join(__dirname, '..', 'jwt.key'),
            crypto.randomBytes(128).toString('base64url')
        )
        return console.log('JWT key has been created!')
    }
    console.log('JWT key already exists!')
}

export default generateJwtKey