import express from 'express'
import viewsHandler from '../middleware/views-handler'
import { signup } from '../controllers/signup-controller'

const router = express.Router()

router.post('/', signup)

export default router