import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

function generateSecretKey(): void {
    if (!fs.existsSync(path.join(__dirname, '..', 'secret.key'))) {
        fs.writeFileSync(
            path.join(__dirname, '..', 'secret.key'),
            crypto.randomBytes(128).toString('base64url')
        )
        return console.log('Secret key has been created!')
    }
    console.log('Secret key already exists!')
}

export default generateSecretKey