import User from '../models/user-model'

async function registerModels() {
    try {
        await User.sync()
        console.log('All Models Synced Successfully!')
    } catch (error) {
        console.error(error)
    }
}

export default registerModels