import User from '../models/user-model'
import City from '../models/city-model'

async function registerModels() {
    try {
        await User.sync()
        await City.sync()
        console.log('All Models Synced Successfully!')
    } catch (error) {
        console.error(error)
    }
}

export default registerModels