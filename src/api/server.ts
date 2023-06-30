import * as dotenv from 'dotenv'; dotenv.config()
import express from 'express'
import path from 'path'
import crypto from 'crypto'
import { Sequelize } from 'sequelize'
import registerModels from './config/register-models'
import logger from './middleware/logger'
import loginRouter from './routes/login-router'
import signupRouter from './routes/signup-router'

process.env.JWT_SECRET = crypto.randomBytes(64).toString('base64url')
const port = process.env.PORT || 5000
const sequelize = new Sequelize(process.env.DATABASE_URI as string)
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)

sequelize.authenticate().then(async () => {
    console.log('Connected to Database!')
    await registerModels()
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
}) 