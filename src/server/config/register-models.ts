import { User, City } from '../models'

async function registerModels() {
    const NODE_ENV = process.env.NODE_ENV
    try {
        await User.sync(
            NODE_ENV == 'development' || NODE_ENV == undefined ?
            { force: true }
            :
            undefined
        )
        await City.sync(
            NODE_ENV == 'development' || NODE_ENV == undefined ?
            { force: true }
            :
            undefined
        )
        console.log('All models synced successfully!')
    } catch (error) {
        console.error(error)
    }
}

export default registerModels