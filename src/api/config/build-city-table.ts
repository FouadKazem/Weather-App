import readline from 'readline'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { City } from '../models'

async function buildCityTable() {
    process.stdout.write('Checking the status of city table...\n')
    const cityTableData = await City.findAll()
    if (cityTableData.length != 0) {
        process.stdout.write('City table was already built!\n')
        process.exit(0)
    } else {
        process.stdout.write('City table is empty!\n')
    }
    const rl = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'worldcities.csv'), 'utf8')
    })
    const modelArray: any[] = []
    process.stdout.write('Building city table')
    let count = 0
    const interval = setInterval(() => {
        process.stdout.write('.')
        count = (count + 1) % 4
        if (count == 0) {
            process.stdout.write('\b\b\b\b    \b\b\b\b')
        }
    }, 250)
    rl.on('line', line => {
        if (line == '') {
            return
        }
        const columns = line.split(',').map(column => {
            return column.replace('"', '').replace('"', '')
        })
        if (columns[0] != 'city') {
            modelArray.push({
                id: crypto.randomUUID(),
                name: columns[0],
                name_ascii: columns[1],
                latitude: columns[2],
                longitude: columns[3],
                country_name: columns[4]
            })
        }
    })
    rl.on('close', async () => {
        await City.bulkCreate(modelArray, { logging: false })
        clearInterval(interval)
        process.stdout.write('\nFinished building city table!\n')
    })
}

buildCityTable()