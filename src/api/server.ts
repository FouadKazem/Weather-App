import * as dotenv from 'dotenv'; dotenv.config()
import express from 'express'
import path from 'path'
import { Sequelize } from 'sequelize'
import generateSecretKey from './config/generate-secret-key'
import registerModels from './config/register-models'
import logger from './middleware/logger'
import viewsHandler from './middleware/views-handler'
import auth from './middleware/auth'
import errorHandler from './middleware/error-handler'
import loginRouter from './routes/login-router'
import signupRouter from './routes/signup-router'
import weatherRouter from './routes/weather-router'
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
    generateSecretKey()
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
}) 