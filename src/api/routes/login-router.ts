import express from 'express'
import viewsHandler from '../middleware/views-handler'
import { login } from '../controllers/login-controller'

const router = express.Router()

router.get('/', viewsHandler)
router.post('/', login)

export default router