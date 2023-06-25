import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const port = process.env.PORT || 5000
const app = express()

app.listen(port, () => console.log(`Server is listening on port ${port}...`))