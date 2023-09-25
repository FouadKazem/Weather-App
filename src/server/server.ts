import dotenv from 'dotenv'; dotenv.config()
import express from 'express'
import path from 'path'
import { Worker } from 'worker_threads'
import { Sequelize } from 'sequelize'
import { generateSecretKey, registerModels } from './config'
import { logger, viewsHandler, auth, errorHandler } from './middleware'
import { loginRouter, signupRouter, weatherRouter } from './routes'
import { NotFoundError } from './errors'

const port = process.env.PORT || 5000
const sequelize = new Sequelize(process.env.DATABASE_URI as string)
const app = express()

app.use(logger)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(viewsHandler)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/weather', auth, weatherRouter)
app.use('*', (req, res, next) => next(new NotFoundError('Resource Not Found!')))
app.use(errorHandler)

sequelize.authenticate().then(async () => {
    console.log('Connected to Database!')
    await registerModels()
    const worker = new Worker(path.join(__dirname, 'config', 'build-city-table.js'))
    worker.on('exit', exitCode => {
        if (exitCode == 0) {
            generateSecretKey()
            app.listen(port, () => console.log(`Server is listening on port ${port}...`))
        } else {
            throw new Error('Failed to build city table')
        }
    })
})